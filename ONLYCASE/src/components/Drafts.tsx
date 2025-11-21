import { useState } from 'react';
import { Plus, Search, FileText, Clock } from 'lucide-react';
import { TemplateSelector } from './TemplateSelector';
import { DraftEditor } from './DraftEditor';
import { templatesJson } from '../data/templatesData';

export interface SavedDraft {
  draftId: string;
  title: string;
  body: string;
  photos: string[];
  createdAt: string;
  updatedAt: string;
  sourceTemplateId: string;
}

export function Drafts() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showTemplateSelector, setShowTemplateSelector] = useState(false);
  const [editingDraft, setEditingDraft] = useState<SavedDraft | null>(null);
  const [savedDrafts, setSavedDrafts] = useState<SavedDraft[]>([
    {
      draftId: 'draft-1',
      title: 'Bail Application',
      body: `IN THE DELHI HIGH COURT
AT NEW DELHI

Criminal Miscellaneous Case No.: CRL.M.C. 5678/2024
Year: 2024

IN THE MATTER OF:
Rajesh Kumar ...Petitioner/Applicant
VERSUS
State of Delhi ...Respondent

APPLICATION FOR BAIL
(Under Section 439 of Code of Criminal Procedure, 1973)

TO,
THE HON'BLE COURT

The humble petition of the Petitioner above named most respectfully showeth:

FACTS AND GROUNDS

1. That the Petitioner has been arrested and is in judicial custody in connection with FIR No. 234/2024 registered at Police Station Rohini for offences punishable under Section 420 IPC of the Indian Penal Code, 1860.

2. That the allegations against the Petitioner are false, fabricated and have been made with mala fide intentions. The Petitioner is innocent and has been falsely implicated in the present case.

3. That in the landmark judgment of Arnesh Kumar v. State of Bihar (2014) 8 SCC 273, the Hon'ble Supreme Court has laid down mandatory guidelines restricting arbitrary arrests in cases where the offence is punishable with imprisonment for less than 7 years.

4. That the offence under Section 420 IPC is punishable with imprisonment which may extend to 7 years, thereby making the Arnesh Kumar guidelines directly applicable to the present case.

5. That the Petitioner has deep roots in society, is a permanent resident of Rohini, Delhi, and there is no apprehension of the Petitioner fleeing from justice or tampering with evidence.

6. The petitioner is willing to cooperate with the investigation and has no previous criminal record.

PRAYER

In view of the facts and circumstances stated above, it is most humbly prayed that this Hon'ble Court may be pleased to:

a) Grant bail to the Petitioner on such terms and conditions as this Hon'ble Court may deem fit;
b) Pass any other order as this Hon'ble Court may deem fit in the interest of justice.

For this act of kindness, the Petitioner shall duty bound ever pray.

VERIFICATION

I, Rajesh Kumar, state that the facts stated above are true to my knowledge and belief.`,
      photos: [],
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
      updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      sourceTemplateId: 'bail_application'
    },
    {
      draftId: 'draft-2',
      title: 'Consumer Complaint',
      body: `BEFORE THE DISTRICT CONSUMER DISPUTES REDRESSAL COMMISSION

CONSUMER COMPLAINT NO. CC/789/2024 OF 2024
(Under Section 35 of the Consumer Protection Act, 2019)

BETWEEN:
Priya Sharma
R/o 45, Green Park, New Delhi - 110016
...Complainant

AND

TechWorld Electronics Pvt. Ltd.
R/o 123, Nehru Place, New Delhi - 110019
...Opposite Party

CONSUMER COMPLAINT FOR DEFICIENCY IN SERVICE / DEFECTIVE GOODS

TO,
THE HON'BLE PRESIDENT AND MEMBERS OF THE DISTRICT CONSUMER DISPUTES REDRESSAL COMMISSION

The humble complaint of the Complainant above-named MOST RESPECTFULLY SHOWETH:

FACTS OF THE CASE

1. That the complainant is a consumer within the meaning of Section 2(7) of the Consumer Protection Act, 2019.

2. That on 15th August 2024, the complainant purchased a laptop computer (Model: XYZ-2024) from the opposite party for a sum of Rs. 65,000.

3. That the opposite party has committed deficiency in service/provided defective goods in the following manner:

The laptop developed serious technical issues within 15 days of purchase, including frequent system crashes, overheating, and display problems. Despite multiple complaints and service requests, the opposite party failed to repair or replace the defective product.

4. That despite several requests and reminders, the opposite party has failed to redress the grievance of the complainant.

5. That the complainant has suffered mental agony, harassment and financial loss due to the unfair trade practice and deficiency in service on the part of the opposite party.

PRAYER

In the circumstances stated above, the complainant most humbly prays that this Hon'ble Forum may be pleased to:

a) Direct the opposite party to replace the defective product/provide proper service;

b) Direct the opposite party to pay compensation of Rs. 25,000 for mental agony and harassment;

c) Direct the opposite party to pay the costs of this complaint;

d) Pass any other order as this Hon'ble Forum may be pleased to do so in the interest of justice.

VERIFICATION

I, Priya Sharma, the complainant above-named, do hereby verify that the contents of the above complaint are true to my knowledge and belief and nothing material has been concealed therefrom.`,
      photos: [],
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
      updatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      sourceTemplateId: 'consumer_complaint'
    },
    {
      draftId: 'draft-3',
      title: 'Legal Notice',
      body: `LEGAL NOTICE

TO:
Mr. Vikram Singh
123, Sector 15, Noida, Uttar Pradesh - 201301

UNDER THE INSTRUCTIONS AND ON BEHALF OF:
Mr. Amit Verma
456, Lajpat Nagar, New Delhi - 110024

NOTICE

TAKE NOTICE that I am acting as Advocate for Mr. Amit Verma (hereinafter referred to as 'my client') in the matter mentioned below:

FACTS

My client entered into a business partnership agreement with you on 1st January 2023 for running a software development firm. As per the agreement, you were required to invest Rs. 10,00,000 (Rupees Ten Lakhs only) as your share of capital.

You have failed to pay your share of the capital despite repeated requests and reminders. The due date for payment was 1st March 2023, and more than a year has passed since then.

LEGAL BASIS

Your failure to honor the partnership agreement constitutes a breach of contract under the Indian Contract Act, 1872. My client has suffered significant financial losses due to your breach and is entitled to claim damages and interest.

DEMAND

My client hereby demands that you pay the outstanding amount of Rs. 10,00,000 (Rupees Ten Lakhs only) along with interest at the rate of 12% per annum from the due date within 30 days from the receipt of this notice, failing which my client shall be constrained to initiate appropriate legal proceedings against you for recovery of the said amount along with interest and costs.

CONSEQUENCES

TAKE FURTHER NOTICE that if you fail to comply with the above demand within the stipulated time, my client will be left with no alternative but to seek appropriate legal remedy available under law, and in such an event, you shall be liable for all costs and consequences thereof.

Any legal proceedings initiated will also include claims for damages, interest, and litigation costs as per law.

PLACE & DATE

Place: New Delhi
Date: 21st November 2024

Advocate for Mr. Amit Verma`,
      photos: [],
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
      updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      sourceTemplateId: 'legal_notice'
    }
  ]);

  const handleCreateNewDraft = () => {
    setShowTemplateSelector(true);
  };

  const handleDraftGenerated = (draft: SavedDraft) => {
    setSavedDrafts(prev => [draft, ...prev]);
    setShowTemplateSelector(false);
    setEditingDraft(draft);
  };

  const handleSaveDraft = (updatedDraft: SavedDraft) => {
    setSavedDrafts(prev =>
      prev.map(d => d.draftId === updatedDraft.draftId ? updatedDraft : d)
    );
  };

  const handleDeleteDraft = (draftId: string) => {
    setSavedDrafts(prev => prev.filter(d => d.draftId !== draftId));
    if (editingDraft?.draftId === draftId) {
      setEditingDraft(null);
    }
  };

  const handleOpenDraft = (draft: SavedDraft) => {
    setEditingDraft(draft);
  };

  const filteredDrafts = savedDrafts.filter(draft =>
    draft.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (hours < 48) return 'Yesterday';
    if (hours < 168) return `${Math.floor(hours / 24)} days ago`;
    return date.toLocaleDateString();
  };

  if (editingDraft) {
    return (
      <DraftEditor
        draft={editingDraft}
        onClose={() => setEditingDraft(null)}
        onSave={handleSaveDraft}
        onDelete={() => handleDeleteDraft(editingDraft.draftId)}
      />
    );
  }

  return (
    <div className="h-full overflow-y-auto bg-background">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-foreground mb-2">Draft Library</h1>
            <p className="text-muted-foreground">Manage all your legal drafts and documents</p>
          </div>
          <button 
            onClick={handleCreateNewDraft}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Create New Draft
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-card rounded-lg border border-border p-4">
            <p className="text-sm text-muted-foreground mb-1">Total Drafts</p>
            <p className="text-2xl text-foreground">{savedDrafts.length}</p>
          </div>
          <div className="bg-card rounded-lg border border-border p-4">
            <p className="text-sm text-muted-foreground mb-1">Available Templates</p>
            <p className="text-2xl text-foreground">{templatesJson.templates.length}</p>
          </div>
          <div className="bg-card rounded-lg border border-border p-4">
            <p className="text-sm text-muted-foreground mb-1">This Month</p>
            <p className="text-2xl text-foreground">
              {savedDrafts.filter(d => {
                const created = new Date(d.createdAt);
                const now = new Date();
                return created.getMonth() === now.getMonth() && 
                       created.getFullYear() === now.getFullYear();
              }).length}
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="bg-card rounded-xl border border-border p-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search drafts by title..."
              className="w-full pl-10 pr-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-foreground placeholder:text-muted-foreground"
            />
          </div>
        </div>

        {/* Drafts List */}
        {filteredDrafts.length > 0 ? (
          <div className="space-y-3">
            {filteredDrafts.map((draft) => (
              <div
                key={draft.draftId}
                className="bg-card border border-border rounded-xl p-6 hover:border-blue-500 hover:shadow-md transition-all cursor-pointer"
                onClick={() => handleOpenDraft(draft)}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-950 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-foreground mb-1">{draft.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                      {draft.body.substring(0, 150)}...
                    </p>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {formatDate(draft.updatedAt)}
                      </span>
                      {draft.photos.length > 0 && (
                        <>
                          <span>•</span>
                          <span>{draft.photos.length} photo{draft.photos.length > 1 ? 's' : ''}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-card rounded-xl border border-border p-12 text-center">
            <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-foreground mb-2">
              {searchQuery ? 'No drafts found' : 'No drafts yet'}
            </h3>
            <p className="text-muted-foreground mb-4">
              {searchQuery 
                ? 'Try adjusting your search' 
                : 'Get started by creating your first draft from a template'}
            </p>
            {!searchQuery && (
              <button 
                onClick={handleCreateNewDraft}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 inline-flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Create New Draft
              </button>
            )}
          </div>
        )}
      </div>

      {/* Template Selector Modal */}
      {showTemplateSelector && (
        <TemplateSelector
          onClose={() => setShowTemplateSelector(false)}
          onDraftGenerated={handleDraftGenerated}
        />
      )}
    </div>
  );
}