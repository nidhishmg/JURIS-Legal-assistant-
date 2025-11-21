import { useState } from 'react';
import { Upload, FileText, Lightbulb, AlertCircle, CheckCircle2, XCircle, Users, Calendar } from 'lucide-react';

interface ExtractedFacts {
  parties: {
    petitioner: string[];
    respondent: string[];
  };
  keyFacts: string[];
  dates: Array<{ date: string; event: string }>;
  evidence: string[];
  missing: string[];
  contradictions: string[];
}

export function FactExtraction() {
  const [file, setFile] = useState<File | null>(null);
  const [textInput, setTextInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedFacts, setExtractedFacts] = useState<ExtractedFacts | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (uploadedFile) {
      setFile(uploadedFile);
    }
  };

  const handleExtract = () => {
    setIsProcessing(true);

    // Simulate extraction
    setTimeout(() => {
      const mockFacts: ExtractedFacts = {
        parties: {
          petitioner: ['Ramesh Sharma', 'Represented by Adv. Rajesh Kumar'],
          respondent: ['State of Delhi', 'Through Public Prosecutor']
        },
        keyFacts: [
          'FIR No. 234/2024 registered on 15th January 2024 at PS Rohini',
          'Accused allegedly committed fraud amounting to Rs. 5,00,000',
          'Complaint filed by victim Mr. Suresh Kumar on 14th January 2024',
          'Transaction occurred through online banking on 10th January 2024',
          'Accused promised investment returns of 25% within 3 months',
          'No investment actually made; money transferred to personal account',
          'Victim realized fraud when returns not received and accused became untraceable'
        ],
        dates: [
          { date: '2024-01-10', event: 'Fraudulent transaction occurred' },
          { date: '2024-01-14', event: 'Victim filed complaint' },
          { date: '2024-01-15', event: 'FIR registered' },
          { date: '2024-01-18', event: 'Accused arrested' },
          { date: '2024-02-01', event: 'Chargesheet filed' }
        ],
        evidence: [
          'Bank transaction records showing transfer of Rs. 5,00,000',
          'WhatsApp chat messages between victim and accused',
          'Email correspondence regarding investment scheme',
          'Witness statement of Mr. Verma who also lost money',
          'Digital evidence from accused\'s mobile phone'
        ],
        missing: [
          'Complete bank account details of accused',
          'Details of other victims (if any)',
          'Documentary evidence of the fake investment scheme',
          'Call detail records between parties'
        ],
        contradictions: [
          'Accused claims transaction was a loan, but no loan agreement exists',
          'Victim states promised return was 25%, accused claims 15%',
          'Date of first meeting disputed - victim says Dec 2023, accused says Jan 2024'
        ]
      };

      setExtractedFacts(mockFacts);
      setIsProcessing(false);
    }, 2500);
  };

  return (
    <div className="h-full overflow-y-auto bg-gray-50">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-gray-900 mb-2">Fact Extraction</h1>
          <p className="text-gray-600">
            Upload documents or paste text to automatically extract key facts, parties, dates, and evidence
          </p>
        </div>

        {!extractedFacts ? (
          /* Input Section */
          <div className="space-y-6">
            {/* Upload Area */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-gray-900 mb-4">Upload Document</h2>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-700 mb-4">
                  Upload FIR, complaint, affidavit, or any case document
                </p>
                <label className="cursor-pointer">
                  <span className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 inline-block">
                    Choose File
                  </span>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx,.txt"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
                <p className="text-xs text-gray-500 mt-4">
                  Supports PDF, DOC, DOCX, TXT
                </p>
              </div>

              {file && (
                <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="text-sm text-gray-900">{file.name}</p>
                        <p className="text-xs text-gray-600">
                          {(file.size / 1024).toFixed(2)} KB
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
            </div>

            {/* Text Input Area */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-gray-900 mb-4">Or Paste Text</h2>
              <textarea
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder="Paste the case facts, FIR text, or any narrative here..."
                className="w-full h-64 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>

            {/* Extract Button */}
            <button
              onClick={handleExtract}
              disabled={!file && !textInput.trim() || isProcessing}
              className="w-full px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Extracting Facts...
                </>
              ) : (
                <>
                  <Lightbulb className="w-5 h-5" />
                  Extract Facts
                </>
              )}
            </button>
          </div>
        ) : (
          /* Results Section */
          <div className="space-y-6">
            {/* Parties */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <Users className="w-6 h-6 text-blue-600" />
                <h2 className="text-gray-900">Parties Involved</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h3 className="text-blue-900 mb-2">Petitioner/Plaintiff</h3>
                  <ul className="space-y-1">
                    {extractedFacts.parties.petitioner.map((party, index) => (
                      <li key={index} className="text-sm text-blue-800">{party}</li>
                    ))}
                  </ul>
                </div>
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <h3 className="text-red-900 mb-2">Respondent/Defendant</h3>
                  <ul className="space-y-1">
                    {extractedFacts.parties.respondent.map((party, index) => (
                      <li key={index} className="text-sm text-red-800">{party}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Key Facts */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
                <h2 className="text-gray-900">Key Facts</h2>
              </div>
              <ul className="space-y-3">
                {extractedFacts.keyFacts.map((fact, index) => (
                  <li key={index} className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-sm">
                      {index + 1}
                    </span>
                    <p className="text-gray-700 flex-1">{fact}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Timeline */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <Calendar className="w-6 h-6 text-purple-600" />
                <h2 className="text-gray-900">Important Dates</h2>
              </div>
              <div className="space-y-3">
                {extractedFacts.dates.map((item, index) => (
                  <div key={index} className="flex gap-4 items-start">
                    <div className="flex-shrink-0 w-24 text-sm text-gray-600">
                      {new Date(item.date).toLocaleDateString('en-IN', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </div>
                    <div className="flex-1 p-3 bg-purple-50 border border-purple-200 rounded-lg">
                      <p className="text-sm text-gray-900">{item.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Evidence */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <FileText className="w-6 h-6 text-blue-600" />
                <h2 className="text-gray-900">Evidence Available</h2>
              </div>
              <ul className="space-y-2">
                {extractedFacts.evidence.map((evidence, index) => (
                  <li key={index} className="flex gap-3 items-start">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-700">{evidence}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Missing Information */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <AlertCircle className="w-6 h-6 text-orange-600" />
                <h2 className="text-gray-900">Missing Information</h2>
              </div>
              <ul className="space-y-2">
                {extractedFacts.missing.map((item, index) => (
                  <li key={index} className="flex gap-3 items-start">
                    <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-700">{item}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contradictions */}
            {extractedFacts.contradictions.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <XCircle className="w-6 h-6 text-red-600" />
                  <h2 className="text-gray-900">Potential Contradictions</h2>
                </div>
                <ul className="space-y-2">
                  {extractedFacts.contradictions.map((item, index) => (
                    <li key={index} className="flex gap-3 items-start">
                      <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <p className="text-gray-700">{item}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3">
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Add to Case
              </button>
              <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                Send to Strategy Board
              </button>
              <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                Use in Draft
              </button>
              <button
                onClick={() => {
                  setExtractedFacts(null);
                  setFile(null);
                  setTextInput('');
                }}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Extract Another
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
