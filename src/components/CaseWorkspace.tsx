import { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  FileText, 
  FolderOpen, 
  Calendar, 
  Clock, 
  Users, 
  Target, 
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  Upload,
  PlusCircle,
  Search,
  Filter,
  Download,
  Edit,
  Trash2,
  MoreVertical,
  Eye,
  Link as LinkIcon,
  Tag,
  Activity as ActivityIcon,
  Sparkles,
  X
} from 'lucide-react';
import { getCaseById, CaseData } from '../data/casesData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Separator } from './ui/separator';
import { Page } from '../App';
import { getAllTemplates } from '../data/draftTemplates';
import { generateDraftWithAI } from '../services/draftService';
import { addDraftToCase, getDraftById } from '../services/caseService';
import { toast } from 'sonner';

interface CaseWorkspaceProps {
  caseId: string;
  onNavigate: (page: Page, caseId?: string) => void;
  onClose: () => void;
}

export function CaseWorkspace({ caseId, onNavigate, onClose }: CaseWorkspaceProps) {
  const [caseData, setCaseData] = useState<CaseData | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedDraft, setSelectedDraft] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');

  useEffect(() => {
    const data = getCaseById(caseId);
    setCaseData(data || null);
  }, [caseId]);

  const refreshCaseData = () => {
    const data = getCaseById(caseId);
    setCaseData(data || null);
  };

  const handleGenerateDraft = async () => {
    if (!selectedTemplate || !caseData) return;

    setIsGenerating(true);
    toast.info('Generating draft with AI...');

    try {
      const result = await generateDraftWithAI({
        templateId: selectedTemplate,
        caseData: {
          title: caseData.title,
          caseNumber: caseData.caseNumber,
          court: caseData.court,
          client: caseData.client,
          opponent: caseData.opponent,
          summary: caseData.summary,
          facts: caseData.facts,
          issues: caseData.issues
        }
      });

      if (result.success && result.draftContent) {
        const template = getAllTemplates().find(t => t.id === selectedTemplate);
        const added = addDraftToCase(caseId, {
          title: template?.title || selectedTemplate,
          type: selectedTemplate,
          content: result.draftContent
        });

        if (added) {
          toast.success('Draft generated successfully!');
          refreshCaseData();
          setShowGenerateModal(false);
          setSelectedTemplate('');
        } else {
          toast.error('Failed to save draft');
        }
      } else {
        toast.error(result.error || 'Failed to generate draft');
      }
    } catch (error) {
      console.error('Error generating draft:', error);
      toast.error('An error occurred while generating the draft');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleViewDraft = (draft: any) => {
    const draftData = getDraftById(caseId, draft.id);
    if (draftData) {
      setSelectedDraft(draftData);
      setShowViewModal(true);
    } else {
      toast.error('Draft content not found');
    }
  };

  if (!caseData) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-gray-900 mb-2">Case Not Found</h2>
          <p className="text-gray-600 mb-6">The case you're looking for doesn't exist.</p>
          <Button onClick={onClose}>Back to Cases</Button>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Investigation': return 'bg-blue-100 text-blue-700';
      case 'Trial': return 'bg-purple-100 text-purple-700';
      case 'Appeal': return 'bg-orange-100 text-orange-700';
      case 'Closed': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-700';
      case 'Medium': return 'bg-yellow-100 text-yellow-700';
      case 'Low': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Case Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-4">
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-gray-900">{caseData.title}</h1>
                <Badge className={getStatusColor(caseData.status)}>
                  {caseData.status}
                </Badge>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <FileText className="w-4 h-4" />
                  {caseData.caseNumber}
                </span>
                <span>•</span>
                <span>{caseData.court}</span>
                <span>•</span>
                <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded">{caseData.type}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Upload className="w-4 h-4 mr-2" />
              Upload Document
            </Button>
            <Button size="sm">
              <PlusCircle className="w-4 h-4 mr-2" />
              New Draft
            </Button>
          </div>
        </div>

        {/* Quick Info Bar */}
        <div className="flex items-center gap-6 text-sm">
          {caseData.nextHearing && (
            <div className="flex items-center gap-2 px-3 py-2 bg-orange-50 text-orange-700 rounded-lg">
              <Calendar className="w-4 h-4" />
              <span>Next Hearing: {new Date(caseData.nextHearing.date).toLocaleDateString('en-IN')} at {caseData.nextHearing.time}</span>
            </div>
          )}
          <div className="flex items-center gap-2 text-gray-600">
            <Users className="w-4 h-4" />
            <span>{caseData.assignedTeam.join(', ')}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Clock className="w-4 h-4" />
            <span>Last activity: {caseData.lastActivity}</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex-1 overflow-hidden">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
          <div className="bg-white border-b border-gray-200 px-6">
            <TabsList className="bg-transparent border-0">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="drafts">Drafts ({caseData.metrics.totalDrafts})</TabsTrigger>
              <TabsTrigger value="documents">Documents ({caseData.metrics.totalDocuments})</TabsTrigger>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
              <TabsTrigger value="facts">Facts</TabsTrigger>
              <TabsTrigger value="issues">Issues</TabsTrigger>
              <TabsTrigger value="tasks">Tasks</TabsTrigger>
              <TabsTrigger value="hearings">Hearings</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
            </TabsList>
          </div>

          <div className="flex-1 overflow-y-auto">
            {/* Overview Tab */}
            <TabsContent value="overview" className="m-0 p-6">
              <div className="max-w-6xl mx-auto space-y-6">
                {/* Case Summary */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h2 className="text-gray-900 mb-4">Case Summary</h2>
                  <p className="text-gray-700 mb-4">{caseData.summary}</p>
                  {caseData.fir && (
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-50 text-red-700 rounded-lg text-sm">
                      <AlertCircle className="w-4 h-4" />
                      {caseData.fir}
                    </div>
                  )}
                </div>

                {/* Progress Tracker */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h2 className="text-gray-900 mb-6">Case Progress</h2>
                  <div className="space-y-4">
                    {caseData.progress.map((step, index) => (
                      <div key={index} className="relative">
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            step.completed 
                              ? 'bg-green-100' 
                              : step.completionStatus > 0 
                              ? 'bg-blue-100' 
                              : 'bg-gray-100'
                          }`}>
                            {step.completed ? (
                              <CheckCircle2 className="w-5 h-5 text-green-600" />
                            ) : (
                              <div className={`w-3 h-3 rounded-full ${
                                step.completionStatus > 0 ? 'bg-blue-600' : 'bg-gray-400'
                              }`} />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="text-gray-900">{step.step}</h3>
                              <span className="text-sm text-gray-600">{step.completionStatus}%</span>
                            </div>
                            <Progress value={step.completionStatus} className="h-2" />
                            {step.requiredDocs.length > 0 && (
                              <p className="text-sm text-gray-500 mt-2">
                                Required: {step.requiredDocs.join(', ')}
                              </p>
                            )}
                          </div>
                        </div>
                        {index < caseData.progress.length - 1 && (
                          <div className="absolute left-5 top-10 w-0.5 h-8 bg-gray-200" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Two Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Client & Opponent Info */}
                  <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <h2 className="text-gray-900 mb-4">Parties</h2>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-500 mb-2">Client</p>
                        <p className="text-gray-900 mb-1">{caseData.client.name}</p>
                        <p className="text-sm text-gray-600">{caseData.client.contact}</p>
                        <p className="text-sm text-gray-600">{caseData.client.email}</p>
                      </div>
                      <Separator />
                      <div>
                        <p className="text-sm text-gray-500 mb-2">Opponent</p>
                        <p className="text-gray-900 mb-1">{caseData.opponent.name}</p>
                        <p className="text-sm text-gray-600">{caseData.opponent.contact}</p>
                      </div>
                    </div>
                  </div>

                  {/* Key Metrics */}
                  <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <h2 className="text-gray-900 mb-4">Key Metrics</h2>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <FileText className="w-5 h-5 text-blue-600 mb-2" />
                        <p className="text-2xl text-blue-900">{caseData.metrics.totalDrafts}</p>
                        <p className="text-sm text-blue-700">Drafts</p>
                      </div>
                      <div className="p-3 bg-purple-50 rounded-lg">
                        <FolderOpen className="w-5 h-5 text-purple-600 mb-2" />
                        <p className="text-2xl text-purple-900">{caseData.metrics.totalDocuments}</p>
                        <p className="text-sm text-purple-700">Documents</p>
                      </div>
                      <div className="p-3 bg-green-50 rounded-lg">
                        <Calendar className="w-5 h-5 text-green-600 mb-2" />
                        <p className="text-2xl text-green-900">{caseData.metrics.totalHearings}</p>
                        <p className="text-sm text-green-700">Hearings</p>
                      </div>
                      <div className="p-3 bg-orange-50 rounded-lg">
                        <AlertCircle className="w-5 h-5 text-orange-600 mb-2" />
                        <p className="text-2xl text-orange-900">{caseData.metrics.overdueTasks}</p>
                        <p className="text-sm text-orange-700">Overdue Tasks</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-gray-900">Recent Activity</h2>
                    <button 
                      onClick={() => setActiveTab('activity')}
                      className="text-sm text-blue-600 hover:text-blue-700"
                    >
                      View All
                    </button>
                  </div>
                  <div className="space-y-3">
                    {caseData.activity.slice(0, 5).map((item) => (
                      <div key={item.id} className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                          <ActivityIcon className="w-4 h-4 text-blue-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-900">
                            <span>{item.user}</span>
                            <span className="text-gray-600"> {item.action} </span>
                            <span className="text-blue-600">{item.target}</span>
                          </p>
                          {item.details && (
                            <p className="text-sm text-gray-500 mt-1">{item.details}</p>
                          )}
                          <p className="text-xs text-gray-500 mt-1">{item.timestamp}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Drafts Tab */}
            <TabsContent value="drafts" className="m-0 p-6">
              <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-gray-900">Case Drafts</h2>
                  <Button onClick={() => setShowGenerateModal(true)}>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generate Draft with AI
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {caseData.drafts.map((draft) => (
                    <div
                      key={draft.id}
                      className="bg-white border border-gray-200 rounded-xl p-4 hover:border-blue-300 hover:shadow-md transition-all"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <FileText className="w-8 h-8 text-blue-600" />
                        <Badge className={
                          draft.status === 'Final' ? 'bg-green-100 text-green-700' :
                          draft.status === 'Review' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-gray-100 text-gray-700'
                        }>
                          {draft.status}
                        </Badge>
                      </div>
                      <h3 className="text-gray-900 mb-2">{draft.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">{draft.type}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>v{draft.version}</span>
                        <span>{new Date(draft.lastEdited).toLocaleDateString('en-IN')}</span>
                      </div>
                      <Separator className="my-3" />
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="flex-1"
                          onClick={() => handleViewDraft(draft)}
                          disabled={!draft.content}
                        >
                          <Eye className="w-3 h-3 mr-1" />
                          View
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          <Download className="w-3 h-3 mr-1" />
                          Download
                        </Button>
                      </div>
                    </div>
                  ))}
                  {caseData.drafts.length === 0 && (
                    <div className="col-span-full bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 p-12 text-center">
                      <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-gray-900 mb-2">No drafts yet</h3>
                      <p className="text-gray-600 mb-4">Generate legal drafts using AI</p>
                      <Button onClick={() => setShowGenerateModal(true)}>
                        <Sparkles className="w-4 h-4 mr-2" />
                        Generate First Draft
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>

            {/* Documents Tab */}
            <TabsContent value="documents" className="m-0 p-6">
              <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-gray-900">Case Documents</h2>
                  <div className="flex gap-2">
                    <Button variant="outline">
                      <Filter className="w-4 h-4 mr-2" />
                      Filter
                    </Button>
                    <Button>
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Document
                    </Button>
                  </div>
                </div>
                <div className="bg-white rounded-xl border border-gray-200">
                  <div className="divide-y divide-gray-200">
                    {caseData.documents.map((doc) => (
                      <div key={doc.id} className="p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <FileText className="w-5 h-5 text-blue-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h3 className="text-gray-900 mb-1">{doc.title}</h3>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                  <Badge variant="outline">{doc.category}</Badge>
                                  {doc.isAnnexure && (
                                    <Badge className="bg-purple-100 text-purple-700">
                                      {doc.annexureLabel}
                                    </Badge>
                                  )}
                                  <span>•</span>
                                  <span>{doc.size}</span>
                                </div>
                              </div>
                              <Button variant="ghost" size="sm">
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </div>
                            <p className="text-sm text-gray-500">
                              Uploaded by {doc.uploadedBy} on {new Date(doc.uploadedOn).toLocaleDateString('en-IN')}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4 mr-1" />
                              View
                            </Button>
                            <Button size="sm" variant="outline">
                              <Download className="w-4 h-4 mr-1" />
                              Download
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Timeline Tab */}
            <TabsContent value="timeline" className="m-0 p-6">
              <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-gray-900">Case Timeline</h2>
                  <Button>
                    <PlusCircle className="w-4 h-4 mr-2" />
                    Add Event
                  </Button>
                </div>
                <div className="space-y-4">
                  {caseData.timeline.map((event, index) => (
                    <div key={event.id} className="relative">
                      <div className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            event.pinned ? 'bg-blue-100' : 'bg-gray-100'
                          }`}>
                            <Calendar className={`w-5 h-5 ${
                              event.pinned ? 'text-blue-600' : 'text-gray-600'
                            }`} />
                          </div>
                          {index < caseData.timeline.length - 1 && (
                            <div className="w-0.5 h-full bg-gray-200 mt-2" />
                          )}
                        </div>
                        <div className="flex-1 pb-8">
                          <div className="bg-white border border-gray-200 rounded-xl p-4">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <Badge className="mb-2">{event.type}</Badge>
                                <h3 className="text-gray-900">{event.title}</h3>
                              </div>
                              {event.pinned && (
                                <Badge className="bg-blue-100 text-blue-700">Pinned</Badge>
                              )}
                            </div>
                            <p className="text-gray-700 mb-3">{event.description}</p>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <span>{new Date(event.date).toLocaleDateString('en-IN')}</span>
                              <span>•</span>
                              <span>{event.time}</span>
                              <span>•</span>
                              <span>by {event.createdBy}</span>
                              {event.attachments > 0 && (
                                <>
                                  <span>•</span>
                                  <span className="flex items-center gap-1">
                                    <LinkIcon className="w-3 h-3" />
                                    {event.attachments} attachment{event.attachments > 1 ? 's' : ''}
                                  </span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Facts Tab */}
            <TabsContent value="facts" className="m-0 p-6">
              <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-gray-900">Case Facts</h2>
                  <Button>
                    <PlusCircle className="w-4 h-4 mr-2" />
                    Add Fact
                  </Button>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  {caseData.facts.map((fact) => (
                    <div
                      key={fact.id}
                      className="bg-white border border-gray-200 rounded-xl p-6 hover:border-blue-300 transition-all"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <Badge>{fact.category}</Badge>
                        <div className="flex items-center gap-2">
                          {fact.verified && (
                            <Badge className="bg-green-100 text-green-700">
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                              Verified
                            </Badge>
                          )}
                          <div className="text-sm text-gray-600">
                            Confidence: {fact.confidence}%
                          </div>
                        </div>
                      </div>
                      <h3 className="text-gray-900 mb-2">{fact.title}</h3>
                      <p className="text-gray-700 mb-4">{fact.description}</p>
                      {fact.supportingDocs.length > 0 && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <LinkIcon className="w-4 h-4" />
                          <span>Linked to {fact.supportingDocs.length} document{fact.supportingDocs.length > 1 ? 's' : ''}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Issues Tab */}
            <TabsContent value="issues" className="m-0 p-6">
              <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-gray-900">Legal Issues</h2>
                  <Button>
                    <PlusCircle className="w-4 h-4 mr-2" />
                    Add Issue
                  </Button>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  {caseData.issues.map((issue) => (
                    <div
                      key={issue.id}
                      className="bg-white border border-gray-200 rounded-xl p-6 hover:border-blue-300 transition-all"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Badge className={getPriorityColor(issue.priority)}>
                            {issue.priority} Priority
                          </Badge>
                          <Badge className={
                            issue.status === 'Open' 
                              ? 'bg-blue-100 text-blue-700' 
                              : 'bg-gray-100 text-gray-700'
                          }>
                            {issue.status}
                          </Badge>
                        </div>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </div>
                      <h3 className="text-gray-900 mb-2">{issue.title}</h3>
                      <p className="text-gray-700 mb-4">{issue.description}</p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {issue.lawSections.map((section, idx) => (
                          <Badge key={idx} variant="outline" className="bg-purple-50 text-purple-700">
                            {section}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Assigned to: {issue.assignedTo}</span>
                        <span className="flex items-center gap-1">
                          <LinkIcon className="w-3 h-3" />
                          {issue.linkedFacts.length} linked fact{issue.linkedFacts.length > 1 ? 's' : ''}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Tasks Tab */}
            <TabsContent value="tasks" className="m-0 p-6">
              <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-gray-900">Case Tasks</h2>
                  <Button>
                    <PlusCircle className="w-4 h-4 mr-2" />
                    Create Task
                  </Button>
                </div>
                <div className="space-y-3">
                  {caseData.tasks.map((task) => (
                    <div
                      key={task.id}
                      className="bg-white border border-gray-200 rounded-xl p-4 hover:border-blue-300 transition-all"
                    >
                      <div className="flex items-start gap-4">
                        <input
                          type="checkbox"
                          checked={task.status === 'Completed'}
                          className="mt-1 w-5 h-5 text-blue-600 rounded"
                          readOnly
                        />
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className={`text-gray-900 ${task.status === 'Completed' ? 'line-through text-gray-500' : ''}`}>
                              {task.title}
                            </h3>
                            <div className="flex items-center gap-2">
                              <Badge className={getPriorityColor(task.priority)}>
                                {task.priority}
                              </Badge>
                              <Badge className={
                                task.status === 'Completed' ? 'bg-green-100 text-green-700' :
                                task.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                                'bg-gray-100 text-gray-700'
                              }>
                                {task.status}
                              </Badge>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">{task.description}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              {task.assignedTo}
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              Due: {new Date(task.dueDate).toLocaleDateString('en-IN')}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Hearings Tab */}
            <TabsContent value="hearings" className="m-0 p-6">
              <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-gray-900">Court Hearings</h2>
                  <Button>
                    <PlusCircle className="w-4 h-4 mr-2" />
                    Add Hearing
                  </Button>
                </div>
                <div className="space-y-4">
                  {caseData.hearings.map((hearing) => (
                    <div
                      key={hearing.id}
                      className="bg-white border border-gray-200 rounded-xl p-6"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <Calendar className="w-5 h-5 text-blue-600" />
                            <h3 className="text-gray-900">
                              {new Date(hearing.date).toLocaleDateString('en-IN', { 
                                weekday: 'long', 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                              })}
                            </h3>
                          </div>
                          <p className="text-gray-600">{hearing.time} • {hearing.court}</p>
                        </div>
                        {hearing.outcome && (
                          <Badge className="bg-green-100 text-green-700">Completed</Badge>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Judge</p>
                          <p className="text-gray-900">{hearing.judge}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Cause List No.</p>
                          <p className="text-gray-900">{hearing.causeListNo}</p>
                        </div>
                      </div>
                      {hearing.outcome && (
                        <div className="p-3 bg-gray-50 rounded-lg mb-3">
                          <p className="text-sm text-gray-500 mb-1">Outcome</p>
                          <p className="text-gray-900">{hearing.outcome}</p>
                        </div>
                      )}
                      {hearing.notes && (
                        <div className="p-3 bg-blue-50 rounded-lg mb-3">
                          <p className="text-sm text-blue-700 mb-1">Notes</p>
                          <p className="text-blue-900">{hearing.notes}</p>
                        </div>
                      )}
                      {hearing.nextDate && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar className="w-4 h-4" />
                          <span>Next hearing: {new Date(hearing.nextDate).toLocaleDateString('en-IN')}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Activity Tab */}
            <TabsContent value="activity" className="m-0 p-6">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-gray-900 mb-6">Activity Log</h2>
                <div className="space-y-3">
                  {caseData.activity.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white border border-gray-200 rounded-xl p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                          <ActivityIcon className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-gray-900 mb-1">
                            <span>{item.user}</span>
                            <span className="text-gray-600"> {item.action} </span>
                            <span className="text-blue-600">{item.target}</span>
                          </p>
                          {item.details && (
                            <p className="text-sm text-gray-600 mb-2">{item.details}</p>
                          )}
                          <p className="text-sm text-gray-500">{item.timestamp}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>

      {/* Generate Draft Modal */}
      {showGenerateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
              <h2 className="text-gray-900 text-xl font-semibold">Generate Legal Draft with AI</h2>
              <button
                onClick={() => {
                  setShowGenerateModal(false);
                  setSelectedTemplate('');
                }}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="p-6">
              <p className="text-gray-600 mb-6">
                Select a document template to generate using AI based on your case information.
              </p>
              <div className="space-y-3">
                {getAllTemplates().map((template) => (
                  <div
                    key={template.id}
                    onClick={() => setSelectedTemplate(template.id)}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      selectedTemplate === template.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <FileText className={`w-5 h-5 mt-0.5 ${
                        selectedTemplate === template.id ? 'text-blue-600' : 'text-gray-400'
                      }`} />
                      <div className="flex-1">
                        <h3 className="text-gray-900 font-medium mb-1">{template.title}</h3>
                        <p className="text-sm text-gray-600">{template.description}</p>
                      </div>
                      {selectedTemplate === template.id && (
                        <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex gap-3 justify-end sticky bottom-0 bg-white">
              <Button
                variant="outline"
                onClick={() => {
                  setShowGenerateModal(false);
                  setSelectedTemplate('');
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleGenerateDraft}
                disabled={!selectedTemplate || isGenerating}
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generate Draft
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* View Draft Modal */}
      {showViewModal && selectedDraft && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
              <div>
                <h2 className="text-gray-900 text-xl font-semibold">{selectedDraft.title}</h2>
                <p className="text-sm text-gray-600 mt-1">Version {selectedDraft.version} • {selectedDraft.type}</p>
              </div>
              <button
                onClick={() => {
                  setShowViewModal(false);
                  setSelectedDraft(null);
                }}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="p-8">
              <div className="prose prose-sm max-w-none">
                <pre className="whitespace-pre-wrap font-serif text-gray-900 leading-relaxed">
                  {selectedDraft.content || 'No content available'}
                </pre>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex gap-3 justify-end sticky bottom-0 bg-white">
              <Button variant="outline">
                <Edit className="w-4 h-4 mr-2" />
                Edit Draft
              </Button>
              <Button>
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

