import { useState } from 'react';
import { Target, AlertCircle, Scale, FileText, Upload } from 'lucide-react';

export function IssueSpotting() {
  const [input, setInput] = useState('');
  const [issues, setIssues] = useState<any>(null);

  const handleAnalyze = () => {
    setIssues({
      procedural: [
        'Whether the court has territorial jurisdiction?',
        'Whether the suit is within limitation period?',
        'Whether proper court fees have been paid?'
      ],
      substantive: [
        'Whether the accused committed cheating under Section 420 IPC?',
        'Whether there was dishonest inducement?',
        'Whether mens rea (guilty mind) can be established?'
      ],
      evidence: [
        'Admissibility of WhatsApp chat messages',
        'Reliability of eyewitness testimony',
        'Authentication of bank transaction records'
      ],
      constitutional: [
        'Whether the procedure followed violates Article 21?',
        'Right to fair trial considerations'
      ]
    });
  };

  return (
    <div className="h-full overflow-y-auto bg-gray-50">
      <div className="max-w-6xl mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-gray-900 mb-2">Issue Spotting</h1>
          <p className="text-gray-600">Identify procedural, substantive, and evidentiary issues</p>
        </div>

        {!issues ? (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-gray-900 mb-4">Enter Case Details</h2>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Paste case facts, pleadings, or upload document..."
                className="w-full h-64 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>

            <button
              onClick={handleAnalyze}
              disabled={!input.trim()}
              className="w-full px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 flex items-center justify-center gap-2"
            >
              <Target className="w-5 h-5" />
              Spot Issues
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <Scale className="w-6 h-6 text-blue-600" />
                <h2 className="text-gray-900">Procedural Issues</h2>
              </div>
              <ul className="space-y-3">
                {issues.procedural.map((issue: string, index: number) => (
                  <li key={index} className="flex gap-3 items-start p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-900">{issue}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <FileText className="w-6 h-6 text-green-600" />
                <h2 className="text-gray-900">Substantive Legal Issues</h2>
              </div>
              <ul className="space-y-3">
                {issues.substantive.map((issue: string, index: number) => (
                  <li key={index} className="flex gap-3 items-start p-3 bg-green-50 border border-green-200 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-900">{issue}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <Target className="w-6 h-6 text-purple-600" />
                <h2 className="text-gray-900">Evidence Issues</h2>
              </div>
              <ul className="space-y-3">
                {issues.evidence.map((issue: string, index: number) => (
                  <li key={index} className="flex gap-3 items-start p-3 bg-purple-50 border border-purple-200 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-900">{issue}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <Scale className="w-6 h-6 text-orange-600" />
                <h2 className="text-gray-900">Constitutional Issues</h2>
              </div>
              <ul className="space-y-3">
                {issues.constitutional.map((issue: string, index: number) => (
                  <li key={index} className="flex gap-3 items-start p-3 bg-orange-50 border border-orange-200 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-900">{issue}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex gap-3">
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Add to Strategy Board
              </button>
              <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                Export Report
              </button>
              <button
                onClick={() => { setIssues(null); setInput(''); }}
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
