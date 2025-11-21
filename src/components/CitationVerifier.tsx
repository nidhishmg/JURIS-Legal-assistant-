import { useState } from 'react';
import { Upload, FileText, CheckCircle2, XCircle, AlertTriangle, ExternalLink, AlertCircle } from 'lucide-react';
import { verifyCitationsWithAI } from '../services/grokAI';

interface Citation {
  id: string;
  original: string;
  corrected: string;
  status: 'verified' | 'overruled' | 'incorrect' | 'modified';
  judgment: string;
  court: string;
  date: string;
  note?: string;
  sources?: string[];
  pinpointReference?: string;
}

export function CitationVerifier() {
  const [inputText, setInputText] = useState('');
  const [citations, setCitations] = useState<Citation[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleVerify = async () => {
    if (!inputText.trim()) {
      setError('Please enter text containing legal citations');
      return;
    }

    setIsAnalyzing(true);
    setError(null);
    setCitations([]);

    try {
      const response = await verifyCitationsWithAI(inputText);

      if (response.success && response.citations.length > 0) {
        setCitations(response.citations);
      } else if (response.error) {
        setError(response.error);
      } else {
        setError('No citations found in the provided text');
      }
    } catch (err) {
      console.error('Verification error:', err);
      setError('Failed to verify citations. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getStatusIcon = (status: Citation['status']) => {
    switch (status) {
      case 'verified':
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case 'overruled':
        return <XCircle className="w-5 h-5 text-red-600" />;
      case 'incorrect':
        return <AlertTriangle className="w-5 h-5 text-orange-600" />;
      case 'modified':
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
    }
  };

  const getStatusBadge = (status: Citation['status']) => {
    const styles = {
      verified: 'bg-green-100 text-green-700',
      overruled: 'bg-red-100 text-red-700',
      incorrect: 'bg-orange-100 text-orange-700',
      modified: 'bg-yellow-100 text-yellow-700',
    };

    const labels = {
      verified: 'Verified',
      overruled: 'Overruled',
      incorrect: 'Incorrect',
      modified: 'Modified',
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs ${styles[status]}`}>
        {labels[status]}
      </span>
    );
  };

  return (
    <div className="h-full overflow-y-auto bg-gray-50">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-gray-900 mb-2">Citation Verifier</h1>
          <p className="text-gray-600">
            AI-powered citation verification across SCC, Manupatra, LiveLaw, and Indian Kanoon
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-red-800">{error}</p>
            </div>
            <button
              onClick={() => setError(null)}
              className="text-red-600 hover:text-red-800"
            >
              ✕
            </button>
          </div>
        )}

        {/* Input Section */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <div className="mb-4">
            <label className="block text-sm text-gray-700 mb-2">
              Paste your text with citations or upload a document
            </label>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Enter or paste text containing legal citations here...

Example:
As held in Maneka Gandhi vs. Union of India (AIR 1978 SC 597), the right to life and liberty under Article 21 cannot be taken away except by procedure established by law. This principle was further elaborated in Vishaka vs. State of Rajasthan (1997) 1 SCC 416."
              className="w-full h-48 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleVerify}
              disabled={!inputText.trim() || isAnalyzing}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isAnalyzing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Analyzing...
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  Verify Citations
                </>
              )}
            </button>

            <div className="flex-1 flex items-center justify-center gap-2 text-gray-400">
              <div className="h-px bg-gray-300 flex-1"></div>
              <span className="text-sm">OR</span>
              <div className="h-px bg-gray-300 flex-1"></div>
            </div>

            <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center gap-2">
              <Upload className="w-5 h-5" />
              Upload Document
            </button>
          </div>
        </div>

        {/* Results Section */}
        {citations.length > 0 && (
          <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl text-gray-900">{citations.length}</p>
                    <p className="text-sm text-gray-600">Total Citations</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl text-gray-900">
                      {citations.filter(c => c.status === 'verified').length}
                    </p>
                    <p className="text-sm text-gray-600">Verified</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                    <XCircle className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <p className="text-2xl text-gray-900">
                      {citations.filter(c => c.status === 'overruled').length}
                    </p>
                    <p className="text-sm text-gray-600">Overruled</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-2xl text-gray-900">
                      {citations.filter(c => c.status === 'incorrect' || c.status === 'modified').length}
                    </p>
                    <p className="text-sm text-gray-600">Issues Found</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Citations List */}
            <div className="bg-white rounded-xl border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-gray-900">Extracted Citations</h2>
              </div>
              <div className="divide-y divide-gray-200">
                {citations.map((citation) => (
                  <div key={citation.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start gap-4">
                      <div className="mt-1">
                        {getStatusIcon(citation.status)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-gray-900 mb-1">{citation.judgment}</h3>
                            <div className="flex items-center gap-2 mb-2">
                              {citation.original !== citation.corrected ? (
                                <>
                                  <span className="text-sm text-gray-500 line-through">
                                    {citation.original}
                                  </span>
                                  <span className="text-sm text-gray-400">→</span>
                                  <span className="text-sm text-blue-600">
                                    {citation.corrected}
                                  </span>
                                </>
                              ) : (
                                <span className="text-sm text-gray-600">
                                  {citation.original}
                                </span>
                              )}
                            </div>
                          </div>
                          {getStatusBadge(citation.status)}
                        </div>

                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                          <span>{citation.court}</span>
                          <span>•</span>
                          <span>{new Date(citation.date).toLocaleDateString('en-IN')}</span>
                          {citation.pinpointReference && (
                            <>
                              <span>•</span>
                              <span className="text-blue-600">{citation.pinpointReference}</span>
                            </>
                          )}
                        </div>

                        {citation.sources && citation.sources.length > 0 && (
                          <div className="mb-2 flex items-center gap-2 text-sm">
                            <span className="text-gray-500">Verified by:</span>
                            <div className="flex gap-1 flex-wrap">
                              {citation.sources.map((source, idx) => (
                                <span key={idx} className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-xs">
                                  {source}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {citation.note && (
                          <div className={`mt-3 p-3 rounded-lg ${
                            citation.status === 'overruled' 
                              ? 'bg-red-50 border border-red-200' 
                              : 'bg-orange-50 border border-orange-200'
                          }`}>
                            <p className="text-sm text-gray-700">{citation.note}</p>
                          </div>
                        )}

                        <div className="mt-3 flex gap-2">
                          <button className="px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex items-center gap-1">
                            <ExternalLink className="w-4 h-4" />
                            View Judgment
                          </button>
                          {citation.status === 'incorrect' && (
                            <button className="px-3 py-1.5 text-sm text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                              Apply Correction
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Export Options */}
            <div className="flex gap-3">
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Export Report as PDF
              </button>
              <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                Export as Excel
              </button>
              <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                Copy Corrected Text
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
