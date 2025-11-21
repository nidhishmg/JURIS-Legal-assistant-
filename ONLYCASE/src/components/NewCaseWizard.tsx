import { useState } from 'react';
import { 
  ArrowLeft, 
  ArrowRight,
  Check,
  Plus,
  Upload,
  X,
  FileText,
  Users,
  Clock,
  FolderOpen,
  Scale,
  FileCheck,
  Paperclip,
  Sparkles,
  Download,
  Eye,
  GripVertical,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Checkbox } from './ui/checkbox';
import { Switch } from './ui/switch';
import { Progress } from './ui/progress';
import { Separator } from './ui/separator';
import { toast } from 'sonner';
import { createCase, CreateCaseInput } from '../services/caseService';

interface NewCaseWizardProps {
  onClose: () => void;
  onSuccess: (caseId: string) => void;
}

interface Party {
  id: string;
  role: string;
  name: string;
  contact: string;
  email: string;
  address: string;
  isPrimaryClient: boolean;
}

interface TimelineEvent {
  id: string;
  date: string;
  time: string;
  title: string;
  location: string;
  notes: string;
}

interface Document {
  id: string;
  name: string;
  category: string;
  isAnnexure: boolean;
  annexureLabel?: string;
  hasOCR: boolean;
}

interface Issue {
  id: string;
  title: string;
  severity: 'High' | 'Medium' | 'Low';
  accepted: boolean;
  suggestedLaws: string[];
}

const STEPS = [
  { id: 1, label: 'Overview', icon: FileText },
  { id: 2, label: 'Parties', icon: Users },
  { id: 3, label: 'Facts & Timeline', icon: Clock },
  { id: 4, label: 'Documents & Evidence', icon: FolderOpen },
  { id: 5, label: 'Issues & Law', icon: Scale },
  { id: 6, label: 'Reliefs Requested', icon: FileCheck },
  { id: 7, label: 'Annexures & Index', icon: Paperclip },
  { id: 8, label: 'Generate Bundle', icon: Sparkles }
];

