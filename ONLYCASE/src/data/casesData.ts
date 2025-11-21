export interface CaseData {
  id: string;
  title: string;
  caseNumber: string;
  court: string;
  type: string;
  jurisdiction: string;
  status: 'Investigation' | 'Trial' | 'Appeal' | 'Closed';
  stage: 'Investigation' | 'Bail' | 'Chargesheet' | 'Trial' | 'Judgment' | 'Appeal';
  client: {
    name: string;
    contact: string;
    email: string;
    address: string;
  };
  opponent: {
    name: string;
    contact: string;
    email: string;
  };
  assignedTeam: string[];
  nextHearing?: {
    date: string;
    time: string;
    court: string;
    purpose: string;
  };
  filingDate: string;
  openedOn: string;
  lastActivity: string;
  tags: string[];
  summary: string;
  fir?: string;
  
  // Progress
  progress: {
    step: string;
    completed: boolean;
    requiredDocs: string[];
    completionStatus: number;
  }[];
  
  // Drafts
  drafts: {
    id: string;
    title: string;
    type: string;
    version: number;
    author: string;
    lastEdited: string;
    status: 'Draft' | 'Review' | 'Final';
  }[];
  
  // Documents
  documents: {
    id: string;
    title: string;
    type: string;
    category: string;
    uploadedBy: string;
    uploadedOn: string;
    size: string;
    isAnnexure: boolean;
    annexureLabel?: string;
  }[];
  
  // Timeline
  timeline: {
    id: string;
    type: string;
    title: string;
    description: string;
    date: string;
    time: string;
    createdBy: string;
    attachments: number;
    pinned?: boolean;
  }[];
  
  // Facts
  facts: {
    id: string;
    category: string;
    title: string;
    description: string;
    supportingDocs: string[];
    confidence: number;
    verified: boolean;
  }[];
  
  // Issues
  issues: {
    id: string;
    title: string;
    description: string;
    lawSections: string[];
    priority: 'High' | 'Medium' | 'Low';
    status: 'Open' | 'Closed';
    assignedTo: string;
    linkedFacts: string[];
  }[];
  
  // Tasks
  tasks: {
    id: string;
    title: string;
    description: string;
    assignedTo: string;
    dueDate: string;
    status: 'Pending' | 'In Progress' | 'Completed';
    priority: 'High' | 'Medium' | 'Low';
  }[];
  
  // Hearings
  hearings: {
    id: string;
    date: string;
    time: string;
    court: string;
    judge: string;
    causeListNo: string;
    outcome?: string;
    notes?: string;
    nextDate?: string;
  }[];
  
  // Activity
  activity: {
    id: string;
    user: string;
    action: string;
    target: string;
    timestamp: string;
    details?: string;
  }[];
  
  // Metrics
  metrics: {
    totalDrafts: number;
    totalDocuments: number;
    totalAnnexures: number;
    totalHearings: number;
    overdueTasks: number;
  };
}

