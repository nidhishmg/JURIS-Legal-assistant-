import { MessageSquarePlus, FolderOpen, Search, FileText, AlertCircle, Calendar, Clock } from 'lucide-react';
import { Page } from '../App';

interface DashboardProps {
  onNavigate: (page: Page) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const recentCases = [
    {
      id: 1,
      title: 'Sharma vs. State of Delhi',
      caseNumber: 'CRL.M.C. 4567/2024',
      court: 'Delhi High Court',
      nextHearing: '2025-11-25',
      status: 'Active',
      type: 'Criminal'
    },
    {
      id: 2,
      title: 'ABC Ltd. vs. XYZ Corporation',
      caseNumber: 'CS(COMM) 234/2024',
      court: 'Delhi High Court',
      nextHearing: '2025-11-28',
      status: 'Active',
      type: 'Commercial'
    },
    {
      id: 3,
      title: 'Kumar vs. Kumar',
      caseNumber: 'HMA 156/2024',
      court: 'District Court',
      nextHearing: '2025-12-02',
      status: 'Pending',
      type: 'Family'
    }
  ];

  const alerts = [
    {
      id: 1,
      type: 'hearing',
      message: 'Hearing tomorrow in Sharma vs. State of Delhi',
      time: 'Tomorrow, 10:30 AM',
      urgent: true
    },
    {
      id: 2,
      type: 'deadline',
      message: 'Reply filing deadline in 3 days',
      time: 'Due: Nov 23, 2025',
      urgent: false
    },
    {
      id: 3,
      type: 'document',
      message: 'New judgment uploaded by court',
      time: '2 hours ago',
      urgent: false
    }
  ];

  const recentJudgments = [
    {
      id: 1,
      title: 'State vs. Ramesh Kumar',
      citation: '2024 SCC OnLine Del 2345',
      court: 'Delhi HC',
      date: '2024-11-15'
    },
    {
      id: 2,
      title: 'Reliance Industries vs. SEBI',
      citation: '2024 SCC 567',
      court: 'Supreme Court',
      date: '2024-11-10'
    }
  ];

  const recentDrafts = [
    {
      id: 1,
      title: 'Criminal Bail Application',
      type: 'Bail Application',
      lastModified: '2 hours ago',
      status: 'Draft'
    },
    {
      id: 2,
      title: 'Written Statement - ABC Ltd.',
      type: 'Written Statement',
      lastModified: 'Yesterday',
      status: 'Final'
    }
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-gray-900 mb-2">Welcome back, Adv. Rajesh Kumar</h1>
        <p className="text-gray-600">Your AI-powered legal workspace</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <button
          onClick={() => onNavigate('new-chat')}
          className="p-6 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl hover:shadow-lg transition-shadow"
        >
          <MessageSquarePlus className="w-8 h-8 mb-3" />
          <h3 className="mb-1">New Chat</h3>
          <p className="text-sm text-blue-100">Start AI conversation</p>
        </button>

        <button
          onClick={() => onNavigate('cases')}
          className="p-6 bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-shadow"
        >
          <FolderOpen className="w-8 h-8 mb-3" />
          <h3 className="mb-1">View All Cases</h3>
          <p className="text-sm text-purple-100">Manage your cases</p>
        </button>

        <button
          onClick={() => onNavigate('case-law-search')}
          className="p-6 bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl hover:shadow-lg transition-shadow"
        >
          <Search className="w-8 h-8 mb-3" />
          <h3 className="mb-1">Case Law Search</h3>
          <p className="text-sm text-green-100">Find judgments</p>
        </button>

        <button
          onClick={() => onNavigate('drafts')}
          className="p-6 bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-xl hover:shadow-lg transition-shadow"
        >
          <FileText className="w-8 h-8 mb-3" />
          <h3 className="mb-1">Draft Library</h3>
          <p className="text-sm text-orange-100">View your drafts</p>
        </button>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Recent Cases & Alerts */}
        <div className="lg:col-span-2 space-y-6">
          {/* Recent Cases */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-gray-900">Recent Cases</h2>
              <button 
                onClick={() => onNavigate('cases')}
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                View All
              </button>
            </div>
            <div className="space-y-3">
              {recentCases.map((case_) => (
                <div
                  key={case_.id}
                  className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition-all cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-gray-900 mb-1">{case_.title}</h3>
                      <p className="text-sm text-gray-600">{case_.caseNumber}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      case_.status === 'Active' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {case_.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>{case_.court}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Next: {new Date(case_.nextHearing).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recently Opened Judgments */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-gray-900 mb-4">Recently Opened Judgments</h2>
            <div className="space-y-3">
              {recentJudgments.map((judgment) => (
                <div
                  key={judgment.id}
                  className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition-all cursor-pointer"
                >
                  <h3 className="text-gray-900 mb-1">{judgment.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{judgment.citation}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span>{judgment.court}</span>
                    <span>•</span>
                    <span>{new Date(judgment.date).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Alerts & Recent Drafts */}
        <div className="space-y-6">
          {/* Alerts & Deadlines */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-gray-900 mb-4">Alerts & Deadlines</h2>
            <div className="space-y-3">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`p-3 rounded-lg ${
                    alert.urgent 
                      ? 'bg-red-50 border border-red-200' 
                      : 'bg-gray-50 border border-gray-200'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <AlertCircle className={`w-5 h-5 mt-0.5 ${
                      alert.urgent ? 'text-red-600' : 'text-gray-600'
                    }`} />
                    <div className="flex-1">
                      <p className={`text-sm mb-1 ${
                        alert.urgent ? 'text-red-900' : 'text-gray-900'
                      }`}>
                        {alert.message}
                      </p>
                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {alert.time}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recently Generated Drafts */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-gray-900">Recent Drafts</h2>
              <button 
                onClick={() => onNavigate('drafts')}
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                View All
              </button>
            </div>
            <div className="space-y-3">
              {recentDrafts.map((draft) => (
                <div
                  key={draft.id}
                  className="p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition-all cursor-pointer"
                >
                  <h3 className="text-gray-900 mb-1">{draft.title}</h3>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{draft.type}</span>
                    <span>{draft.lastModified}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
