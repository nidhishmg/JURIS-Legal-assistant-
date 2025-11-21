import { useState } from 'react';
import { Brain, CheckCircle2 } from 'lucide-react';

export function CaseTheoryBuilder() {
  const [theory, setTheory] = useState({
    issue: '',
    rule: '',
    application: '',
    conclusion: ''
  });

  return (
    <div className="h-full overflow-y-auto bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-gray-900 mb-2">Case Theory Builder</h1>
          <p className="text-gray-600">Build your case using the IRAC framework</p>
        </div>

        <div className="space-y-6">
          {/* Issue */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                I
              </div>
              <h2 className="text-gray-900">Issue</h2>
            </div>
            <textarea
              value={theory.issue}
              onChange={(e) => setTheory({ ...theory, issue: e.target.value })}
              placeholder="What is the legal question that needs to be answered?"
              className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          {/* Rule */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                R
              </div>
              <h2 className="text-gray-900">Rule</h2>
            </div>
            <textarea
              value={theory.rule}
              onChange={(e) => setTheory({ ...theory, rule: e.target.value })}
              placeholder="What is the applicable law or legal principle?"
              className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          {/* Application */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">
                A
              </div>
              <h2 className="text-gray-900">Application</h2>
            </div>
            <textarea
              value={theory.application}
              onChange={(e) => setTheory({ ...theory, application: e.target.value })}
              placeholder="How does the law apply to the facts of this case?"
              className="w-full h-48 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          {/* Conclusion */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-600">
                C
              </div>
              <h2 className="text-gray-900">Conclusion</h2>
            </div>
            <textarea
              value={theory.conclusion}
              onChange={(e) => setTheory({ ...theory, conclusion: e.target.value })}
              placeholder="What is your conclusion based on the application of law to facts?"
              className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          <div className="flex gap-3">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Save Theory
            </button>
            <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
              Use in Draft
            </button>
            <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
              Export
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
