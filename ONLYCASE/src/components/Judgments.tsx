import { useState } from 'react';
import { Search, Gavel, BookOpen, Calendar, Download, Bookmark, Eye } from 'lucide-react';

interface Judgment {
  id: string;
  title: string;
  citation: string;
  court: string;
  date: string;
  bench: string;
  subject: string;
  summary: string;
  savedDate: string;
  tags: string[];
}

export function Judgments() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSubject, setFilterSubject] = useState('all');

  const mockJudgments: Judgment[] = [
    {
      id: '1',
      title: 'Maneka Gandhi vs. Union of India',
      citation: 'AIR 1978 SC 597',
      court: 'Supreme Court of India',
      date: '1978-01-25',
      bench: '7-Judge Bench',
      subject: 'Constitutional Law',
      summary: 'Landmark judgment on Article 21 and the right to life and personal liberty. Established that procedure must be just, fair and reasonable.',
      savedDate: '2024-11-15',
      tags: ['Article 21', 'Fundamental Rights', 'Procedure']
    },
    {
      id: '2',
      title: 'Kesavananda Bharati vs. State of Kerala',
      citation: 'AIR 1973 SC 1461',
      court: 'Supreme Court of India',
      date: '1973-04-24',
      bench: '13-Judge Bench',
      subject: 'Constitutional Law',
      summary: 'Historic judgment establishing the basic structure doctrine of the Indian Constitution.',
      savedDate: '2024-11-14',
      tags: ['Basic Structure', 'Constitution', 'Amendment']
    },
    {
      id: '3',
      title: 'State vs. Ramesh Kumar',
      citation: '2024 SCC OnLine Del 2345',
      court: 'Delhi High Court',
      date: '2024-10-15',
      bench: 'Justice Rajiv Shakdher',
      subject: 'Criminal Law',
      summary: 'Interpretation of Section 420 IPC in context of cheating and dishonest inducement.',
      savedDate: '2024-11-10',
      tags: ['Section 420', 'Cheating', 'IPC']
    },
    {
      id: '4',
      title: 'Vishaka vs. State of Rajasthan',
      citation: 'AIR 1997 SC 3011',
      court: 'Supreme Court of India',
      date: '1997-08-13',
      bench: '3-Judge Bench',
      subject: 'Women Rights',
      summary: 'Guidelines on sexual harassment at workplace, later codified in the Sexual Harassment Act 2013.',
      savedDate: '2024-11-08',
      tags: ['Sexual Harassment', 'Women Rights', 'Workplace']
    }
  ];

  const [judgments] = useState<Judgment[]>(mockJudgments);

  const subjects = ['All', 'Constitutional Law', 'Criminal Law', 'Civil Law', 'Commercial Law', 'Women Rights'];

  const filteredJudgments = judgments.filter(judgment => {
    const matchesSearch = judgment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         judgment.citation.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = filterSubject === 'all' || judgment.subject === filterSubject;
    return matchesSearch && matchesSubject;
  });

  return (
    <div className="h-full overflow-y-auto bg-gray-50">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-gray-900 mb-2">Saved Judgments</h1>
          <p className="text-gray-600">Your library of important case law and judgments</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Gavel className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl text-gray-900">{judgments.length}</p>
                <p className="text-sm text-gray-600">Total Saved</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl text-gray-900">
                  {judgments.filter(j => j.court === 'Supreme Court of India').length}
                </p>
                <p className="text-sm text-gray-600">Supreme Court</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Bookmark className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl text-gray-900">
                  {judgments.filter(j => j.court.includes('High Court')).length}
                </p>
                <p className="text-sm text-gray-600">High Courts</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl text-gray-900">12</p>
                <p className="text-sm text-gray-600">This Month</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by case name or citation..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <select
              value={filterSubject}
              onChange={(e) => setFilterSubject(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {subjects.map(subject => (
                <option key={subject} value={subject.toLowerCase()}>{subject}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Judgments Grid */}
        <div className="space-y-4">
          {filteredJudgments.map((judgment) => (
            <div
              key={judgment.id}
              className="bg-white border border-gray-200 rounded-xl p-6 hover:border-blue-300 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-gray-900 mb-2">{judgment.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{judgment.citation}</p>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <span className="flex items-center gap-1">
                      <Gavel className="w-4 h-4" />
                      {judgment.court}
                    </span>
                    <span>•</span>
                    <span>{judgment.bench}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(judgment.date).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </span>
                  </div>

                  <p className="text-sm text-gray-700 mb-4 bg-gray-50 p-3 rounded-lg">
                    {judgment.summary}
                  </p>

                  <div className="flex items-center gap-2 mb-3">
                    {judgment.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      View Full Judgment
                    </button>
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm flex items-center gap-2">
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm">
                      Add to Case
                    </button>
                  </div>
                </div>

                <button className="p-2 text-yellow-500 hover:bg-yellow-50 rounded-lg">
                  <Bookmark className="w-5 h-5 fill-current" />
                </button>
              </div>

              <div className="text-xs text-gray-500 mt-4 pt-4 border-t border-gray-200">
                Saved on {new Date(judgment.savedDate).toLocaleDateString('en-IN')}
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredJudgments.length === 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <Gavel className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-gray-900 mb-2">No judgments found</h3>
            <p className="text-gray-600">
              Try adjusting your search or start adding judgments from Case Law Search
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
