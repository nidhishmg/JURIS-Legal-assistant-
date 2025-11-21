import { useState } from 'react';
import { Plus, Search, Filter, FolderOpen, Calendar, FileText, MoreVertical } from 'lucide-react';

interface Case {
  id: string;
  title: string;
  caseNumber: string;
  court: string;
  type: string;
  status: 'Active' | 'Pending' | 'Closed';
  nextHearing: string;
  client: string;
  filingDate: string;
  documents: number;
  drafts: number;
}

export function Cases() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const mockCases: Case[] = [
    {
      id: '1',
      title: 'Sharma vs. State of Delhi',
      caseNumber: 'CRL.M.C. 4567/2024',
      court: 'Delhi High Court',
      type: 'Criminal',
      status: 'Active',
      nextHearing: '2025-11-25',
      client: 'Ramesh Sharma',
      filingDate: '2024-08-15',
      documents: 12,
      drafts: 5
    },
    {
      id: '2',
      title: 'ABC Ltd. vs. XYZ Corporation',
      caseNumber: 'CS(COMM) 234/2024',
      court: 'Delhi High Court',
      type: 'Commercial',
      status: 'Active',
      nextHearing: '2025-11-28',
      client: 'ABC Limited',
      filingDate: '2024-07-10',
      documents: 28,
      drafts: 8
    },
    {
      id: '3',
      title: 'Kumar vs. Kumar',
      caseNumber: 'HMA 156/2024',
      court: 'District Court',
      type: 'Family',
      status: 'Pending',
      nextHearing: '2025-12-02',
      client: 'Priya Kumar',
      filingDate: '2024-06-20',
      documents: 15,
      drafts: 3
    },
    {
      id: '4',
      title: 'Consumer Complaint - Mobile Phone',
      caseNumber: 'CC/123/2024',
      court: 'District Consumer Forum',
      type: 'Consumer',
      status: 'Active',
      nextHearing: '2025-11-30',
      client: 'Rajesh Singh',
      filingDate: '2024-09-01',
      documents: 8,
      drafts: 2
    },
    {
      id: '5',
      title: 'Property Dispute - Rohini',
      caseNumber: 'CS 567/2023',
      court: 'District Court',
      type: 'Civil',
      status: 'Closed',
      nextHearing: '2024-10-15',
      client: 'Sunita Devi',
      filingDate: '2023-05-12',
      documents: 35,
      drafts: 12
    }
  ];

  const [cases, setCases] = useState<Case[]>(mockCases);

  const filteredCases = cases.filter(case_ => {
    const matchesSearch = case_.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         case_.caseNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         case_.client.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || case_.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: Case['status']) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-700';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'Closed':
        return 'bg-gray-100 text-gray-700';
    }
  };

  const stats = {
    total: cases.length,
    active: cases.filter(c => c.status === 'Active').length,
    pending: cases.filter(c => c.status === 'Pending').length,
    closed: cases.filter(c => c.status === 'Closed').length,
  };

  return (
    <div className="h-full overflow-y-auto bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-gray-900 mb-2">Cases</h1>
            <p className="text-gray-600">Manage all your cases in one place</p>
          </div>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
            <Plus className="w-5 h-5" />
            New Case
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-sm text-gray-600 mb-1">Total Cases</p>
            <p className="text-2xl text-gray-900">{stats.total}</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-sm text-gray-600 mb-1">Active Cases</p>
            <p className="text-2xl text-green-600">{stats.active}</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-sm text-gray-600 mb-1">Pending Cases</p>
            <p className="text-2xl text-yellow-600">{stats.pending}</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-sm text-gray-600 mb-1">Closed Cases</p>
            <p className="text-2xl text-gray-600">{stats.closed}</p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by case title, number, or client name..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="closed">Closed</option>
            </select>
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center gap-2">
              <Filter className="w-5 h-5" />
              More Filters
            </button>
          </div>
        </div>

        {/* Cases Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredCases.map((case_) => (
            <div
              key={case_.id}
              className="bg-white border border-gray-200 rounded-xl p-6 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-gray-900">{case_.title}</h3>
                    <span className={`px-2 py-0.5 rounded-full text-xs ${getStatusColor(case_.status)}`}>
                      {case_.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{case_.caseNumber}</p>
                </div>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <MoreVertical className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              {/* Details */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <FolderOpen className="w-4 h-4" />
                  <span>{case_.court}</span>
                  <span>•</span>
                  <span>{case_.type}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>Next Hearing: {new Date(case_.nextHearing).toLocaleDateString('en-IN')}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <FileText className="w-4 h-4" />
                  <span>{case_.documents} documents</span>
                  <span>•</span>
                  <span>{case_.drafts} drafts</span>
                </div>
              </div>

              {/* Client Info */}
              <div className="p-3 bg-gray-50 rounded-lg mb-4">
                <p className="text-xs text-gray-500 mb-1">Client</p>
                <p className="text-sm text-gray-900">{case_.client}</p>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                  Open Case
                </button>
                <button className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm">
                  Documents
                </button>
                <button className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm">
                  Timeline
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredCases.length === 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <FolderOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-gray-900 mb-2">No cases found</h3>
            <p className="text-gray-600 mb-4">
              {searchQuery ? 'Try adjusting your search or filters' : 'Get started by creating your first case'}
            </p>
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 inline-flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Create New Case
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
