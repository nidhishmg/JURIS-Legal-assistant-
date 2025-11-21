import { CaseData } from '../data/casesData';

// LocalStorage key for cases
const CASES_STORAGE_KEY = 'juris_cases';

/**
 * Interface for creating a new case
 */
export interface CreateCaseInput {
  // Overview
  title: string;
  caseType: string;
  subType?: string;
  court: string;
  filingType: string;
  priority: 'High' | 'Normal' | 'Low';
  assignedLawyer: string;
  tags: string[];
  confidentiality: string;

  // Parties
  parties: {
    role: string;
    name: string;
    contact: string;
    email: string;
    address: string;
    isPrimaryClient: boolean;
  }[];

  // Facts & Timeline
  summary: string;
  narrative: string;
  timelineEvents: {
    date: string;
    time: string;
    title: string;
    location: string;
    notes: string;
  }[];

  // Documents
  documents: {
    name: string;
    category: string;
    isAnnexure: boolean;
    annexureLabel?: string;
    hasOCR: boolean;
  }[];

  // Issues & Law
  issues: {
    title: string;
    severity: 'High' | 'Medium' | 'Low';
    accepted: boolean;
    suggestedLaws: string[];
  }[];

  // Reliefs
  reliefType: string;
  hasInterimRelief: boolean;
  reliefAmount?: string;
  interimReason?: string;
  proposedOrder?: string;

  // Selected Drafts for Bundle
  selectedDrafts: string[];
}

/**
 * Get all cases from localStorage
 */
export function getAllCases(): CaseData[] {
  try {
    const casesJson = localStorage.getItem(CASES_STORAGE_KEY);
    if (!casesJson) return [];
    return JSON.parse(casesJson);
  } catch (error) {
    console.error('Error loading cases:', error);
    return [];
  }
}

/**
 * Get a specific case by ID
 */
export function getCaseById(id: string): CaseData | null {
  try {
    const cases = getAllCases();
    return cases.find(c => c.id === id) || null;
  } catch (error) {
    console.error('Error loading case:', error);
    return null;
  }
}

/**
 * Create a new case
 */
