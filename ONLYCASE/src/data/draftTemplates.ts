export const DRAFT_TEMPLATES = {
  "version": "1.0",
  "description": "Minimal, production-ready templates for core legal drafts",
  "features": [
    "Plaint",
    "Complaint",
    "Affidavit",
    "Vakalatnama",
    "Bail Application",
    "164 Statement",
    "Petition",
    "Synopsis & List of Dates",
    "Annexure Index",
    "Court Fee Calculation"
  ],
  "strictSchema": true,
  "templates": [
    {
      "id": "plaint",
      "title": "Plaint/Petition",
      "description": "General civil plaint",
      "requiredInputs": [
        "CourtName",
        "SuitNumber",
        "CurrentYear",
        "PlaintiffName",
        "PlaintiffAddress",
        "DefendantName",
        "DefendantAddress",
        "CauseOfAction",
        "CauseOfActionDate",
        "FactsOfCase",
        "ClaimAmount",
        "ReliefSought",
        "Jurisdiction",
        "CourtFee"
      ],
      "template": [
        { "heading": "IN THE COURT OF [CourtName]", "content": "" },
        { "heading": "CIVIL SUIT NO. [SuitNumber] OF [CurrentYear]", "content": "" },
        { "heading": "BETWEEN:", "content": "[PlaintiffName]\nR/o [PlaintiffAddress]\n...Plaintiff\n\nAND\n\n[DefendantName]\nR/o [DefendantAddress]\n...Defendant" },
        { "heading": "PLAINT FOR [CauseOfAction]", "content": "" },
        { "heading": "STATEMENT OF FACTS", "content": "[FactsOfCase]" },
        { "heading": "CAUSE OF ACTION", "content": "Arose on [CauseOfActionDate] when [CauseOfAction]." },
        { "heading": "JURISDICTION", "content": "[Jurisdiction]" },
        { "heading": "VALUATION & COURT FEE", "content": "Claim: ₹[ClaimAmount]; Court fee paid: ₹[CourtFee]." },
        { "heading": "PRAYER", "content": "[ReliefSought]" },
        { "heading": "VERIFICATION", "content": "I, [PlaintiffName], verify the above is true to my knowledge." }
      ]
    },
    {
      "id": "affidavit",
      "title": "Affidavit",
      "description": "General court affidavit",
      "requiredInputs": [
        "CourtName",
        "CaseTitle",
        "CaseNumber",
        "DeponentName",
        "DeponentFatherName",
        "DeponentAddress",
        "DeponentRelation",
        "Facts",
        "Purpose",
        "Place",
        "Date",
        "Month",
        "Year"
      ],
      "template": [
        { "heading": "IN THE [CourtName]", "content": "[CaseTitle]\n[CaseNumber]" },
        { "heading": "AFFIDAVIT OF [DeponentName]", "content": "" },
        { "heading": "", "content": "I, [DeponentName], S/o [DeponentFatherName], R/o [DeponentAddress], do hereby solemnly affirm and state as under:" },
        { "heading": "1.", "content": "That I am [DeponentRelation] and fully conversant with the facts." },
        { "heading": "2.", "content": "That [Facts]" },
        { "heading": "3.", "content": "That this affidavit is filed for [Purpose]." },
        { "heading": "VERIFICATION", "content": "Verified at [Place] on this [Date] day of [Month], [Year].\n\nDEPONENT ([DeponentName])" }
      ]
    },
    {
      "id": "vakalatnama",
      "title": "Vakalatnama",
      "description": "Authority in favour of Advocate(s)",
      "requiredInputs": [
        "CourtName",
        "CaseTitle",
        "CaseNumber",
        "PartyName",
        "PartyAddress",
        "AdvocateNames",
        "EnrolmentNumbers",
        "PhoneEmail",
        "Date",
        "Place"
      ],
      "template": [
        { "heading": "IN THE [CourtName]", "content": "[CaseTitle]\n[CaseNumber]" },
        { "heading": "VAKALATNAMA", "content": "I/We, [PartyName], R/o [PartyAddress], appoint the following Advocate(s) to act, appear and plead on my/our behalf in the above matter:" },
        { "heading": "ADVOCATE(S)", "content": "[AdvocateNames]\nEnrolment No(s): [EnrolmentNumbers]\nContact: [PhoneEmail]" },
        { "heading": "AUTHORITY", "content": "To accept service of notices; file applications/affidavits; engage counsel; compromise; withdraw; receive copies; and do all acts necessary for conduct of the case." },
        { "heading": "ACCEPTANCE", "content": "I/We accept the Vakalatnama.\n\n(Signature of Advocate(s))" },
        { "heading": "EXECUTION", "content": "Executed at [Place] on [Date].\n\n(Signature/Thumb impression of Party)" }
      ]
    },
    {
      "id": "petition",
      "title": "Petition",
      "description": "Generic petition (adaptable to writ/civil/misc.)",
      "requiredInputs": [
        "CourtName",
        "PetitionType",
        "PetitionNumber",
        "CurrentYear",
        "PetitionerName",
        "PetitionerAddress",
        "RespondentNames",
        "Facts",
        "Grounds",
        "ReliefSought",
        "UrgencyReason"
      ],
      "template": [
        { "heading": "IN THE [CourtName]", "content": "" },
        { "heading": "[PetitionType] PETITION NO. [PetitionNumber] OF [CurrentYear]", "content": "" },
        { "heading": "PARTIES", "content": "Petitioner: [PetitionerName], R/o [PetitionerAddress]\nRespondent(s): [RespondentNames]" },
        { "heading": "FACTS", "content": "[Facts]" },
        { "heading": "GROUNDS", "content": "[Grounds]" },
        { "heading": "PRAYER", "content": "[ReliefSought]" },
        { "heading": "URGENCY", "content": "[UrgencyReason]" },
        { "heading": "VERIFICATION", "content": "I, [PetitionerName], verify the above is true to my knowledge." }
      ]
    },
    {
      "id": "annexure-index",
      "title": "Index of Annexures",
      "description": "Index of documents/exhibits filed with petition",
      "requiredInputs": [
        "CaseTitle",
        "CourtName",
        "Annexures"
      ],
      "template": [
        { "heading": "IN THE [CourtName]", "content": "[CaseTitle]" },
        { "heading": "ANNEXURE INDEX", "content": "[[Annexures]]" },
        { "heading": "NOTE", "content": "All annexures are true copies; originals will be produced as directed." }
      ]
    }
  ]
};

export function getTemplateById(id: string) {
  return DRAFT_TEMPLATES.templates.find(t => t.id === id);
}

export function getAllTemplates() {
  return DRAFT_TEMPLATES.templates;
}
