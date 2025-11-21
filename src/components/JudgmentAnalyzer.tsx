import { useState } from 'react';
import { Upload, FileText, Download, Bookmark, Clock, User, Gavel } from 'lucide-react';

interface Analysis {
  title: string;
  citation: string;
  court: string;
  date: string;
  bench: string;
  facts: string;
  issues: string[];
  timeline: Array<{ date: string; event: string }>;
  arguments: {
    petitioner: string;
    respondent: string;
  };
  ratio: string;
  decision: string;
}

export function JudgmentAnalyzer() {
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<Analysis | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (uploadedFile) {
      setFile(uploadedFile);
    }
  };

  const handleAnalyze = () => {
    if (!file) return;

    setIsAnalyzing(true);

    // Simulate analysis
    setTimeout(() => {
      const mockAnalysis: Analysis = {
        title: 'State of Punjab vs. Baldev Singh',
        citation: '2024 SCC OnLine SC 1234',
        court: 'Supreme Court of India',
        date: '2024-10-15',
        bench: 'CJI D.Y. Chandrachud, Justice Sanjiv Khanna, Justice B.R. Gavai',
        facts: `The appellant was arrested under Sections 302, 307 IPC and relevant sections of the Arms Act. The prosecution case was that on the fateful day, the accused persons had a dispute with the deceased over property matters. The incident occurred at around 8 PM when the accused allegedly opened fire resulting in the death of one person and injuries to two others. The trial court convicted the accused and sentenced him to life imprisonment. The High Court upheld the conviction. Hence, the present appeal.`,
        issues: [
          'Whether the prosecution has proved the case beyond reasonable doubt?',
          'Whether the conviction and sentence awarded by the trial court are justified?',
          'Whether the appellant is entitled to bail pending appeal?',
          'Whether the evidence of eyewitnesses is reliable?'
        ],
        timeline: [
          { date: '2023-01-15', event: 'Incident occurred - FIR registered' },
          { date: '2023-01-16', event: 'Accused arrested' },
          { date: '2023-02-20', event: 'Chargesheet filed' },
          { date: '2023-03-10', event: 'Trial commenced' },
          { date: '2023-12-15', event: 'Trial court judgment - convicted' },
          { date: '2024-06-20', event: 'High Court appeal dismissed' },
          { date: '2024-10-15', event: 'Supreme Court judgment' }
        ],
        arguments: {
          petitioner: `The learned counsel for the appellant contended that the prosecution case is based on circumstantial evidence and the same is not sufficient to prove guilt beyond reasonable doubt. It was argued that there are material contradictions in the statements of eyewitnesses. The defence witnesses were not properly examined. The motive attributed to the appellant is not established. The investigating officer failed to collect crucial evidence from the scene of crime. The conviction is based on surmises and conjectures.`,
          respondent: `The learned counsel for the State argued that the prosecution has established its case through reliable eyewitness testimony. The medical evidence corroborates the prosecution case. The recovery of weapon from the possession of the accused is a strong circumstance. The motive is clearly established through evidence on record. Minor contradictions in witness statements do not affect the core of the prosecution case. The trial court and High Court have rightly appreciated the evidence.`
        },
        ratio: `The Supreme Court held that in cases based on circumstantial evidence, each circumstance must be proved beyond reasonable doubt and the chain of circumstances must be complete. The Court observed that eyewitness testimony must be scrutinized carefully, especially when there are material contradictions. The Court held that the benefit of doubt must be given to the accused when the prosecution fails to prove its case beyond reasonable doubt. The right to fair trial is a fundamental right under Article 21 of the Constitution.`,
        decision: `After careful consideration of the evidence on record and hearing the learned counsels, the Court found that the prosecution has failed to establish the guilt of the appellant beyond reasonable doubt. There are material contradictions in the testimony of eyewitnesses which have not been satisfactorily explained. The recovery of weapon is not properly proved as per legal requirements. In view of the above, the appeal is allowed. The conviction and sentence are set aside. The appellant is directed to be released forthwith if not required in any other case.`
      };

      setAnalysis(mockAnalysis);
      setIsAnalyzing(false);
    }, 3000);
  };

  return (
    <div className="h-full overflow-y-auto bg-gray-50">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-gray-900 mb-2">Judgment Analyzer</h1>
          <p className="text-gray-600">
            Upload and analyze court judgments - extract key points, ratios, and summaries
          </p>
        </div>

        {!analysis ? (
          /* Upload Section */
          <div className="bg-white rounded-xl border border-gray-200 p-8">
            <div className="max-w-2xl mx-auto">
              {/* Upload Area */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-blue-400 transition-colors">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <Upload className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-gray-900 mb-2">Upload Judgment Document</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Supports PDF, DOC, DOCX files up to 10MB
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
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Analyzing Judgment...
                      </>
                    ) : (
                      'Analyze Judgment'
                    )}
                  </button>
                </div>
              )}

              {/* Features */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <h4 className="text-sm text-gray-900 mb-1">Extract Facts</h4>
                    <p className="text-xs text-gray-600">
                      Automatically identify case facts and background
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Gavel className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="text-sm text-gray-900 mb-1">Identify Ratio</h4>
                    <p className="text-xs text-gray-600">
                      Extract ratio decidendi and legal principles
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-4 h-4 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="text-sm text-gray-900 mb-1">Timeline View</h4>
                    <p className="text-xs text-gray-600">
                      Visualize case chronology and key events
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-sm text-gray-900 mb-1">Arguments Analysis</h4>
                    <p className="text-xs text-gray-600">
                      Summarize arguments from both parties
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Analysis Results */
          <div className="space-y-6">
            {/* Header Card */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h2 className="text-gray-900 mb-2">{analysis.title}</h2>
                  <p className="text-gray-600 mb-4">{analysis.citation}</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Court</p>
                      <p className="text-gray-900">{analysis.court}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Date of Judgment</p>
                      <p className="text-gray-900">
                        {new Date(analysis.date).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Bench</p>
                      <p className="text-gray-900">{analysis.bench}</p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <Bookmark className="w-5 h-5 text-gray-600" />
                  </button>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Export
                  </button>
                </div>
              </div>
            </div>

            {/* Facts */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-gray-900 mb-3">Facts of the Case</h3>
              <p className="text-gray-700 leading-relaxed">{analysis.facts}</p>
            </div>

            {/* Issues */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-gray-900 mb-3">Issues Raised</h3>
              <ol className="list-decimal list-inside space-y-2">
                {analysis.issues.map((issue, index) => (
                  <li key={index} className="text-gray-700">{issue}</li>
                ))}
              </ol>
            </div>

            {/* Timeline */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-gray-900 mb-4">Case Timeline</h3>
              <div className="relative">
                {analysis.timeline.map((event, index) => (
                  <div key={index} className="flex gap-4 mb-6 last:mb-0">
                    <div className="relative">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Clock className="w-5 h-5 text-blue-600" />
                      </div>
                      {index < analysis.timeline.length - 1 && (
                        <div className="absolute left-5 top-10 bottom-0 w-0.5 bg-gray-200 -mb-6"></div>
                      )}
                    </div>
                    <div className="flex-1 pt-1">
                      <p className="text-sm text-gray-500 mb-1">
                        {new Date(event.date).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </p>
                      <p className="text-gray-900">{event.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Arguments */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-gray-900 mb-4">Arguments</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-gray-900 mb-2">Petitioner's Arguments</h4>
                  <p className="text-gray-700 leading-relaxed">{analysis.arguments.petitioner}</p>
                </div>
                <div>
                  <h4 className="text-gray-900 mb-2">Respondent's Arguments</h4>
                  <p className="text-gray-700 leading-relaxed">{analysis.arguments.respondent}</p>
                </div>
              </div>
            </div>

            {/* Ratio Decidendi */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h3 className="text-gray-900 mb-3">Ratio Decidendi (Legal Principle)</h3>
              <p className="text-gray-700 leading-relaxed">{analysis.ratio}</p>
            </div>

            {/* Final Decision */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
              <h3 className="text-gray-900 mb-3">Final Decision</h3>
              <p className="text-gray-700 leading-relaxed">{analysis.decision}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Attach to Case
              </button>
              <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                Save Summary
              </button>
              <button
                onClick={() => {
                  setAnalysis(null);
                  setFile(null);
                }}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Analyze Another
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