export function createCase(input: CreateCaseInput): CaseData {
  const now = new Date().toISOString();
  const caseId = `case-${Date.now()}`;
  const caseNumber = generateCaseNumber(input.caseType, input.court);

  // Find primary client
  const primaryClient = input.parties.find(p => p.isPrimaryClient) || input.parties[0];

  // Create the new case data
  const newCase: CaseData = {
    id: caseId,
    title: input.title,
    caseNumber: caseNumber,
    court: input.court,
    type: input.caseType,
    jurisdiction: extractJurisdiction(input.court),
    status: 'Investigation',
    stage: 'Investigation',
    client: {
      name: primaryClient?.name || 'Unknown Client',
      contact: primaryClient?.contact || '',
      email: primaryClient?.email || '',
      address: primaryClient?.address || ''
    },
    opponent: {
      name: input.parties.find(p => p.role.toLowerCase().includes('defendant') || p.role.toLowerCase().includes('respondent'))?.name || 'Unknown',
      contact: input.parties.find(p => p.role.toLowerCase().includes('defendant') || p.role.toLowerCase().includes('respondent'))?.contact || '',
      email: input.parties.find(p => p.role.toLowerCase().includes('defendant') || p.role.toLowerCase().includes('respondent'))?.email || ''
    },
    assignedTeam: input.assignedLawyer ? [input.assignedLawyer] : [],
    filingDate: now.split('T')[0],
    openedOn: now.split('T')[0],
    lastActivity: 'Just now',
    tags: input.tags,
    summary: input.summary,
    
    // Progress tracking
    progress: [
      {
        step: 'Case Filed',
        completed: true,
        requiredDocs: input.selectedDrafts,
        completionStatus: 100
      },
      {
        step: 'Documents Submitted',
        completed: input.documents.length > 0,
        requiredDocs: input.documents.map(d => d.name),
        completionStatus: input.documents.length > 0 ? 100 : 0
      },
      {
        step: 'First Hearing',
        completed: false,
        requiredDocs: [],
        completionStatus: 0
      }
    ],
    
    // Drafts
    drafts: input.selectedDrafts.map((draftType, idx) => ({
      id: `draft-${idx + 1}`,
      title: formatDraftName(draftType),
      type: draftType,
      version: 1,
      author: input.assignedLawyer || 'System',
      lastEdited: now,
      status: 'Draft' as const
    })),
    
    // Documents
    documents: input.documents.map((doc, idx) => ({
      id: `doc-${idx + 1}`,
      title: doc.name,
      type: doc.category,
      category: doc.category,
      uploadedBy: input.assignedLawyer || 'System',
      uploadedOn: now.split('T')[0],
      size: '0 KB',
      isAnnexure: doc.isAnnexure,
      annexureLabel: doc.annexureLabel
    })),
    
    // Timeline
    timeline: [
      {
        id: 'timeline-0',
        type: 'Case Creation',
        title: 'Case Created',
        description: `Case ${input.title} created in the system`,
        date: now.split('T')[0],
        time: new Date(now).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
        createdBy: input.assignedLawyer || 'System',
        attachments: 0,
        pinned: true
      },
      ...input.timelineEvents.map((event, idx) => ({
        id: `timeline-${idx + 1}`,
        type: 'Event',
        title: event.title,
        description: event.notes || event.title,
        date: event.date,
        time: event.time,
        createdBy: input.assignedLawyer || 'System',
        attachments: 0
      }))
    ],
    
    // Facts
    facts: input.narrative ? [{
      id: 'fact-1',
      category: 'Case Summary',
      title: 'Case Background',
      description: input.narrative,
      supportingDocs: input.documents.map(d => d.name),
      confidence: 100,
      verified: true
    }] : [],
    
    // Issues
    issues: input.issues.filter(i => i.accepted).map((issue, idx) => ({
      id: `issue-${idx + 1}`,
      title: issue.title,
      description: issue.title,
      lawSections: issue.suggestedLaws,
      priority: issue.severity,
      status: 'Open' as const,
      assignedTo: input.assignedLawyer || 'Unassigned',
      linkedFacts: ['fact-1']
    })),
    
    // Tasks
    tasks: [
      {
        id: 'task-1',
        title: 'Review Case Documents',
        description: 'Review all uploaded documents and verify completeness',
        assignedTo: input.assignedLawyer || 'Unassigned',
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        status: 'Pending' as const,
        priority: input.priority === 'Normal' ? 'Medium' : input.priority as 'High' | 'Low'
      }
    ],
    
    // Hearings
    hearings: [],
    
    // Activity
    activity: [
      {
        id: 'activity-1',
        user: input.assignedLawyer || 'System',
        action: 'created',
        target: 'Case',
        timestamp: 'Just now',
        details: `Created case: ${input.title}`
      }
    ],
    
    // Metrics
    metrics: {
      totalDrafts: input.selectedDrafts.length,
      totalDocuments: input.documents.length,
      totalAnnexures: input.documents.filter(d => d.isAnnexure).length,
      totalHearings: 0,
      overdueTasks: 0
    }
  };

  // Save to localStorage
  const cases = getAllCases();
  cases.unshift(newCase); // Add to beginning
  localStorage.setItem(CASES_STORAGE_KEY, JSON.stringify(cases));

  return newCase;
}

/**
 * Update an existing case
 */
export function updateCase(id: string, updates: Partial<CaseData>): CaseData | null {
  try {
    const cases = getAllCases();
    const index = cases.findIndex(c => c.id === id);
    
    if (index === -1) return null;
    
    cases[index] = { ...cases[index], ...updates };
    localStorage.setItem(CASES_STORAGE_KEY, JSON.stringify(cases));
    
    return cases[index];
  } catch (error) {
    console.error('Error updating case:', error);
    return null;
  }
}

