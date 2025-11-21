import { useState } from 'react';
import { Search, ArrowRight, BookOpen, Scale, AlertCircle, Loader2 } from 'lucide-react';
import { convertIPCBNSWithAI } from '../services/grokAI';

interface ConversionResult {
  ipc: {
    section: string;
    title: string;
    description: string;
    punishment: string;
  };
  bns: {
    section: string;
    title: string;
    description: string;
    punishment: string;
  };
  changes: string[];
  caseReferences: Array<{ title: string; citation: string }>;
}

export function IPCBNSConverter() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState<'ipc' | 'bns'>('ipc');
  const [result, setResult] = useState<ConversionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setError('Please enter a section number');
      return;
    }

    setIsLoading(true);
    setError('');
    setResult(null);

    try {
      // Extract section number from query
      const sectionMatch = searchQuery.match(/\d+[A-Za-z]*/);
      if (!sectionMatch) {
        setError('Invalid section format. Please enter a valid section number (e.g., 420, 498A)');
        setIsLoading(false);
        return;
      }

      const section = sectionMatch[0];
      
      // Call AI service
      const response = await convertIPCBNSWithAI(section, searchType);

      if (response.success && response.result) {
        setResult(response.result);
      } else {
        setError(response.error || 'Failed to convert section. Please try again.');
      }
    } catch (err) {
      console.error('Conversion error:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const popularSections = [
    { ipc: '302', bns: '103', name: 'Murder' },
    { ipc: '420', bns: '318', name: 'Cheating' },
    { ipc: '376', bns: '63', name: 'Rape' },
    { ipc: '498A', bns: '84', name: 'Dowry Cruelty' },
    { ipc: '307', bns: '109', name: 'Attempt to Murder' },
    { ipc: '354', bns: '74', name: 'Assault on Woman' },
  ];

  return (
    <div className="h-full overflow-y-auto bg-gray-50">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-gray-900 mb-2">IPC ↔ BNS Converter</h1>
          <p className="text-gray-600">
            Convert between Indian Penal Code (IPC) and Bharatiya Nyaya Sanhita (BNS) sections
          </p>
        </div>

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-blue-900 mb-1">About Bharatiya Nyaya Sanhita (BNS)</h3>
            <p className="text-sm text-blue-700">
              The Bharatiya Nyaya Sanhita (BNS) replaces the Indian Penal Code (IPC) with modernized provisions. 
              While most provisions remain similar, section numbers and some procedural aspects have changed.
            </p>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm text-red-800">{error}</p>
            </div>
            <button
              onClick={() => setError('')}
              className="text-red-600 hover:text-red-700 text-xl leading-none"
            >
              ×
            </button>
          </div>
        )}

        {/* Search Section */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <div className="mb-4">
            <label className="block text-sm text-gray-700 mb-2">Search By</label>
            <div className="flex gap-3 mb-4">
              <button
                onClick={() => setSearchType('ipc')}
                className={`px-4 py-2 rounded-lg border transition-colors ${
                  searchType === 'ipc'
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                IPC Section
              </button>
              <button
                onClick={() => setSearchType('bns')}
                className={`px-4 py-2 rounded-lg border transition-colors ${
                  searchType === 'bns'
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                BNS Section
              </button>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                placeholder={`Enter ${searchType.toUpperCase()} section number (e.g., ${searchType === 'ipc' ? '420' : '318'})`}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={handleSearch}
              disabled={isLoading}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Converting...
                </>
              ) : (
                'Convert'
              )}
            </button>
          </div>
        </div>

        {/* Popular Sections */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <h3 className="text-gray-900 mb-4">Popular Sections</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {popularSections.map((section, index) => (
              <button
                key={index}
                onClick={() => {
                  setSearchQuery(section.ipc);
                  setSearchType('ipc');
                  setTimeout(() => handleSearch(), 50);
                }}
                disabled={isLoading}
                className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition-all text-left"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-blue-600">IPC {section.ipc}</span>
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-green-600">BNS {section.bns}</span>
                </div>
                <p className="text-sm text-gray-900">{section.name}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        {result && (
          <div className="space-y-6">
            {/* Comparison Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* IPC Card */}
              <div className="bg-white rounded-xl border-2 border-blue-300 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Scale className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Indian Penal Code</p>
                    <h3 className="text-gray-900">{result.ipc.section}</h3>
                  </div>
                </div>
                <h4 className="text-gray-900 mb-3">{result.ipc.title}</h4>
                <p className="text-sm text-gray-700 leading-relaxed mb-4">
                  {result.ipc.description}
                </p>
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Punishment:</p>
                  <p className="text-sm text-gray-900">{result.ipc.punishment}</p>
                </div>
              </div>

              {/* BNS Card */}
              <div className="bg-white rounded-xl border-2 border-green-300 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Scale className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Bharatiya Nyaya Sanhita</p>
                    <h3 className="text-gray-900">{result.bns.section}</h3>
                  </div>
                </div>
                <h4 className="text-gray-900 mb-3">{result.bns.title}</h4>
                <p className="text-sm text-gray-700 leading-relaxed mb-4">
                  {result.bns.description}
                </p>
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Punishment:</p>
                  <p className="text-sm text-gray-900">{result.bns.punishment}</p>
                </div>
              </div>
            </div>

            {/* Key Changes */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-gray-900 mb-4">Key Changes & Differences</h3>
              <ul className="space-y-3">
                {result.changes.map((change, index) => (
                  <li key={index} className="flex gap-3">
                    <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs text-yellow-700">{index + 1}</span>
                    </div>
                    <p className="text-gray-700">{change}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Case References */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-gray-900 mb-4">Relevant Case References</h3>
              <div className="space-y-3">
                {result.caseReferences.map((case_, index) => (
                  <div
                    key={index}
                    className="p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-start gap-3">
                      <BookOpen className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div>
                        <h4 className="text-gray-900 mb-1">{case_.title}</h4>
                        <p className="text-sm text-gray-600">{case_.citation}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Download Comparison
              </button>
              <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                Add to Case Notes
              </button>
            </div>
          </div>
        )}

        {result === null && searchQuery && (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-gray-900 mb-2">No results found</h3>
            <p className="text-gray-600">
              Try searching for a different section number or check the format
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
