import { useState } from 'react';
import { Upload, FileText, Clock, Gavel, Scale, BookOpen, ChevronLeft, AlertCircle } from 'lucide-react';
import { analyzeJudgmentWithAI } from '../services/grokAI';

interface CaseTimelineItem {
  date: string;
  event: string;
}

interface JudgmentAnalysis {
  caseTimeline: CaseTimelineItem[];
  sectionsInvolved: string[];
  arguments: {
    petitioner: string;
    respondent: string;
  };
  ratioDecidendi: string[];
  obiterDicta: string[];
  plainLanguageSummary: string;
}

export function JudgmentAnalyzer() {
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<JudgmentAnalysis | null>(null);
  const [error, setError] = useState<string>('');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      setError('');
      setAnalysis(null);
    }
  };

  const handleAnalyze = async () => {
    if (!file) return;

    setIsAnalyzing(true);
    setError('');

    try {
      // Extract text from PDF
      const text = await extractTextFromPDF(file);
      
      if (!text || text.trim().length < 100) {
        setError('Could not extract sufficient text from the PDF. Please ensure the file is a valid text-based PDF.');
        setIsAnalyzing(false);
        return;
      }

      // Call AI to analyze
      const result = await analyzeJudgmentWithAI(text);

      if (result.success && result.analysis) {
        setAnalysis(result.analysis);
      } else {
        setError(result.error || 'Failed to analyze judgment. Please try again.');
      }
    } catch (err) {
      console.error('Analysis error:', err);
      setError('An unexpected error occurred during analysis. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Helper function to extract text from PDF
  const extractTextFromPDF = async (file: File): Promise<string> => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);
      
      // Simple text extraction - convert PDF bytes to text
      // For production, you'd use a proper PDF library like pdf.js
      const text = new TextDecoder('utf-8').decode(uint8Array);
      
      // Extract readable text (basic approach)
      const cleanText = text
        .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, '') // Remove control characters
        .replace(/\s+/g, ' ') // Normalize whitespace
        .trim();
      
      return cleanText;
    } catch (error) {
      console.error('PDF extraction error:', error);
      throw new Error('Failed to extract text from PDF');
    }
  };

  return (
    <div className="h-full overflow-y-auto bg-gray-50">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="mb-6 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center">
            <Gavel className="w-5 h-5 text-blue-700" />
          </div>
          <div>
            <h1 className="text-gray-900 mb-1">Judgment Analyzer</h1>
            <p className="text-gray-600 text-sm">
              Upload a long judgment and get a clean, structured breakdown: timeline, sections, arguments, ratio vs obiter, and a
              plain-language summary.
            </p>
          </div>
        </div>

        {!analysis ? (
          <div className="bg-white rounded-xl border border-gray-200 p-8">
            <div className="max-w-2xl mx-auto">
              {/* Error Alert */}
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm text-red-800">{error}</p>
                  </div>
                  <button
                    onClick={() => setError('')}
                    className="text-red-600 hover:text-red-700"
                  >
                    ×
                  </button>
                </div>
              )}

              {/* Upload Area */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-blue-400 transition-colors">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <Upload className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-gray-900 mb-2">Upload Judgment PDF</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Upload a single judgment (PDF/DOC/DOCX, up to 10MB). The AI will read the full text and return only the 5 key
                    views you care about.
                  </p>
                  <label className="cursor-pointer">
                    <span className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 inline-block">
                      Choose File
                    </span>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Selected File */}
              {file && (
                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="text-sm text-gray-900">{file.name}</p>
                        <p className="text-xs text-gray-600">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setFile(null)}
                      className="text-sm text-red-600 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              )}

              {/* Analyze Button */}
              {file && (
                <div className="mt-6">
                  <button
                    onClick={handleAnalyze}
                    disabled={isAnalyzing}
                    className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isAnalyzing ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Analyzing Judgment with AI...
                      </>
                    ) : (
                      'Analyze Judgment'
                    )}
                  </button>
                </div>
              )}

              {/* Features */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-4 h-4 text-orange-700" />
                  </div>
                  <div>
                    <h4 className="text-gray-900 mb-1">Case Timeline</h4>
                    <p className="text-xs text-gray-600">Clear chronological steps from FIR to final judgment.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Scale className="w-4 h-4 text-purple-700" />
                  </div>
                  <div>
                    <h4 className="text-gray-900 mb-1">Sections & Ratio</h4>
                    <p className="text-xs text-gray-600">Highlights IPC/BNS, Evidence Act etc. and separates ratio from obiter.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-4 h-4 text-green-700" />
                  </div>
                  <div>
                    <h4 className="text-gray-900 mb-1">Plain-Language Summary</h4>
                    <p className="text-xs text-gray-600">Explains the judgment in simple, non-technical language.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Overview / Back */}
            <div className="bg-white rounded-xl border border-gray-200 p-5 flex items-center justify-between">
              <div>
                <h2 className="text-gray-900 mb-1">Judgment Breakdown</h2>
                <p className="text-gray-600 text-sm">
                  Generated from your uploaded judgment. Structured into: Case Timeline, Sections Involved, Arguments, Ratio vs
                  Obiter, and a Plain-Language Summary.
                </p>
              </div>
              <button
                onClick={() => setAnalysis(null)}
                className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-1 text-sm"
              >
                <ChevronLeft className="w-4 h-4" />
                Analyze another
              </button>
            </div>

            {/* 1. Case Timeline */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-4 h-4 text-orange-600" />
                <h3 className="text-gray-900">1. Case Timeline (Chronology)</h3>
              </div>
              <ol className="space-y-2 text-sm">
                {analysis.caseTimeline.map((step, idx) => (
                  <li key={idx} className="flex gap-3">
                    <span className="w-28 text-gray-500 text-xs md:text-sm">
                      {step.date}
                    </span>
                    <span className="text-gray-800 flex-1">{step.event}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* 2. Sections Involved */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-3">
                <Scale className="w-4 h-4 text-purple-700" />
                <h3 className="text-gray-900">2. Sections Involved (IPC/BNS, Evidence Act, CPC etc.)</h3>
              </div>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-800">
                {analysis.sectionsInvolved.map((sec, idx) => (
                  <li key={idx}>{sec}</li>
                ))}
              </ul>
            </div>

            {/* 3. Arguments – Petitioner vs Respondent */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-3">
                <FileText className="w-4 h-4 text-blue-700" />
                <h3 className="text-gray-900">3. Arguments – Petitioner vs Respondent</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="border border-blue-100 rounded-lg p-4 bg-blue-50/40">
                  <h4 className="text-xs font-semibold text-blue-800 mb-2 uppercase tracking-wide">Petitioner / Appellant</h4>
                  <p className="text-gray-800 whitespace-pre-line">{analysis.arguments.petitioner}</p>
                </div>
                <div className="border border-emerald-100 rounded-lg p-4 bg-emerald-50/40">
                  <h4 className="text-xs font-semibold text-emerald-800 mb-2 uppercase tracking-wide">Respondent / State</h4>
                  <p className="text-gray-800 whitespace-pre-line">{analysis.arguments.respondent}</p>
                </div>
              </div>
            </div>

            {/* 4. Ratio Decidendi vs Obiter Dicta */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-3">
                <Gavel className="w-4 h-4 text-red-700" />
                <h3 className="text-gray-900">4. Ratio Decidendi vs Obiter Dicta</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div>
                  <h4 className="text-xs font-semibold text-red-800 mb-2 uppercase tracking-wide">Ratio Decidendi (Core Principle)</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-800">
                    {analysis.ratioDecidendi.map((point, idx) => (
                      <li key={idx}>{point}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">Obiter Dicta (Additional Observations)</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-800">
                    {analysis.obiterDicta.map((point, idx) => (
                      <li key={idx}>{point}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* 5. Plain-Language Summary */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-3">
                <BookOpen className="w-4 h-4 text-green-700" />
                <h3 className="text-gray-900">5. Plain-Language Summary</h3>
              </div>
              <div className="prose prose-sm max-w-none text-gray-800 whitespace-pre-line">
                {analysis.plainLanguageSummary}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