/**
 * Delete a case
 */
export function deleteCase(id: string): boolean {
  try {
    const cases = getAllCases();
    const filtered = cases.filter(c => c.id !== id);
    localStorage.setItem(CASES_STORAGE_KEY, JSON.stringify(filtered));
    return true;
  } catch (error) {
    console.error('Error deleting case:', error);
    return false;
  }
}

/**
 * Helper: Generate case number based on type and court
 */
function generateCaseNumber(caseType: string, court: string): string {
  const year = new Date().getFullYear();
  const random = Math.floor(Math.random() * 9000) + 1000;
  
  let prefix = 'CS';
  if (caseType.toLowerCase().includes('criminal')) prefix = 'CRL';
  if (caseType.toLowerCase().includes('family')) prefix = 'HMA';
  if (caseType.toLowerCase().includes('consumer')) prefix = 'CC';
  if (caseType.toLowerCase().includes('commercial')) prefix = 'CS(COMM)';
  
  return `${prefix} ${random}/${year}`;
}

/**
 * Helper: Extract jurisdiction from court name
 */
function extractJurisdiction(court: string): string {
  if (court.toLowerCase().includes('supreme')) return 'Supreme Court of India';
  if (court.toLowerCase().includes('high court')) return court;
  if (court.toLowerCase().includes('delhi')) return 'Delhi';
  if (court.toLowerCase().includes('mumbai')) return 'Mumbai';
  return court;
}

/**
 * Helper: Format draft name for display
 */
function formatDraftName(draftType: string): string {
  const names: Record<string, string> = {
    'plaint': 'Plaint/Petition',
    'affidavit': 'Affidavit',
    'vakalatnama': 'Vakalatnama',
    'annexure-index': 'Index of Annexures',
    'reply': 'Reply',
    'written-statement': 'Written Statement',
    'application': 'Application',
    'memo-parties': 'Memorandum of Parties',
    'petition': 'Petition'
  };
  
  return names[draftType] || draftType;
}

/**
 * Add a generated draft to a case
 */
export function addDraftToCase(caseId: string, draftData: {
  title: string;
  type: string;
  content: string;
}): boolean {
  try {
    const cases = getAllCases();
    const caseIndex = cases.findIndex(c => c.id === caseId);
    
    if (caseIndex === -1) return false;
    
    const caseData = cases[caseIndex];
    const now = new Date().toISOString();
    
    // Create new draft
    const newDraft = {
      id: `draft-${Date.now()}`,
      title: draftData.title,
      type: draftData.type,
      version: 1,
      author: caseData.assignedTeam[0] || 'System',
      lastEdited: now,
      status: 'Draft' as const,
      content: draftData.content
    };
    
    // Add draft to case
    caseData.drafts.push(newDraft);
    caseData.metrics.totalDrafts = caseData.drafts.length;
    
    // Add activity
    caseData.activity.unshift({
      id: `activity-${Date.now()}`,
      user: caseData.assignedTeam[0] || 'System',
      action: 'generated',
      target: draftData.title,
      timestamp: 'Just now',
      details: `Generated ${draftData.title} using AI`
    });
    
    // Save updated case
    cases[caseIndex] = caseData;
    localStorage.setItem(CASES_STORAGE_KEY, JSON.stringify(cases));
    
    return true;
  } catch (error) {
    console.error('Error adding draft to case:', error);
    return false;
  }
}

/**
 * Get a specific draft from a case
 */
export function getDraftById(caseId: string, draftId: string) {
  try {
    const caseData = getCaseById(caseId);
    if (!caseData) return null;
    
    return caseData.drafts.find(d => d.id === draftId) || null;
  } catch (error) {
    console.error('Error getting draft:', error);
    return null;
  }
}
