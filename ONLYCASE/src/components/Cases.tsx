import { useState, useEffect } from 'react';
import { Plus, Search, Filter, FolderOpen, Calendar, FileText, MoreVertical } from 'lucide-react';
import { Page } from '../App';
import { toast } from 'sonner';
import { NewCaseWizard } from './NewCaseWizard';
import { CaseCreatedSuccess } from './CaseCreatedSuccess';
import { getAllCases } from '../services/caseService';
import { CaseData } from '../data/casesData';

interface CasesProps {
  onNavigate: (page: Page, caseId?: string) => void;
}

export function Cases({ onNavigate }: CasesProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [showAdvancedCreate, setShowAdvancedCreate] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [createdCaseId, setCreatedCaseId] = useState<string>('');
  const [createdCaseTitle, setCreatedCaseTitle] = useState<string>('');
  const [cases, setCases] = useState<CaseData[]>([]);

  // Load cases from backend on mount and when modal closes
  useEffect(() => {
    loadCases();
  }, [showSuccessModal]);

  const loadCases = () => {
    const allCases = getAllCases();
    setCases(allCases);
  };

  const filteredCases = cases.filter(case_ => {
    const matchesSearch = case_.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         case_.caseNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         case_.client.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || case_.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: CaseData['status']) => {
    switch (status) {
      case 'Investigation':
      case 'Trial':
      case 'Appeal':
        return 'bg-green-100 text-green-700';
      case 'Closed':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-yellow-100 text-yellow-700';
    }
  };

  const stats = {
    total: cases.length,
    active: cases.filter(c => c.status === 'Investigation' || c.status === 'Trial' || c.status === 'Appeal').length,
    pending: cases.filter(c => c.status === 'Investigation').length,
    closed: cases.filter(c => c.status === 'Closed').length,
  };

  const handleOpenCase = (case_: CaseData) => {
    toast.success(`Opening case: ${case_.title}`);
    setTimeout(() => {
      onNavigate('case-workspace', case_.id);
    }, 200);
  };

  const handleAdvancedCreate = () => {
    setShowAdvancedCreate(true);
  };

  const handleCaseCreated = (caseId: string, title?: string) => {
    setCreatedCaseId(caseId);
    setCreatedCaseTitle(title || 'New Case');
    setShowAdvancedCreate(false);
    setShowSuccessModal(true);
    // Reload cases to show the new one
    loadCases();
  };

  const handleOpenWorkspace = () => {
    setShowSuccessModal(false);
    onNavigate('case-workspace', createdCaseId);
  };

  const handleReturnToCases = () => {
    setShowSuccessModal(false);
  };

  const handleGenerateDrafts = () => {
    setShowSuccessModal(false);
    toast.success('Opening draft generator...');
    // Navigate to drafts or case workspace with draft generator open
    onNavigate('case-workspace', createdCaseId);
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
          <button
            onClick={handleAdvancedCreate}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Create New Case
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
                {case_.nextHearing && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>Next Hearing: {new Date(case_.nextHearing.date).toLocaleDateString('en-IN')}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <FileText className="w-4 h-4" />
                  <span>{case_.metrics.totalDocuments} documents</span>
                  <span>•</span>
                  <span>{case_.metrics.totalDrafts} drafts</span>
                </div>
              </div>

              {/* Client Info */}
              <div className="p-3 bg-gray-50 rounded-lg mb-4">
                <p className="text-xs text-gray-500 mb-1">Client</p>
                <p className="text-sm text-gray-900">{case_.client.name}</p>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button 
                  onClick={() => handleOpenCase(case_)}
                  className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                >
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

      {/* Modals */}
      {showAdvancedCreate && (
        <NewCaseWizard
          onClose={() => setShowAdvancedCreate(false)}
          onSuccess={(caseId) => handleCaseCreated(caseId)}
        />
      )}

      {showSuccessModal && (
        <CaseCreatedSuccess
          caseId={createdCaseId}
          caseTitle={createdCaseTitle}
          onOpenWorkspace={handleOpenWorkspace}
          onReturnToCases={handleReturnToCases}
          onGenerateDrafts={handleGenerateDrafts}
        />
      )}
    </div>
  );
}