export function NewCaseWizard({ onClose, onSuccess }: NewCaseWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);

  // Step 1: Overview
  const [caseTitle, setCaseTitle] = useState('');
  const [caseType, setCaseType] = useState('');
  const [subType, setSubType] = useState('');
  const [court, setCourt] = useState('');
  const [filingType, setFilingType] = useState('');
  const [priority, setPriority] = useState('Normal');
  const [assignedLawyer, setAssignedLawyer] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [confidentiality, setConfidentiality] = useState('Internal');

  // Step 2: Parties
  const [parties, setParties] = useState<Party[]>([
    {
      id: '1',
      role: 'Plaintiff',
      name: '',
      contact: '',
      email: '',
      address: '',
      isPrimaryClient: true
    }
  ]);

  // Step 3: Facts & Timeline
  const [summary, setSummary] = useState('');
  const [narrative, setNarrative] = useState('');
  const [timelineEvents, setTimelineEvents] = useState<TimelineEvent[]>([]);

  // Step 4: Documents
  const [documents, setDocuments] = useState<Document[]>([]);

  // Step 5: Issues & Law
  const [issues, setIssues] = useState<Issue[]>([]);

  // Step 6: Reliefs
  const [reliefType, setReliefType] = useState('');
  const [hasInterimRelief, setHasInterimRelief] = useState(false);
  const [reliefAmount, setReliefAmount] = useState('');
  const [interimReason, setInterimReason] = useState('');
  const [proposedOrder, setProposedOrder] = useState('');

  // Step 7: Annexures
  const [annexures, setAnnexures] = useState<Document[]>([]);

  // Step 8: Bundle
  const [selectedDrafts, setSelectedDrafts] = useState<string[]>([
    'plaint',
    'affidavit',
    'vakalatnama',
    'annexure-index'
  ]);

  const handleNext = () => {
    if (currentStep < 8) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const addParty = () => {
    setParties([
      ...parties,
      {
        id: Date.now().toString(),
        role: 'Defendant',
        name: '',
        contact: '',
        email: '',
        address: '',
        isPrimaryClient: false
      }
    ]);
  };

  const removeParty = (id: string) => {
    setParties(parties.filter(p => p.id !== id));
  };

  const updateParty = (id: string, field: keyof Party, value: any) => {
    setParties(parties.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const addTimelineEvent = () => {
    setTimelineEvents([
      ...timelineEvents,
      {
        id: Date.now().toString(),
        date: '',
        time: '',
        title: '',
        location: '',
        notes: ''
      }
    ]);
  };

  const handleAutoExtractFacts = () => {
    toast.success('Analyzing documents and extracting facts...');
    setTimeout(() => {
      toast.success('Facts extracted successfully!');
    }, 2000);
  };

  const handleDetectIssues = () => {
    toast.success('Detecting legal issues...');
    setTimeout(() => {
      setIssues([
        {
          id: '1',
          title: 'Breach of Contract - Material Terms',
          severity: 'High',
          accepted: true,
          suggestedLaws: ['Indian Contract Act Section 73', 'Section 39']
        },
        {
          id: '2',
          title: 'Specific Performance Claim',
          severity: 'Medium',
          accepted: true,
          suggestedLaws: ['Specific Relief Act Section 10']
        }
      ]);
      toast.success('Legal issues identified!');
    }, 2000);
  };

  const handleGenerateAnnexureIndex = () => {
    const annexureDocs = documents.filter(d => d.isAnnexure);
    setAnnexures(annexureDocs.map((doc, idx) => ({
      ...doc,
      annexureLabel: `Annexure ${String.fromCharCode(65 + idx)}`
    })));
    toast.success('Annexure index generated!');
  };

  const handleGenerateBundle = () => {
    setIsGenerating(true);
    toast.success('Creating case...');
    
    try {
      // Prepare case data
      const caseInput: CreateCaseInput = {
        title: caseTitle,
        caseType: caseType,
        subType: subType,
        court: court,
        filingType: filingType,
        priority: priority as 'High' | 'Normal' | 'Low',
        assignedLawyer: assignedLawyer,
        tags: tags,
        confidentiality: confidentiality,
        parties: parties,
        summary: summary,
        narrative: narrative,
        timelineEvents: timelineEvents,
        documents: documents,
        issues: issues,
        reliefType: reliefType,
        hasInterimRelief: hasInterimRelief,
        reliefAmount: reliefAmount,
        interimReason: interimReason,
        proposedOrder: proposedOrder,
        selectedDrafts: selectedDrafts
      };

      // Create case using backend service
      const newCase = createCase(caseInput);
      
      setTimeout(() => {
        setIsGenerating(false);
        toast.success('Case created successfully!');
        onSuccess(newCase.id);
      }, 1500);
    } catch (error) {
      setIsGenerating(false);
      toast.error('Failed to create case. Please try again.');
      console.error('Error creating case:', error);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="col-span-2">
                <Label htmlFor="caseTitle">Case Title *</Label>
                <Input
                  id="caseTitle"
                  value={caseTitle}
                  onChange={(e) => setCaseTitle(e.target.value)}
                  placeholder="e.g., ABC Ltd. vs. XYZ Corporation"
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="caseType">Case Type *</Label>
                <Select value={caseType} onValueChange={setCaseType}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select case type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="civil">Civil</SelectItem>
                    <SelectItem value="criminal">Criminal</SelectItem>
                    <SelectItem value="consumer">Consumer</SelectItem>
                    <SelectItem value="family">Family</SelectItem>
                    <SelectItem value="contract">Contract</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="subType">Sub-Type</Label>
                <Input
                  id="subType"
                  value={subType}
                  onChange={(e) => setSubType(e.target.value)}
                  placeholder="e.g., Breach of Contract"
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="court">Court/Jurisdiction *</Label>
                <Input
                  id="court"
                  value={court}
                  onChange={(e) => setCourt(e.target.value)}
                  placeholder="e.g., Delhi High Court"
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="filingType">Filing Type</Label>
                <Select value={filingType} onValueChange={setFilingType}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select filing type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="physical">Physical Filing</SelectItem>
                    <SelectItem value="efiling">E-Filing</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="priority">Priority</Label>
                <Select value={priority} onValueChange={setPriority}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Low">Low</SelectItem>
                    <SelectItem value="Normal">Normal</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="assignedLawyer">Assign Lawyer</Label>
                <Select value={assignedLawyer} onValueChange={setAssignedLawyer}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select lawyer" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rajesh">Adv. Rajesh Kumar</SelectItem>
                    <SelectItem value="priya">Adv. Priya Singh</SelectItem>
                    <SelectItem value="suresh">Adv. Suresh Menon</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="confidentiality">Confidentiality Level</Label>
                <Select value={confidentiality} onValueChange={setConfidentiality}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Public">Public</SelectItem>
                    <SelectItem value="Internal">Internal</SelectItem>
                    <SelectItem value="Private">Private</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-900">Party Details</h3>
              <Button onClick={addParty} size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Party
              </Button>
            </div>
            <div className="space-y-4">
              {parties.map((party, index) => (
                <div key={party.id} className="p-6 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-gray-900">Party {index + 1}</h4>
                    {parties.length > 1 && (
                      <button
                        onClick={() => removeParty(party.id)}
                        className="p-1 text-red-600 hover:bg-red-50 rounded"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Role *</Label>
                      <Select
                        value={party.role}
                        onValueChange={(value) => updateParty(party.id, 'role', value)}
                      >
                        <SelectTrigger className="mt-2">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Plaintiff">Plaintiff</SelectItem>
                          <SelectItem value="Defendant">Defendant</SelectItem>
                          <SelectItem value="Petitioner">Petitioner</SelectItem>
                          <SelectItem value="Respondent">Respondent</SelectItem>
                          <SelectItem value="Accused">Accused</SelectItem>
                          <SelectItem value="Complainant">Complainant</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Name *</Label>
                      <Input
                        value={party.name}
                        onChange={(e) => updateParty(party.id, 'name', e.target.value)}
                        placeholder="Full name"
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label>Contact Number</Label>
                      <Input
                        value={party.contact}
                        onChange={(e) => updateParty(party.id, 'contact', e.target.value)}
                        placeholder="+91 98765 43210"
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label>Email</Label>
                      <Input
                        type="email"
                        value={party.email}
                        onChange={(e) => updateParty(party.id, 'email', e.target.value)}
                        placeholder="email@example.com"
                        className="mt-2"
                      />
                    </div>
                    <div className="col-span-2">
                      <Label>Address</Label>
                      <Textarea
                        value={party.address}
                        onChange={(e) => updateParty(party.id, 'address', e.target.value)}
                        placeholder="Complete address"
                        className="mt-2"
                        rows={2}
                      />
                    </div>
                    <div className="col-span-2 flex items-center gap-2">
                      <Switch
                        checked={party.isPrimaryClient}
                        onCheckedChange={(checked) => updateParty(party.id, 'isPrimaryClient', checked)}
                      />
                      <Label>Set as Primary Client</Label>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="summary">One-line Summary</Label>
                <Input
                  id="summary"
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  placeholder="Brief summary of the case"
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="narrative">Detailed Narrative</Label>
                <Textarea
                  id="narrative"
                  value={narrative}
                  onChange={(e) => setNarrative(e.target.value)}
                  placeholder="Detailed facts and circumstances of the case..."
                  className="mt-2"
                  rows={8}
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={addTimelineEvent} variant="outline" className="flex-1">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Event
                </Button>
                <Button onClick={handleAutoExtractFacts} variant="outline" className="flex-1">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Auto-Extract Facts
                </Button>
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h3 className="text-gray-900 mb-4">Timeline Preview</h3>
              {timelineEvents.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Clock className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p>No timeline events yet</p>
                  <p className="text-sm">Add events to build the case timeline</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {timelineEvents.map((event) => (
                    <div key={event.id} className="p-3 bg-white rounded-lg border border-gray-200">
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                        <Clock className="w-3 h-3" />
                        <span>{event.date} {event.time}</span>
                      </div>
                      <p className="text-gray-900">{event.title}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-blue-400 transition-colors cursor-pointer">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-900 mb-2">Drag & drop files here</p>
              <p className="text-sm text-gray-500 mb-4">or click to browse</p>
              <Button>Upload Documents</Button>
            </div>
            {documents.length > 0 && (
              <div className="grid grid-cols-3 gap-4">
                {documents.map((doc) => (
                  <div key={doc.id} className="p-4 bg-white rounded-xl border border-gray-200">
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5 text-blue-600" />
                      </div>
                      {doc.hasOCR && (
                        <Badge className="bg-green-100 text-green-700 text-xs">OCR</Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-900 mb-2 truncate">{doc.name}</p>
                    <Badge variant="outline" className="text-xs mb-3">{doc.category}</Badge>
                    <div className="flex items-center gap-2 text-xs">
                      <Checkbox
                        checked={doc.isAnnexure}
                        onCheckedChange={(checked) => {
                          setDocuments(documents.map(d =>
                            d.id === doc.id ? { ...d, isAnnexure: checked as boolean } : d
                          ));
                        }}
                      />
                      <span className="text-gray-600">Mark as Annexure</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case 5:
        return (
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-gray-900">Legal Issues</h3>
                <Button onClick={handleDetectIssues} size="sm">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Detect Issues
                </Button>
              </div>
              {issues.length === 0 ? (
                <div className="p-8 bg-gray-50 rounded-xl border border-gray-200 text-center">
                  <Scale className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-600 mb-2">No issues identified yet</p>
                  <p className="text-sm text-gray-500">Click "Detect Issues" to analyze</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {issues.map((issue) => (
                    <div key={issue.id} className="p-4 bg-white rounded-xl border border-gray-200">
                      <div className="flex items-start justify-between mb-2">
                        <Badge className={
                          issue.severity === 'High' ? 'bg-red-100 text-red-700' :
                          issue.severity === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-green-100 text-green-700'
                        }>
                          {issue.severity}
                        </Badge>
                        <Switch
                          checked={issue.accepted}
                          onCheckedChange={(checked) => {
                            setIssues(issues.map(i =>
                              i.id === issue.id ? { ...i, accepted: checked } : i
                            ));
                          }}
                        />
                      </div>
                      <h4 className="text-gray-900 mb-2">{issue.title}</h4>
                      <div className="flex flex-wrap gap-1">
                        {issue.suggestedLaws.map((law, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {law}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h3 className="text-gray-900 mb-4">Suggested Precedents</h3>
              <div className="space-y-3">
                <div className="p-4 bg-white rounded-lg border border-gray-200">
                  <h4 className="text-gray-900 mb-1">State vs. Kumar (2024)</h4>
                  <p className="text-sm text-gray-600 mb-2">2024 SCC OnLine Del 2345</p>
                  <Badge className="bg-blue-100 text-blue-700 text-xs">Highly Relevant</Badge>
                </div>
                <div className="p-4 bg-white rounded-lg border border-gray-200">
                  <h4 className="text-gray-900 mb-1">ABC Ltd. vs. XYZ Corp</h4>
                  <p className="text-sm text-gray-600 mb-2">2023 SCC 567</p>
                  <Badge className="bg-green-100 text-green-700 text-xs">Relevant</Badge>
                </div>
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="max-w-2xl mx-auto space-y-6">
            <div>
              <Label htmlFor="reliefType">Relief Type *</Label>
              <Select value={reliefType} onValueChange={setReliefType}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select type of relief" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="damages">Damages</SelectItem>
                  <SelectItem value="specific-performance">Specific Performance</SelectItem>
                  <SelectItem value="injunction">Injunction</SelectItem>
                  <SelectItem value="declaration">Declaration</SelectItem>
                  <SelectItem value="bail">Bail</SelectItem>
                  <SelectItem value="custody">Custody</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <Switch
                checked={hasInterimRelief}
                onCheckedChange={setHasInterimRelief}
              />
              <div>
                <Label>Interim Relief Required</Label>
                <p className="text-sm text-gray-500">Request temporary relief pending final order</p>
              </div>
            </div>
            {hasInterimRelief && (
              <div className="space-y-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div>
                  <Label htmlFor="interimReason">Reason for Interim Relief *</Label>
                  <Textarea
                    id="interimReason"
                    value={interimReason}
                    onChange={(e) => setInterimReason(e.target.value)}
                    placeholder="Explain why interim relief is necessary..."
                    className="mt-2"
                    rows={3}
                  />
                </div>
              </div>
            )}
            <div>
              <Label htmlFor="reliefAmount">Relief Amount (if applicable)</Label>
              <Input
                id="reliefAmount"
                value={reliefAmount}
                onChange={(e) => setReliefAmount(e.target.value)}
                placeholder="e.g., ₹ 10,00,000"
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="proposedOrder">Proposed Order</Label>
              <Textarea
                id="proposedOrder"
                value={proposedOrder}
                onChange={(e) => setProposedOrder(e.target.value)}
                placeholder="Draft the proposed order text..."
                className="mt-2"
                rows={6}
              />
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-gray-900">Annexure List</h3>
              <Button onClick={handleGenerateAnnexureIndex} size="sm">
                <Sparkles className="w-4 h-4 mr-2" />
                Generate Index
              </Button>
            </div>
            {annexures.length === 0 ? (
              <div className="p-12 bg-gray-50 rounded-xl border border-gray-200 text-center">
                <Paperclip className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-600 mb-2">No annexures marked yet</p>
                <p className="text-sm text-gray-500">Mark documents as annexures in the Documents step</p>
              </div>
            ) : (
              <div className="space-y-2">
                {annexures.map((annexure, index) => (
                  <div
                    key={annexure.id}
                    className="flex items-center gap-4 p-4 bg-white rounded-lg border border-gray-200"
                  >
                    <GripVertical className="w-5 h-5 text-gray-400 cursor-move" />
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <Badge className="bg-purple-100 text-purple-700">
                          {annexure.annexureLabel}
                        </Badge>
                        <span className="text-gray-900">{annexure.name}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case 8:
        return (
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-gray-900 mb-4">Select Documents to Generate</h3>
              <div className="space-y-2">
                {[
                  { id: 'plaint', label: 'Plaint' },
                  { id: 'complaint', label: 'Complaint' },
                  { id: 'affidavit', label: 'Affidavit' },
                  { id: 'vakalatnama', label: 'Vakalatnama' },
                  { id: 'bail', label: 'Bail Application' },
                  { id: 'statement-164', label: '164 Statement' },
                  { id: 'petition', label: 'Petition' },
                  { id: 'synopsis', label: 'Synopsis & List of Dates' },
                  { id: 'annexure-index', label: 'Annexure Index' },
                  { id: 'court-fee', label: 'Court Fee Calculation' }
                ].map((draft) => (
                  <div key={draft.id} className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200">
                    <Checkbox
                      checked={selectedDrafts.includes(draft.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedDrafts([...selectedDrafts, draft.id]);
                        } else {
                          setSelectedDrafts(selectedDrafts.filter(id => id !== draft.id));
                        }
                      }}
                    />
                    <FileText className="w-4 h-4 text-gray-600" />
                    <span className="text-gray-900">{draft.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h3 className="text-gray-900 mb-4">Document Preview</h3>
              <div className="bg-white rounded-lg border-2 border-gray-300 h-96 flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <FileText className="w-16 h-16 mx-auto mb-3" />
                  <p>Preview will appear here</p>
                  <p className="text-sm">after generation</p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const getStepProgress = () => {
    return ((currentStep - 1) / (STEPS.length - 1)) * 100;
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-gray-900">Create New Case</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Stepper */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              {STEPS.map((step, index) => {
                const Icon = step.icon;
                const isActive = currentStep === step.id;
                const isCompleted = currentStep > step.id;

                return (
                  <div key={step.id} className="flex-1 flex items-center">
                    <div className="flex flex-col items-center flex-1">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        isCompleted ? 'bg-green-100' :
                        isActive ? 'bg-blue-100' : 'bg-gray-100'
                      }`}>
                        {isCompleted ? (
                          <Check className="w-5 h-5 text-green-600" />
                        ) : (
                          <Icon className={`w-5 h-5 ${
                            isActive ? 'text-blue-600' : 'text-gray-400'
                          }`} />
                        )}
                      </div>
                      <span className={`text-xs mt-2 text-center ${
                        isActive ? 'text-blue-600' : 'text-gray-600'
                      }`}>
                        {step.label}
                      </span>
                    </div>
                    {index < STEPS.length - 1 && (
                      <div className={`h-0.5 flex-1 mx-2 ${
                        currentStep > step.id ? 'bg-green-300' : 'bg-gray-200'
                      }`} />
                    )}
                  </div>
                );
              })}
            </div>
            <Progress value={getStepProgress()} className="h-1" />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {renderStepContent()}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 1}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" onClick={onClose}>
                Save as Draft
              </Button>
              {currentStep === 8 ? (
                <Button onClick={handleGenerateBundle} disabled={isGenerating}>
                  {isGenerating ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Generate Bundle
                    </>
                  )}
                </Button>
              ) : (
                <Button onClick={handleNext}>
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
