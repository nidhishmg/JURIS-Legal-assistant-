import { useState } from 'react';
import { Search, Filter, BookOpen, Calendar, Gavel, ChevronRight, Download, Bookmark } from 'lucide-react';

interface Judgment {
  id: string;
  title: string;
  citation: string;
  court: string;
  date: string;
  bench: string;
  subject: string;
  summary: string;
  status: 'Active' | 'Overruled' | 'Modified';
}

export function CaseLawSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedJudgment, setSelectedJudgment] = useState<Judgment | null>(null);
  const [filters, setFilters] = useState({
    court: '',
    yearFrom: '',
    yearTo: '',
    subject: '',
    bench: ''
  });

  const mockJudgments: Judgment[] = [
    {
      id: '1',
      title: 'State of Punjab vs. Baldev Singh',
      citation: '2024 SCC OnLine SC 1234',
      court: 'Supreme Court of India',
      date: '2024-10-15',
      bench: 'CJI D.Y. Chandrachud, Justice Sanjiv Khanna',
      subject: 'Criminal Law',
      summary: 'The Supreme Court held that the right to bail is an integral part of the right to life and liberty under Article 21.',
      status: 'Active'
    },
    {
      id: '2',
      title: 'Ramesh Kumar vs. State of Delhi',
      citation: '2024 SCC OnLine Del 5678',
      court: 'Delhi High Court',
      date: '2024-09-20',
      bench: 'Justice Rajiv Shakdher, Justice Tara Vitasta Ganju',
      subject: 'Service Law',
      summary: 'The High Court ruled on the principles of natural justice in disciplinary proceedings.',
      status: 'Active'
    },
    {
      id: '3',
      title: 'ABC Corporation vs. XYZ Ltd.',
      citation: '2024 SCC 234',
      court: 'Supreme Court of India',
      date: '2024-08-10',
      bench: 'Justice B.R. Gavai, Justice Vikram Nath',
      subject: 'Commercial Law',
      summary: 'Landmark judgment on arbitration clause interpretation in commercial contracts.',
      status: 'Active'
    },
    {
      id: '4',
      title: 'Priya Sharma vs. Raj Sharma',
      citation: '2024 SCC OnLine Del 3456',
      court: 'Delhi High Court',
      date: '2024-07-15',
      bench: 'Justice Suresh Kumar Kait',
      subject: 'Family Law',
      summary: 'Court held that cruelty under Section 13 of Hindu Marriage Act must be of such nature that makes living together impossible.',
      status: 'Active'
    }
  ];

  const [results, setResults] = useState<Judgment[]>(mockJudgments);

  const handleSearch = () => {
    // Simulate search
    if (searchQuery.trim()) {
      setResults(mockJudgments.filter(j => 
        j.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        j.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        j.summary.toLowerCase().includes(searchQuery.toLowerCase())
      ));
    } else {
      setResults(mockJudgments);
    }
  };

  const courts = ['Supreme Court of India', 'Delhi High Court', 'Bombay High Court', 'All High Courts'];
  const subjects = ['Criminal Law', 'Civil Law', 'Commercial Law', 'Family Law', 'Constitutional Law', 'Service Law'];

  if (selectedJudgment) {
    return (
      <div className="h-full overflow-y-auto bg-white">
        <div className="max-w-5xl mx-auto p-6">
          {/* Back Button */}
          <button
            onClick={() => setSelectedJudgment(null)}
            className="mb-6 flex items-center gap-2 text-blue-600 hover:text-blue-700"
          >
            <ChevronRight className="w-4 h-4 rotate-180" />
            Back to Results
          </button>

          {/* Judgment Header */}
          <div className="mb-8">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h1 className="text-gray-900 mb-2">{selectedJudgment.title}</h1>
                <p className="text-gray-600">{selectedJudgment.citation}</p>
              </div>
              <div className="flex gap-2">
                <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Bookmark className="w-5 h-5 text-gray-600" />
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Download
                </button>
              </div>
            </div>

            {/* Metadata */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-500">Court</p>
                <p className="text-gray-900">{selectedJudgment.court}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Date of Judgment</p>
                <p className="text-gray-900">{new Date(selectedJudgment.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Bench</p>
                <p className="text-gray-900">{selectedJudgment.bench}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Subject</p>
                <p className="text-gray-900">{selectedJudgment.subject}</p>
              </div>
            </div>
          </div>

          {/* Judgment Content */}
          <div className="space-y-6">
            <section>
              <h2 className="text-gray-900 mb-3">Summary</h2>
              <p className="text-gray-700 leading-relaxed">{selectedJudgment.summary}</p>
            </section>

            <section>
              <h2 className="text-gray-900 mb-3">Facts of the Case</h2>
              <p className="text-gray-700 leading-relaxed">
                The petitioner filed the present petition challenging the order passed by the lower court. The factual matrix of the case reveals that certain events transpired which led to the initiation of legal proceedings. The petitioner contended that the impugned order was passed without proper consideration of the material facts and applicable legal principles.
              </p>
            </section>

            <section>
              <h2 className="text-gray-900 mb-3">Issues Raised</h2>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li>Whether the lower court's order was justified in law?</li>
                <li>Whether the principles of natural justice were followed?</li>
                <li>What relief can be granted to the petitioner?</li>
              </ol>
            </section>

            <section>
              <h2 className="text-gray-900 mb-3">Arguments</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-gray-900 mb-2">Petitioner's Arguments</h3>
                  <p className="text-gray-700 leading-relaxed">
                    The learned counsel for the petitioner argued that the impugned order suffers from material irregularities and is liable to be set aside. It was submitted that the principles of natural justice were not followed and the petitioner was not given adequate opportunity to present their case.
                  </p>
                </div>
                <div>
                  <h3 className="text-gray-900 mb-2">Respondent's Arguments</h3>
                  <p className="text-gray-700 leading-relaxed">
                    The learned counsel for the respondent contended that the order was passed after due consideration of all facts and circumstances. It was argued that the petitioner's claims are not substantiated by evidence and the petition lacks merit.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-gray-900 mb-3">Court's Analysis (Ratio Decidendi)</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                After hearing the learned counsels for both parties and perusing the record, the Court observed that the principles of natural justice are fundamental to any judicial or quasi-judicial proceedings. The Court analyzed the relevant statutory provisions and precedents.
              </p>
              <p className="text-gray-700 leading-relaxed">
                The Court held that in matters involving civil liberties, the approach of the courts must be liberal and justice-oriented. The technical objections cannot override substantial justice.
              </p>
            </section>

            <section>
              <h2 className="text-gray-900 mb-3">Judgment and Order</h2>
              <div className="p-4 bg-blue-50 border-l-4 border-blue-600 rounded">
                <p className="text-gray-900">
                  In view of the above discussion, the petition is allowed. The impugned order is hereby set aside. The matter is remanded back to the lower court for fresh consideration in accordance with law.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-gray-900 mb-3">Precedents Cited</h2>
              <ul className="space-y-2">
                <li className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-gray-900">Maneka Gandhi vs. Union of India, AIR 1978 SC 597</p>
                  <p className="text-sm text-gray-600">On Article 21 and principles of natural justice</p>
                </li>
                <li className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-gray-900">Kesavananda Bharati vs. State of Kerala, AIR 1973 SC 1461</p>
                  <p className="text-sm text-gray-600">On constitutional interpretation</p>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-gray-900 mb-3">Statutes Referred</h2>
              <ul className="space-y-2">
                <li className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-gray-900">Constitution of India, Article 21</p>
                </li>
                <li className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-gray-900">Code of Civil Procedure, 1908 - Order XXIII</p>
                </li>
              </ul>
            </section>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex gap-3">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Add to Case
            </button>
            <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
              Save Summary
            </button>
            <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
              Open Full Judgment
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-6">
        <h1 className="text-gray-900 mb-4">Case Law Search</h1>
        
        {/* Search Bar */}
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Search by case name, citation, subject, or keywords..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={handleSearch}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Search
          </button>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center gap-2"
          >
            <Filter className="w-5 h-5" />
            Filters
          </button>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm text-gray-700 mb-2">Court</label>
                <select
                  value={filters.court}
                  onChange={(e) => setFilters({ ...filters, court: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Courts</option>
                  {courts.map(court => (
                    <option key={court} value={court}>{court}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Subject</label>
                <select
                  value={filters.subject}
                  onChange={(e) => setFilters({ ...filters, subject: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Subjects</option>
                  {subjects.map(subject => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Year Range</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="From"
                    value={filters.yearFrom}
                    onChange={(e) => setFilters({ ...filters, yearFrom: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="number"
                    placeholder="To"
                    value={filters.yearTo}
                    onChange={(e) => setFilters({ ...filters, yearTo: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Results */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-gray-600">{results.length} judgments found</p>
          </div>

          <div className="space-y-4">
            {results.map((judgment) => (
              <div
                key={judgment.id}
                onClick={() => setSelectedJudgment(judgment)}
                className="bg-white border border-gray-200 rounded-lg p-6 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-gray-900 mb-1">{judgment.title}</h3>
                    <p className="text-sm text-gray-600">{judgment.citation}</p>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                    {judgment.status}
                  </span>
                </div>

                <p className="text-sm text-gray-700 mb-4 line-clamp-2">{judgment.summary}</p>

                <div className="flex items-center gap-6 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Gavel className="w-4 h-4" />
                    {judgment.court}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(judgment.date).toLocaleDateString('en-IN')}
                  </span>
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    {judgment.subject}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