export const mockCasesData: CaseData[] = [
  {
    id: '1',
    title: 'Sharma vs. State of Delhi',
    caseNumber: 'CRL.M.C. 4567/2024',
    court: 'Delhi High Court',
    type: 'Criminal',
    jurisdiction: 'Delhi High Court',
    status: 'Trial',
    stage: 'Bail',
    client: {
      name: 'Ramesh Sharma',
      contact: '+91 98765 43210',
      email: 'ramesh.sharma@example.com',
      address: 'D-23, Rohini Sector 15, Delhi - 110089'
    },
    opponent: {
      name: 'State of Delhi (PP: Adv. Meera Kapoor)',
      contact: '+91 11 2876 5432',
      email: 'prosecutor.delhi@gov.in'
    },
    assignedTeam: ['Adv. Rajesh Kumar', 'Adv. Priya Singh'],
    nextHearing: {
      date: '2025-11-25',
      time: '10:30 AM',
      court: 'Court No. 5, Delhi High Court',
      purpose: 'Bail Application Hearing'
    },
    filingDate: '2024-08-15',
    openedOn: '2024-08-10',
    lastActivity: '2 hours ago',
    tags: ['Criminal', 'Bail', 'IPC 420', 'High Priority'],
    summary: 'Criminal case involving allegations of cheating and fraud under IPC Section 420. Client arrested on August 8, 2024. FIR registered at Rohini Police Station. Currently seeking anticipatory bail. Strong grounds for bail based on lack of evidence and clean prior record.',
    fir: 'FIR No. 234/2024',
    
    progress: [
      { step: 'Investigation', completed: true, requiredDocs: ['FIR Copy', 'Arrest Memo'], completionStatus: 100 },
      { step: 'Bail', completed: false, requiredDocs: ['Bail Application', 'Supporting Affidavit'], completionStatus: 75 },
      { step: 'Chargesheet', completed: false, requiredDocs: [], completionStatus: 0 },
      { step: 'Trial', completed: false, requiredDocs: [], completionStatus: 0 },
      { step: 'Judgment', completed: false, requiredDocs: [], completionStatus: 0 }
    ],
    
    drafts: [
      {
        id: 'd1',
        title: 'Anticipatory Bail Application',
        type: 'Bail Application',
        version: 3,
        author: 'Adv. Rajesh Kumar',
        lastEdited: '2 hours ago',
        status: 'Final'
      },
      {
        id: 'd2',
        title: 'Supporting Affidavit - Client Statement',
        type: 'Affidavit',
        version: 2,
        author: 'Adv. Priya Singh',
        lastEdited: '5 hours ago',
        status: 'Review'
      },
      {
        id: 'd3',
        title: 'Written Statement - Defence',
        type: 'Written Statement',
        version: 1,
        author: 'Adv. Rajesh Kumar',
        lastEdited: 'Yesterday',
        status: 'Draft'
      }
    ],
    
    documents: [
      {
        id: 'doc1',
        title: 'FIR Copy',
        type: 'PDF',
        category: 'FIR',
        uploadedBy: 'Adv. Rajesh Kumar',
        uploadedOn: '2024-08-15',
        size: '2.4 MB',
        isAnnexure: true,
        annexureLabel: 'Annexure A'
      },
      {
        id: 'doc2',
        title: 'Arrest Memo',
        type: 'PDF',
        category: 'Police Records',
        uploadedBy: 'Adv. Priya Singh',
        uploadedOn: '2024-08-16',
        size: '1.1 MB',
        isAnnexure: true,
        annexureLabel: 'Annexure B'
      },
      {
        id: 'doc3',
        title: 'Client ID Proof - Aadhaar',
        type: 'PDF',
        category: 'Identity',
        uploadedBy: 'Adv. Rajesh Kumar',
        uploadedOn: '2024-08-15',
        size: '0.5 MB',
        isAnnexure: false
      },
      {
        id: 'doc4',
        title: 'Bank Statements - 6 months',
        type: 'PDF',
        category: 'Financial',
        uploadedBy: 'Adv. Priya Singh',
        uploadedOn: '2024-08-20',
        size: '4.2 MB',
        isAnnexure: true,
        annexureLabel: 'Annexure C'
      }
    ],
    
    timeline: [
      {
        id: 't1',
        type: 'Incident',
        title: 'Alleged Incident Date',
        description: 'Date of alleged fraud transaction',
        date: '2024-07-15',
        time: '2:30 PM',
        createdBy: 'System',
        attachments: 0,
        pinned: true
      },
      {
        id: 't2',
        type: 'Police Action',
        title: 'FIR Registered',
        description: 'FIR No. 234/2024 registered at Rohini PS',
        date: '2024-08-08',
        time: '11:00 AM',
        createdBy: 'Adv. Priya Singh',
        attachments: 1
      },
      {
        id: 't3',
        type: 'Arrest',
        title: 'Client Arrested',
        description: 'Ramesh Sharma arrested from residence',
        date: '2024-08-08',
        time: '6:00 PM',
        createdBy: 'Adv. Rajesh Kumar',
        attachments: 1
      },
      {
        id: 't4',
        type: 'Filing',
        title: 'Bail Application Filed',
        description: 'Anticipatory bail application filed in Delhi HC',
        date: '2024-08-16',
        time: '3:00 PM',
        createdBy: 'Adv. Rajesh Kumar',
        attachments: 2
      }
    ],
    
    facts: [
      {
        id: 'f1',
        category: 'Incident',
        title: 'Transaction Date and Amount',
        description: 'Alleged fraudulent transaction of ₹5,00,000 on July 15, 2024',
        supportingDocs: ['doc1', 'doc4'],
        confidence: 95,
        verified: true
      },
      {
        id: 'f2',
        category: 'Client Background',
        title: 'Clean Prior Record',
        description: 'Client has no previous criminal record, verified through police records',
        supportingDocs: ['doc3'],
        confidence: 100,
        verified: true
      },
      {
        id: 'f3',
        category: 'Evidence',
        title: 'Bank Statement Analysis',
        description: 'Bank statements show legitimate business transaction, not fraud',
        supportingDocs: ['doc4'],
        confidence: 85,
        verified: false
      }
    ],
    
    issues: [
      {
        id: 'i1',
        title: 'Prima Facie Case Under IPC 420',
        description: 'Whether prosecution has established prima facie case for cheating under Section 420 IPC',
        lawSections: ['IPC Section 420', 'IPC Section 415'],
        priority: 'High',
        status: 'Open',
        assignedTo: 'Adv. Rajesh Kumar',
        linkedFacts: ['f1', 'f3']
      },
      {
        id: 'i2',
        title: 'Ground for Anticipatory Bail',
        description: 'Clean record, cooperative with investigation, not a flight risk',
        lawSections: ['CrPC Section 438'],
        priority: 'High',
        status: 'Open',
        assignedTo: 'Adv. Priya Singh',
        linkedFacts: ['f2']
      }
    ],
    
    tasks: [
      {
        id: 'task1',
        title: 'File Bail Application',
        description: 'File the final bail application with all annexures',
        assignedTo: 'Adv. Rajesh Kumar',
        dueDate: '2025-11-22',
        status: 'Completed',
        priority: 'High'
      },
      {
        id: 'task2',
        title: 'Prepare for Bail Hearing',
        description: 'Review all case laws and prepare arguments for bail hearing',
        assignedTo: 'Adv. Rajesh Kumar',
        dueDate: '2025-11-24',
        status: 'In Progress',
        priority: 'High'
      },
      {
        id: 'task3',
        title: 'Client Meeting - Strategy Discussion',
        description: 'Discuss trial strategy if bail is denied',
        assignedTo: 'Adv. Priya Singh',
        dueDate: '2025-11-26',
        status: 'Pending',
        priority: 'Medium'
      }
    ],
    
    hearings: [
      {
        id: 'h1',
        date: '2024-08-20',
        time: '11:00 AM',
        court: 'Court No. 5, Delhi HC',
        judge: 'Justice Arvind Kumar',
        causeListNo: 'CRL.M.C. 4567/2024 - Item 15',
        outcome: 'Matter adjourned for final hearing',
        notes: 'Public Prosecutor sought time to file counter affidavit',
        nextDate: '2025-11-25'
      },
      {
        id: 'h2',
        date: '2025-11-25',
        time: '10:30 AM',
        court: 'Court No. 5, Delhi HC',
        judge: 'Justice Arvind Kumar',
        causeListNo: 'CRL.M.C. 4567/2024 - Item 12',
        notes: 'Final hearing scheduled'
      }
    ],
    
    activity: [
      {
        id: 'a1',
        user: 'Adv. Rajesh Kumar',
        action: 'edited',
        target: 'Anticipatory Bail Application',
        timestamp: '2 hours ago',
        details: 'Updated arguments section with recent case law'
      },
      {
        id: 'a2',
        user: 'Adv. Priya Singh',
        action: 'uploaded',
        target: 'Bank Statements',
        timestamp: '5 hours ago',
        details: 'Added 6-month bank statement as Annexure C'
      },
      {
        id: 'a3',
        user: 'Adv. Rajesh Kumar',
        action: 'completed',
        target: 'File Bail Application',
        timestamp: 'Yesterday',
        details: 'Bail application filed successfully'
      },
      {
        id: 'a4',
        user: 'Adv. Priya Singh',
        action: 'created',
        target: 'Supporting Affidavit',
        timestamp: '2 days ago',
        details: 'Created supporting affidavit for bail application'
      }
    ],
    
    metrics: {
      totalDrafts: 3,
      totalDocuments: 4,
      totalAnnexures: 3,
      totalHearings: 2,
      overdueTasks: 0
    }
  },
  {
    id: '2',
    title: 'ABC Ltd. vs. XYZ Corporation',
    caseNumber: 'CS(COMM) 234/2024',
    court: 'Delhi High Court',
    type: 'Commercial',
    jurisdiction: 'Delhi High Court',
    status: 'Trial',
    stage: 'Trial',
    client: {
      name: 'ABC Limited',
      contact: '+91 11 4567 8900',
      email: 'legal@abcltd.com',
      address: 'Tower A, Cyber City, Gurgaon - 122002'
    },
    opponent: {
      name: 'XYZ Corporation',
      contact: '+91 11 9876 5432',
      email: 'disputes@xyzcorp.com'
    },
    assignedTeam: ['Adv. Rajesh Kumar', 'Adv. Suresh Menon'],
    nextHearing: {
      date: '2025-11-28',
      time: '2:00 PM',
      court: 'Court No. 12, Delhi High Court',
      purpose: 'Evidence and Arguments'
    },
    filingDate: '2024-07-10',
    openedOn: '2024-07-05',
    lastActivity: '1 day ago',
    tags: ['Commercial', 'Contract Dispute', 'Breach', 'Damages'],
    summary: 'Commercial dispute involving breach of contract worth ₹2.5 crores. ABC Ltd claims XYZ Corporation failed to deliver goods as per agreement. Seeking damages and specific performance.',
    
    progress: [
      { step: 'Investigation', completed: true, requiredDocs: ['Contract', 'Correspondence'], completionStatus: 100 },
      { step: 'Bail', completed: true, requiredDocs: [], completionStatus: 100 },
      { step: 'Chargesheet', completed: true, requiredDocs: ['Plaint', 'Documents'], completionStatus: 100 },
      { step: 'Trial', completed: false, requiredDocs: ['Witness Statements', 'Evidence'], completionStatus: 60 },
      { step: 'Judgment', completed: false, requiredDocs: [], completionStatus: 0 }
    ],
    
    drafts: [
      {
        id: 'd1',
        title: 'Written Statement',
        type: 'Written Statement',
        version: 5,
        author: 'Adv. Rajesh Kumar',
        lastEdited: '1 day ago',
        status: 'Final'
      },
      {
        id: 'd2',
        title: 'Evidence Affidavit - Director',
        type: 'Affidavit',
        version: 2,
        author: 'Adv. Suresh Menon',
        lastEdited: '3 days ago',
        status: 'Review'
      }
    ],
    
    documents: [
      {
        id: 'doc1',
        title: 'Master Service Agreement',
        type: 'PDF',
        category: 'Contract',
        uploadedBy: 'Adv. Rajesh Kumar',
        uploadedOn: '2024-07-10',
        size: '3.2 MB',
        isAnnexure: true,
        annexureLabel: 'Annexure A'
      },
      {
        id: 'doc2',
        title: 'Email Correspondence',
        type: 'PDF',
        category: 'Evidence',
        uploadedBy: 'Adv. Suresh Menon',
        uploadedOn: '2024-07-15',
        size: '5.6 MB',
        isAnnexure: true,
        annexureLabel: 'Annexure B'
      }
    ],
    
    timeline: [
      {
        id: 't1',
        type: 'Contract',
        title: 'Contract Signed',
        description: 'Master Service Agreement executed between parties',
        date: '2023-12-01',
        time: '10:00 AM',
        createdBy: 'System',
        attachments: 1,
        pinned: true
      },
      {
        id: 't2',
        type: 'Breach',
        title: 'Delivery Deadline Missed',
        description: 'XYZ Corporation failed to deliver goods by deadline',
        date: '2024-06-15',
        time: '5:00 PM',
        createdBy: 'Adv. Rajesh Kumar',
        attachments: 0
      }
    ],
    
    facts: [
      {
        id: 'f1',
        category: 'Contract Terms',
        title: 'Delivery Deadline',
        description: 'Contract specified delivery by June 15, 2024',
        supportingDocs: ['doc1'],
        confidence: 100,
        verified: true
      }
    ],
    
    issues: [
      {
        id: 'i1',
        title: 'Breach of Contract',
        description: 'Whether defendant breached material terms of the contract',
        lawSections: ['Indian Contract Act Section 73', 'Section 39'],
        priority: 'High',
        status: 'Open',
        assignedTo: 'Adv. Rajesh Kumar',
        linkedFacts: ['f1']
      }
    ],
    
    tasks: [
      {
        id: 'task1',
        title: 'Prepare Cross-Examination Questions',
        description: 'Draft questions for opposing witness examination',
        assignedTo: 'Adv. Rajesh Kumar',
        dueDate: '2025-11-27',
        status: 'In Progress',
        priority: 'High'
      }
    ],
    
    hearings: [
      {
        id: 'h1',
        date: '2025-11-28',
        time: '2:00 PM',
        court: 'Court No. 12, Delhi HC',
        judge: 'Justice Sanjay Malhotra',
        causeListNo: 'CS(COMM) 234/2024 - Item 8'
      }
    ],
    
    activity: [
      {
        id: 'a1',
        user: 'Adv. Rajesh Kumar',
        action: 'updated',
        target: 'Written Statement',
        timestamp: '1 day ago',
        details: 'Finalized written statement'
      }
    ],
    
    metrics: {
      totalDrafts: 2,
      totalDocuments: 2,
      totalAnnexures: 2,
      totalHearings: 1,
      overdueTasks: 0
    }
  },
  {
    id: '3',
    title: 'Kumar vs. Kumar',
    caseNumber: 'HMA 156/2024',
    court: 'District Court',
    type: 'Family',
    jurisdiction: 'District Court Delhi',
    status: 'Trial',
    stage: 'Trial',
    client: {
      name: 'Priya Kumar',
      contact: '+91 98111 22334',
      email: 'priya.kumar@example.com',
      address: 'B-45, Lajpat Nagar, Delhi - 110024'
    },
    opponent: {
      name: 'Amit Kumar',
      contact: '+91 98222 33445',
      email: 'amit.kumar@example.com'
    },
    assignedTeam: ['Adv. Rajesh Kumar'],
    nextHearing: {
      date: '2025-12-02',
      time: '11:00 AM',
      court: 'Family Court, Dwarka',
      purpose: 'Maintenance Hearing'
    },
    filingDate: '2024-06-20',
    openedOn: '2024-06-15',
    lastActivity: '3 days ago',
    tags: ['Family', 'Divorce', 'Maintenance', 'Custody'],
    summary: 'Family court matter regarding divorce petition filed by wife. Seeking dissolution of marriage, child custody, and maintenance under Section 125 CrPC.',
    
    progress: [
      { step: 'Investigation', completed: true, requiredDocs: ['Marriage Certificate', 'Evidence'], completionStatus: 100 },
      { step: 'Bail', completed: true, requiredDocs: [], completionStatus: 100 },
      { step: 'Chargesheet', completed: true, requiredDocs: ['Petition', 'Affidavit'], completionStatus: 100 },
      { step: 'Trial', completed: false, requiredDocs: ['Witness Statements'], completionStatus: 50 },
      { step: 'Judgment', completed: false, requiredDocs: [], completionStatus: 0 }
    ],
    
    drafts: [
      {
        id: 'd1',
        title: 'Divorce Petition',
        type: 'Petition',
        version: 2,
        author: 'Adv. Rajesh Kumar',
        lastEdited: '1 week ago',
        status: 'Final'
      }
    ],
    
    documents: [
      {
        id: 'doc1',
        title: 'Marriage Certificate',
        type: 'PDF',
        category: 'Certificate',
        uploadedBy: 'Adv. Rajesh Kumar',
        uploadedOn: '2024-06-20',
        size: '0.8 MB',
        isAnnexure: true,
        annexureLabel: 'Annexure A'
      }
    ],
    
    timeline: [
      {
        id: 't1',
        type: 'Marriage',
        title: 'Date of Marriage',
        description: 'Marriage solemnized',
        date: '2018-02-14',
        time: '10:00 AM',
        createdBy: 'System',
        attachments: 1,
        pinned: true
      }
    ],
    
    facts: [
      {
        id: 'f1',
        category: 'Marriage',
        title: 'Marriage Date',
        description: 'Marriage took place on February 14, 2018',
        supportingDocs: ['doc1'],
        confidence: 100,
        verified: true
      }
    ],
    
    issues: [
      {
        id: 'i1',
        title: 'Ground for Divorce',
        description: 'Whether grounds for divorce under HMA Section 13 established',
        lawSections: ['Hindu Marriage Act Section 13', 'Section 25'],
        priority: 'High',
        status: 'Open',
        assignedTo: 'Adv. Rajesh Kumar',
        linkedFacts: ['f1']
      }
    ],
    
    tasks: [
      {
        id: 'task1',
        title: 'Prepare Maintenance Arguments',
        description: 'Draft arguments for maintenance application',
        assignedTo: 'Adv. Rajesh Kumar',
        dueDate: '2025-12-01',
        status: 'In Progress',
        priority: 'High'
      }
    ],
    
    hearings: [
      {
        id: 'h1',
        date: '2025-12-02',
        time: '11:00 AM',
        court: 'Family Court, Dwarka',
        judge: 'Justice Meera Sharma',
        causeListNo: 'HMA 156/2024 - Item 5'
      }
    ],
    
    activity: [
      {
        id: 'a1',
        user: 'Adv. Rajesh Kumar',
        action: 'filed',
        target: 'Divorce Petition',
        timestamp: '3 days ago',
        details: 'Filed divorce petition in family court'
      }
    ],
    
    metrics: {
      totalDrafts: 1,
      totalDocuments: 1,
      totalAnnexures: 1,
      totalHearings: 1,
      overdueTasks: 0
    }
  }
];

export function getCaseById(id: string): CaseData | undefined {
  // First try to get from backend service
  const cases = typeof window !== 'undefined' && localStorage.getItem('juris_cases');
  if (cases) {
    try {
      const parsedCases: CaseData[] = JSON.parse(cases);
      const found = parsedCases.find(c => c.id === id);
      if (found) return found;
    } catch (e) {
      console.error('Error parsing cases from localStorage:', e);
    }
  }
  
  // Fallback to mock data
  return mockCasesData.find(c => c.id === id);
}
