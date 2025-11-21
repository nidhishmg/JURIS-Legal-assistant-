import { useState } from 'react';
import { Search, BookOpen, Lightbulb } from 'lucide-react';

export function BareActExplainer() {
  const [searchQuery, setSearchQuery] = useState('');
  const [explanation, setExplanation] = useState<any>(null);

  const handleSearch = () => {
    setExplanation({
      section: 'Section 420 IPC',
      title: 'Cheating and dishonestly inducing delivery of property',
      bareText: 'Whoever cheats and thereby dishonestly induces the person deceived to deliver any property to any person, or to make, alter or destroy the whole or any part of a valuable security, or anything which is signed or sealed, and which is capable of being converted into a valuable security, shall be punished with imprisonment of either description for a term which may extend to seven years, and shall also be liable to fine.',
      simpleExplanation: 'This section deals with the offense of cheating where someone tricks another person into giving them property or valuable items. The person committing this offense can be imprisoned for up to 7 years and may also have to pay a fine.',
      keyPoints: [
        'There must be cheating involved',
        'The victim must be dishonestly induced',
        'Property or valuable security must be delivered',
        'Punishment: Up to 7 years imprisonment and fine'
      ],
      examples: [
        'A promises B to invest money in a business but takes the money and disappears',
        'Someone sells fake gold by claiming it is genuine',
        'Obtaining property by impersonating someone else'
      ],
      relatedCases: [
        'R. Balakrishna Pillai vs. State of Kerala (1996)'
      ]
    });
  };

  return (
    <div className="h-full overflow-y-auto bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-gray-900 mb-2">Bare Act Explainer</h1>
          <p className="text-gray-600">Understand legal provisions in simple language</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Enter section number (e.g., Section 420 IPC, Article 21)"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={handleSearch}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Explain
            </button>
          </div>
        </div>

        {explanation && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <BookOpen className="w-6 h-6 text-blue-600" />
                <h2 className="text-gray-900">{explanation.section}</h2>
              </div>
              <h3 className="text-gray-900 mb-4">{explanation.title}</h3>
              <div className="p-4 bg-gray-50 border-l-4 border-gray-400 rounded">
                <p className="text-sm text-gray-700 italic">{explanation.bareText}</p>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Lightbulb className="w-6 h-6 text-blue-600" />
                <h3 className="text-blue-900">Simple Explanation</h3>
              </div>
              <p className="text-blue-800">{explanation.simpleExplanation}</p>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-gray-900 mb-3">Key Points</h3>
              <ul className="space-y-2">
                {explanation.keyPoints.map((point: string, index: number) => (
                  <li key={index} className="flex gap-2">
                    <span className="text-blue-600">•</span>
                    <span className="text-gray-700">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-gray-900 mb-3">Examples</h3>
              <ul className="space-y-3">
                {explanation.examples.map((example: string, index: number) => (
                  <li key={index} className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-gray-700">
                    {example}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
