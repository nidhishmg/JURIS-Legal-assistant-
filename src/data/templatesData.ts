export const templatesJson = {
  "version": "1.0",
  "generated_at": "2025-11-21",
  "description": "Complete collection of all 10 legal document templates for JurisThis/KanoonEdge Draft Generator",
  "total_templates": 10,
  "categories": [
    "Court Petitions",
    "Civil Litigation",
    "Consumer Protection",
    "Court Documents",
    "Criminal Law",
    "Contracts",
    "Notices",
    "Public Interest",
    "Constitutional Remedies"
  ],
  "templates": [
    {
      "id": "bail_application",
      "category": "Court Petitions",
      "title": "Bail Application",
      "description": "Regular/anticipatory/interim bail application template",
      "requiredInputs": [
        "CourtName",
        "CaseNumber",
        "PetitionerName",
        "AccusedName",
        "FIRNumber",
        "PoliceStation",
        "OffenceSections",
        "Facts",
        "Grounds",
        "ResidenceAddress",
        "MaxPunishment",
        "Prayer"
      ],
      "template": [
        {
          "heading": "IN THE [CourtName]",
          "content": "AT [CourtLocation]"
        },
        {
          "heading": "Criminal Miscellaneous Case No.: [CaseNumber]",
          "content": "Year: [CurrentYear]"
        },
        {
          "heading": "IN THE MATTER OF:",
          "content": "[PetitionerName] ...Petitioner/Applicant\nVERSUS\nState of [StateName] ...Respondent"
        },
        {
          "heading": "APPLICATION FOR BAIL",
          "content": "(Under Section 439 of Code of Criminal Procedure, 1973)"
        },
        {
          "heading": "TO,\nTHE HON'BLE COURT",
          "content": "The humble petition of the Petitioner above named most respectfully showeth:"
        },
        {
          "heading": "FACTS AND GROUNDS",
          "content": "1. That the Petitioner has been arrested and is in judicial custody in connection with FIR No. [FIRNumber] registered at Police Station [PoliceStation] for offences punishable under [OffenceSections] of the Indian Penal Code, 1860.\n\n2. That the allegations against the Petitioner are false, fabricated and have been made with mala fide intentions. The Petitioner is innocent and has been falsely implicated in the present case.\n\n3. That in the landmark judgment of Arnesh Kumar v. State of Bihar (2014) 8 SCC 273, the Hon'ble Supreme Court has laid down mandatory guidelines restricting arbitrary arrests in cases where the offence is punishable with imprisonment for less than 7 years.\n\n4. That the offence under [OffenceSections] is punishable with imprisonment which may extend to [MaxPunishment] years, thereby making the Arnesh Kumar guidelines directly applicable to the present case.\n\n5. That the Petitioner has deep roots in society, is a permanent resident of [ResidenceAddress], and there is no apprehension of the Petitioner fleeing from justice or tampering with evidence.\n\n6. [Grounds]"
        },
        {
          "heading": "PRAYER",
          "content": "In view of the facts and circumstances stated above, it is most humbly prayed that this Hon'ble Court may be pleased to:\n\na) Grant bail to the Petitioner on such terms and conditions as this Hon'ble Court may deem fit;\nb) Pass any other order as this Hon'ble Court may deem fit in the interest of justice.\n\nFor this act of kindness, the Petitioner shall duty bound ever pray."
        },
        {
          "heading": "VERIFICATION",
          "content": "I, [PetitionerName], state that the facts stated above are true to my knowledge and belief."
        }
      ],
      "uiHints": {
        "formFields": {
          "OffenceSections": {
            "type": "tags",
            "placeholder": "Section numbers (e.g., 420 IPC, 138 NI Act)",
            "validation": "required"
          },
          "Facts": {
            "type": "textarea",
            "maxChars": 3000,
            "placeholder": "Brief facts of the case..."
          },
          "Grounds": {
            "type": "textarea",
            "maxChars": 2000,
            "placeholder": "Legal grounds for bail..."
          },
          "CourtName": {
            "type": "text",
            "placeholder": "e.g., Delhi High Court",
            "validation": "required"
          },
          "CaseNumber": {
            "type": "text",
            "placeholder": "e.g., CRL.M.C. 1234/2024",
            "validation": "required"
          }
        }
      }
    },
    {
      "id": "civil_suit",
      "category": "Civil Litigation",
      "title": "Civil Suit / Plaint",
      "description": "General civil suit plaint template",
      "requiredInputs": [
        "CourtName",
        "SuitNumber",
        "PlaintiffName",
        "PlaintiffAddress",
        "DefendantName",
        "DefendantAddress",
        "CauseOfAction",
        "FactsOfCase",
        "ClaimAmount",
        "ReliefSought",
        "Jurisdiction"
      ],
      "template": [
        {
          "heading": "IN THE COURT OF [CourtName]",
          "content": ""
        },
        {
          "heading": "CIVIL SUIT NO. [SuitNumber] OF [CurrentYear]",
          "content": ""
        },
        {
          "heading": "BETWEEN:",
          "content": "[PlaintiffName]\nS/o [PlaintiffFatherName]\nR/o [PlaintiffAddress]\n...Plaintiff\n\nAND\n\n[DefendantName]\nS/o [DefendantFatherName]\nR/o [DefendantAddress]\n...Defendant"
        },
        {
          "heading": "PLAINT FOR [CauseOfAction]",
          "content": ""
        },
        {
          "heading": "TO,\nTHE HONOURABLE COURT",
          "content": "The plaintiff above-named most respectfully states as follows:"
        },
        {
          "heading": "FACTS OF THE CASE",
          "content": "[FactsOfCase]"
        },
        {
          "heading": "CAUSE OF ACTION",
          "content": "The cause of action for the present suit arose on [CauseOfActionDate] when [CauseOfAction]. The cause of action is continuing."
        },
        {
          "heading": "JURISDICTION",
          "content": "This Hon'ble Court has jurisdiction to try and decide the present suit because [Jurisdiction]."
        },
        {
          "heading": "VALUATION AND COURT FEES",
          "content": "The plaintiff claims a sum of Rs. [ClaimAmount] and the court fee of Rs. [CourtFee] has been paid as per the provisions of the Court Fees Act."
        },
        {
          "heading": "PRAYER",
          "content": "In the premises aforesaid, the plaintiff most respectfully prays that this Hon'ble Court may be pleased to:\n\na) [ReliefSought];\n\nb) Award costs of the suit;\n\nc) Pass any other order or direction as this Hon'ble Court may deem fit in the circumstances of the case and in the interest of justice."
        },
        {
          "heading": "VERIFICATION",
          "content": "I, [PlaintiffName], the plaintiff above-named, do hereby verify that the contents of paragraphs 1 to [LastParagraph] of the above plaint are true to my knowledge and belief and nothing material has been concealed therefrom."
        }
      ],
      "uiHints": {
        "formFields": {
          "FactsOfCase": {
            "type": "textarea",
            "maxChars": 4000,
            "placeholder": "Detailed facts giving rise to the civil suit..."
          },
          "ReliefSought": {
            "type": "textarea",
            "maxChars": 1000,
            "placeholder": "Specific relief sought from the court..."
          },
          "ClaimAmount": {
            "type": "number",
            "placeholder": "Claim amount in rupees",
            "validation": "required"
          }
        }
      }
    },
    {
      "id": "consumer_complaint",
      "category": "Consumer Protection",
      "title": "Consumer Complaint",
      "description": "Consumer complaint under Consumer Protection Act",
      "requiredInputs": [
        "ForumName",
        "ComplaintNumber",
        "ComplainantName",
        "ComplainantAddress",
        "OppositePartyName",
        "OppositePartyAddress",
        "PurchaseDate",
        "ProductService",
        "Amount",
        "Deficiency",
        "CompensationSought"
      ],
      "template": [
        {
          "heading": "BEFORE THE [ForumName]",
          "content": ""
        },
        {
          "heading": "CONSUMER COMPLAINT NO. [ComplaintNumber] OF [CurrentYear]",
          "content": "(Under Section 35 of the Consumer Protection Act, 2019)"
        },
        {
          "heading": "BETWEEN:",
          "content": "[ComplainantName]\nR/o [ComplainantAddress]\n...Complainant\n\nAND\n\n[OppositePartyName]\nR/o [OppositePartyAddress]\n...Opposite Party"
        },
        {
          "heading": "CONSUMER COMPLAINT FOR DEFICIENCY IN SERVICE / DEFECTIVE GOODS",
          "content": ""
        },
        {
          "heading": "TO,\nTHE HON'BLE PRESIDENT AND MEMBERS OF THE [ForumName]",
          "content": "The humble complaint of the Complainant above-named MOST RESPECTFULLY SHOWETH:"
        },
        {
          "heading": "FACTS OF THE CASE",
          "content": "1. That the complainant is a consumer within the meaning of Section 2(7) of the Consumer Protection Act, 2019.\n\n2. That on [PurchaseDate], the complainant purchased [ProductService] from the opposite party for a sum of Rs. [Amount].\n\n3. That the opposite party has committed deficiency in service/provided defective goods in the following manner:\n\n[Deficiency]\n\n4. That despite several requests and reminders, the opposite party has failed to redress the grievance of the complainant.\n\n5. That the complainant has suffered mental agony, harassment and financial loss due to the unfair trade practice and deficiency in service on the part of the opposite party."
        },
        {
          "heading": "PRAYER",
          "content": "In the circumstances stated above, the complainant most humbly prays that this Hon'ble Forum may be pleased to:\n\na) Direct the opposite party to replace the defective product/provide proper service;\n\nb) Direct the opposite party to pay compensation of Rs. [CompensationSought] for mental agony and harassment;\n\nc) Direct the opposite party to pay the costs of this complaint;\n\nd) Pass any other order as this Hon'ble Forum may be pleased to do so in the interest of justice."
        },
        {
          "heading": "VERIFICATION",
          "content": "I, [ComplainantName], the complainant above-named, do hereby verify that the contents of the above complaint are true to my knowledge and belief and nothing material has been concealed therefrom."
        }
      ],
      "uiHints": {
        "formFields": {
          "ForumName": {
            "type": "select",
            "options": [
              "District Consumer Disputes Redressal Commission",
              "State Consumer Disputes Redressal Commission",
              "National Consumer Disputes Redressal Commission"
            ],
            "validation": "required"
          },
          "Deficiency": {
            "type": "textarea",
            "maxChars": 2000,
            "placeholder": "Describe the deficiency in service or defective goods..."
          },
          "Amount": {
            "type": "number",
            "placeholder": "Purchase amount",
            "validation": "required"
          },
          "CompensationSought": {
            "type": "number",
            "placeholder": "Compensation amount sought"
          }
        }
      }
    },
    {
      "id": "court_affidavit",
      "category": "Court Documents",
      "title": "General Court Affidavit",
      "description": "General purpose court affidavit template",
      "requiredInputs": [
        "CourtName",
        "CaseTitle",
        "CaseNumber",
        "DeponentName",
        "DeponentAddress",
        "DeponentRelation",
        "Facts",
        "Purpose",
        "Place"
      ],
      "template": [
        {
          "heading": "IN THE [CourtName]",
          "content": ""
        },
        {
          "heading": "[CaseTitle]",
          "content": ""
        },
        {
          "heading": "[CaseNumber]",
          "content": ""
        },
        {
          "heading": "AFFIDAVIT OF [DeponentName]",
          "content": ""
        },
        {
          "heading": "I, [DeponentName], S/o [DeponentFatherName], R/o [DeponentAddress], do hereby solemnly affirm and state on oath as under:",
          "content": ""
        },
        {
          "heading": "1.",
          "content": "That I am [DeponentRelation] in the above-mentioned matter and am fully conversant with the facts and circumstances of the case. I am competent to swear this affidavit."
        },
        {
          "heading": "2.",
          "content": "That the facts stated herein are true to my knowledge and belief derived from records and no part of it is false and nothing material has been concealed therefrom."
        },
        {
          "heading": "3.",
          "content": "That [Facts]"
        },
        {
          "heading": "4.",
          "content": "That I am filing this affidavit for the purpose of [Purpose]"
        },
        {
          "heading": "5.",
          "content": "That I have not filed any other affidavit in any other Court or authority in respect of the same cause of action."
        },
        {
          "heading": "VERIFICATION",
          "content": "I, [DeponentName], the deponent above-named, do hereby verify that the contents of paragraphs 1 to 5 of my above affidavit are correct and true to my knowledge and belief, no part of it is false and nothing material has been concealed therefrom.\n\nVerified at [Place] on this [Date] day of [Month], [Year]."
        },
        {
          "heading": "",
          "content": "\n\nDEPONENT\n([DeponentName])"
        }
      ],
      "uiHints": {
        "formFields": {
          "DeponentRelation": {
            "type": "text",
            "placeholder": "e.g., the petitioner, witness, advocate for petitioner",
            "validation": "required"
          },
          "Facts": {
            "type": "textarea",
            "maxChars": 2000,
            "placeholder": "State the relevant facts to be sworn to..."
          },
          "Purpose": {
            "type": "textarea",
            "maxChars": 500,
            "placeholder": "Purpose for which this affidavit is being filed..."
          }
        }
      }
    },
    {
      "id": "criminal_complaint",
      "category": "Criminal Law",
      "title": "Criminal Complaint",
      "description": "Private criminal complaint template",
      "requiredInputs": [
        "CourtName",
        "ComplaintNumber",
        "ComplainantName",
        "ComplainantAddress",
        "AccusedName",
        "AccusedAddress",
        "DateOfOffence",
        "PlaceOfOffence",
        "OffenceSections",
        "FactsOfCase",
        "Evidence"
      ],
      "template": [
        {
          "heading": "IN THE COURT OF [CourtName]",
          "content": ""
        },
        {
          "heading": "CRIMINAL COMPLAINT NO. [ComplaintNumber] OF [CurrentYear]",
          "content": "(Under Section 200 of the Code of Criminal Procedure, 1973)"
        },
        {
          "heading": "BETWEEN:",
          "content": "[ComplainantName]\nS/o [ComplainantFatherName]\nR/o [ComplainantAddress]\n...Complainant\n\nAND\n\n[AccusedName]\nS/o [AccusedFatherName]\nR/o [AccusedAddress]\n...Accused"
        },
        {
          "heading": "COMPLAINT FOR OFFENCES PUNISHABLE UNDER [OffenceSections]",
          "content": ""
        },
        {
          "heading": "TO,\nTHE HONOURABLE MAGISTRATE",
          "content": "The complainant above-named most respectfully states on oath as follows:"
        },
        {
          "heading": "FACTS OF THE CASE",
          "content": "1. That the complainant is a law-abiding citizen and has never been involved in any criminal case.\n\n2. That on [DateOfOffence] at [PlaceOfOffence], the accused committed the following offences:\n\n[FactsOfCase]\n\n3. That by the aforesaid acts, the accused has committed offences punishable under [OffenceSections] of the Indian Penal Code, 1860.\n\n4. That the complainant has sufficient evidence to prove the guilt of the accused."
        },
        {
          "heading": "EVIDENCE",
          "content": "The complainant relies upon the following evidence:\n\n[Evidence]"
        },
        {
          "heading": "JURISDICTION",
          "content": "This Hon'ble Court has jurisdiction to try the present complaint as the offence was committed within the local limits of this Court's jurisdiction."
        },
        {
          "heading": "PRAYER",
          "content": "In the premises stated above, the complainant most humbly prays that this Hon'ble Court may be pleased to:\n\na) Take cognizance of the offences committed by the accused;\n\nb) Issue process against the accused;\n\nc) Try and punish the accused according to law;\n\nd) Pass any other order as this Hon'ble Court may deem fit in the interest of justice."
        },
        {
          "heading": "VERIFICATION",
          "content": "I, [ComplainantName], the complainant above-named, do hereby verify on oath that the contents of paragraphs 1 to [LastParagraph] of the above complaint are true to my knowledge and belief and nothing material has been concealed therefrom."
        }
      ],
      "uiHints": {
        "formFields": {
          "OffenceSections": {
            "type": "tags",
            "placeholder": "e.g., 406, 420 IPC",
            "validation": "required"
          },
          "FactsOfCase": {
            "type": "textarea",
            "maxChars": 3000,
            "placeholder": "Detailed facts showing how the offence was committed..."
          },
          "Evidence": {
            "type": "textarea",
            "maxChars": 1500,
            "placeholder": "List of documents, witnesses and other evidence..."
          }
        }
      }
    },
    {
      "id": "employment_contract",
      "category": "Contracts",
      "title": "Employment Contract",
      "description": "Basic employment agreement template",
      "requiredInputs": [
        "CompanyName",
        "CompanyAddress",
        "EmployeeName",
        "EmployeeAddress",
        "Position",
        "StartDate",
        "Salary",
        "WorkingHours",
        "Probation",
        "NoticePeriod"
      ],
      "template": [
        {
          "heading": "EMPLOYMENT AGREEMENT",
          "content": ""
        },
        {
          "heading": "BETWEEN:",
          "content": "[CompanyName]\nHaving its registered office at [CompanyAddress]\n(Hereinafter referred to as 'the Company')\n\nAND\n\n[EmployeeName]\nR/o [EmployeeAddress]\n(Hereinafter referred to as 'the Employee')"
        },
        {
          "heading": "RECITALS",
          "content": "WHEREAS the Company desires to employ the Employee and the Employee desires to be employed by the Company on the terms and conditions hereinafter set forth;"
        },
        {
          "heading": "NOW THEREFORE, in consideration of the mutual covenants contained herein, the parties agree as follows:",
          "content": ""
        },
        {
          "heading": "1. EMPLOYMENT",
          "content": "The Company hereby employs the Employee as [Position] and the Employee hereby accepts such employment subject to the terms and conditions of this Agreement."
        },
        {
          "heading": "2. COMMENCEMENT AND DURATION",
          "content": "The employment shall commence on [StartDate] and shall continue until terminated in accordance with the provisions of this Agreement."
        },
        {
          "heading": "3. PROBATION PERIOD",
          "content": "The Employee shall be on probation for a period of [Probation] months from the date of joining. During this period, either party may terminate this Agreement by giving one month's written notice."
        },
        {
          "heading": "4. SALARY AND BENEFITS",
          "content": "The Company shall pay the Employee a monthly salary of Rs. [Salary] plus such benefits as may be applicable according to Company policy."
        },
        {
          "heading": "5. WORKING HOURS",
          "content": "The normal working hours shall be [WorkingHours] hours per day, Monday to Friday, or as may be required by the Company from time to time."
        },
        {
          "heading": "6. DUTIES AND RESPONSIBILITIES",
          "content": "The Employee shall perform such duties as may be assigned by the Company from time to time and shall devote his/her full time and attention to the business of the Company."
        },
        {
          "heading": "7. CONFIDENTIALITY",
          "content": "The Employee shall not disclose any confidential information of the Company to any third party during or after the termination of employment."
        },
        {
          "heading": "8. TERMINATION",
          "content": "After the probation period, either party may terminate this Agreement by giving [NoticePeriod] months' written notice or payment in lieu thereof."
        },
        {
          "heading": "9. GOVERNING LAW",
          "content": "This Agreement shall be governed by the laws of India and any disputes shall be subject to the jurisdiction of courts at [CompanyLocation]."
        },
        {
          "heading": "IN WITNESS WHEREOF, the parties have executed this Agreement on the date first written above.",
          "content": "\nFOR [CompanyName]:\n\n\nAuthorized Signatory\n\n\nEMPLOYEE:\n\n\n[EmployeeName]"
        }
      ],
      "uiHints": {
        "formFields": {
          "Salary": {
            "type": "number",
            "placeholder": "Monthly salary amount",
            "validation": "required"
          },
          "WorkingHours": {
            "type": "number",
            "placeholder": "8",
            "validation": "required"
          },
          "Probation": {
            "type": "number",
            "placeholder": "6",
            "validation": "required"
          },
          "NoticePeriod": {
            "type": "number",
            "placeholder": "3",
            "validation": "required"
          }
        }
      }
    },
    {
      "id": "legal_notice",
      "category": "Notices",
      "title": "Legal Notice",
      "description": "Legal notice for breach of contract, cheque bounce, etc.",
      "requiredInputs": [
        "ClientName",
        "ClientAddress",
        "NoticeeeName",
        "NoticeeAddress",
        "IssueDate",
        "BriefFacts",
        "LegalBasis",
        "Demand",
        "TimeLimit",
        "Consequences"
      ],
      "template": [
        {
          "heading": "LEGAL NOTICE",
          "content": ""
        },
        {
          "heading": "TO:",
          "content": "[NoticeeeName]\n[NoticeeAddress]"
        },
        {
          "heading": "UNDER THE INSTRUCTIONS AND ON BEHALF OF:",
          "content": "[ClientName]\n[ClientAddress]"
        },
        {
          "heading": "NOTICE",
          "content": "TAKE NOTICE that I am acting as Advocate for [ClientName] (hereinafter referred to as 'my client') in the matter mentioned below:"
        },
        {
          "heading": "FACTS",
          "content": "[BriefFacts]"
        },
        {
          "heading": "LEGAL BASIS",
          "content": "[LegalBasis]"
        },
        {
          "heading": "DEMAND",
          "content": "My client hereby demands that you [Demand] within [TimeLimit] days from the receipt of this notice, failing which my client shall be constrained to initiate appropriate legal proceedings against you for recovery of the said amount along with interest and costs."
        },
        {
          "heading": "CONSEQUENCES",
          "content": "TAKE FURTHER NOTICE that if you fail to comply with the above demand within the stipulated time, my client will be left with no alternative but to seek appropriate legal remedy available under law, and in such an event, you shall be liable for all costs and consequences thereof.\n\n[Consequences]"
        },
        {
          "heading": "PLACE & DATE",
          "content": "Place: [Place]\nDate: [IssueDate]"
        },
        {
          "heading": "",
          "content": "Advocate for [ClientName]"
        }
      ],
      "uiHints": {
        "formFields": {
          "BriefFacts": {
            "type": "textarea",
            "maxChars": 2000,
            "placeholder": "Describe the facts that give rise to this notice..."
          },
          "LegalBasis": {
            "type": "textarea",
            "maxChars": 1000,
            "placeholder": "Legal provisions and grounds..."
          },
          "Demand": {
            "type": "textarea",
            "maxChars": 500,
            "placeholder": "What is being demanded from the noticee..."
          },
          "TimeLimit": {
            "type": "number",
            "placeholder": "30",
            "validation": "required"
          }
        }
      }
    },
    {
      "id": "nda_agreement",
      "category": "Contracts",
      "title": "Non-Disclosure Agreement (NDA)",
      "description": "Mutual/Unilateral non-disclosure agreement",
      "requiredInputs": [
        "Party1Name",
        "Party1Address",
        "Party2Name",
        "Party2Address",
        "NDAType",
        "Purpose",
        "Duration",
        "EffectiveDate"
      ],
      "template": [
        {
          "heading": "NON-DISCLOSURE AGREEMENT",
          "content": ""
        },
        {
          "heading": "THIS AGREEMENT is entered into on [EffectiveDate]",
          "content": ""
        },
        {
          "heading": "BETWEEN:",
          "content": "[Party1Name]\nHaving its registered office at [Party1Address]\n(Hereinafter referred to as 'Party 1' or 'Disclosing Party')\n\nAND\n\n[Party2Name]\nHaving its registered office at [Party2Address]\n(Hereinafter referred to as 'Party 2' or 'Receiving Party')"
        },
        {
          "heading": "RECITALS",
          "content": "WHEREAS the parties wish to explore [Purpose] and in connection therewith, it may be necessary for the parties to disclose certain confidential and proprietary information to each other;"
        },
        {
          "heading": "NOW THEREFORE, in consideration of the mutual covenants contained herein, the parties agree as follows:",
          "content": ""
        },
        {
          "heading": "1. DEFINITION OF CONFIDENTIAL INFORMATION",
          "content": "For purposes of this Agreement, 'Confidential Information' shall mean any and all non-public, proprietary or confidential information disclosed by either party to the other, whether orally, in writing, or in any other form."
        },
        {
          "heading": "2. OBLIGATIONS OF RECEIVING PARTY",
          "content": "The Receiving Party agrees to:\na) Hold all Confidential Information in strict confidence;\nb) Not disclose Confidential Information to any third party without prior written consent;\nc) Use Confidential Information solely for the purpose of [Purpose];\nd) Protect Confidential Information with the same degree of care as it protects its own confidential information."
        },
        {
          "heading": "3. EXCEPTIONS",
          "content": "The obligations set forth in this Agreement shall not apply to information that:\na) Is or becomes publicly available through no breach of this Agreement;\nb) Is already known to the Receiving Party prior to disclosure;\nc) Is independently developed without use of Confidential Information;\nd) Is required to be disclosed by law or court order."
        },
        {
          "heading": "4. RETURN OF INFORMATION",
          "content": "Upon termination of discussions or upon request, the Receiving Party shall return or destroy all documents and materials containing Confidential Information."
        },
        {
          "heading": "5. DURATION",
          "content": "This Agreement shall remain in effect for a period of [Duration] years from the date hereof, unless terminated earlier by mutual consent."
        },
        {
          "heading": "6. REMEDIES",
          "content": "The Receiving Party acknowledges that any breach of this Agreement may cause irreparable harm to the Disclosing Party and agrees that the Disclosing Party shall be entitled to seek injunctive relief."
        },
        {
          "heading": "7. GOVERNING LAW",
          "content": "This Agreement shall be governed by the laws of India and any disputes shall be subject to the jurisdiction of courts at [JurisdictionPlace]."
        },
        {
          "heading": "IN WITNESS WHEREOF, the parties have executed this Agreement on the date first written above.",
          "content": "\n[Party1Name]:\n\n\nBy: ________________________\nName:\nTitle:\nDate:\n\n[Party2Name]:\n\n\nBy: ________________________\nName:\nTitle:\nDate:"
        }
      ],
      "uiHints": {
        "formFields": {
          "NDAType": {
            "type": "select",
            "options": ["Mutual", "Unilateral"],
            "validation": "required"
          },
          "Purpose": {
            "type": "textarea",
            "maxChars": 500,
            "placeholder": "Purpose of information sharing (e.g., potential business collaboration)"
          },
          "Duration": {
            "type": "number",
            "placeholder": "5",
            "validation": "required"
          }
        }
      }
    },
    {
      "id": "pil_petition",
      "category": "Public Interest",
      "title": "Public Interest Litigation (PIL)",
      "description": "PIL petition for public interest matters",
      "requiredInputs": [
        "CourtName",
        "PILNumber",
        "PetitionerName",
        "PetitionerAddress",
        "PublicIssue",
        "FactsAndCircumstances",
        "LegalProvisions",
        "PublicInterest",
        "ReliefSought"
      ],
      "template": [
        {
          "heading": "IN THE [CourtName]",
          "content": ""
        },
        {
          "heading": "WRIT PETITION (CIVIL) NO. [PILNumber] OF [CurrentYear]",
          "content": "(PUBLIC INTEREST LITIGATION UNDER ARTICLE 226 OF THE CONSTITUTION OF INDIA)"
        },
        {
          "heading": "IN THE MATTER OF:",
          "content": "[PetitionerName]\nR/o [PetitionerAddress]\n...Petitioner\n\nVERSUS\n\nUnion of India & Others\n...Respondents"
        },
        {
          "heading": "PUBLIC INTEREST LITIGATION FOR [PublicIssue]",
          "content": ""
        },
        {
          "heading": "TO,\nTHE HON'BLE CHIEF JUSTICE AND HIS COMPANION JUSTICES",
          "content": "The humble petition of the Petitioner above-named MOST RESPECTFULLY SHOWETH:"
        },
        {
          "heading": "NATURE OF THE PETITION",
          "content": "This is a Public Interest Litigation filed in the larger public interest concerning [PublicIssue] affecting a large section of society."
        },
        {
          "heading": "FACTS AND CIRCUMSTANCES",
          "content": "[FactsAndCircumstances]"
        },
        {
          "heading": "LEGAL PROVISIONS VIOLATED",
          "content": "The following constitutional and legal provisions are being violated:\n\n[LegalProvisions]"
        },
        {
          "heading": "PUBLIC INTEREST INVOLVED",
          "content": "The present petition involves larger public interest because:\n\n[PublicInterest]"
        },
        {
          "heading": "LOCUS STANDI",
          "content": "The petitioner has sufficient interest in the matter and is filing this petition in the larger public interest as recognized by the Hon'ble Supreme Court in various judgments including S.P. Gupta v. Union of India (1981) Supp. SCC 87."
        },
        {
          "heading": "PRAYER",
          "content": "In the premises aforesaid, the petitioner most humbly prays that this Hon'ble Court may be pleased to:\n\na) [ReliefSought];\n\nb) Issue appropriate directions to the respondents;\n\nc) Pass any other order or direction as this Hon'ble Court may deem fit in the larger public interest."
        },
        {
          "heading": "VERIFICATION",
          "content": "I, [PetitionerName], the petitioner above-named, do hereby verify that the contents of the above petition are true to my knowledge and belief based on legal advice and nothing material has been concealed therefrom."
        }
      ],
      "uiHints": {
        "formFields": {
          "PublicIssue": {
            "type": "text",
            "placeholder": "e.g., Environmental Protection, Right to Education",
            "validation": "required"
          },
          "FactsAndCircumstances": {
            "type": "textarea",
            "maxChars": 3000,
            "placeholder": "Detailed facts showing the public issue..."
          },
          "LegalProvisions": {
            "type": "textarea",
            "maxChars": 1500,
            "placeholder": "Constitutional articles and legal provisions being violated..."
          },
          "PublicInterest": {
            "type": "textarea",
            "maxChars": 1000,
            "placeholder": "How this matter affects public interest..."
          }
        }
      }
    },
    {
      "id": "writ_petition",
      "category": "Constitutional Remedies",
      "title": "Writ Petition",
      "description": "Habeas Corpus, Mandamus, Certiorari writ petition template",
      "requiredInputs": [
        "CourtName",
        "PetitionNumber",
        "PetitionerName",
        "PetitionerAddress",
        "RespondentNames",
        "WritType",
        "Facts",
        "Grounds",
        "ReliefSought",
        "UrgencyReason"
      ],
      "template": [
        {
          "heading": "IN THE [CourtName]",
          "content": ""
        },
        {
          "heading": "WRIT PETITION NO. [PetitionNumber] OF [CurrentYear]",
          "content": "(Under Article 226 of the Constitution of India)"
        },
        {
          "heading": "IN THE MATTER OF:",
          "content": "[PetitionerName]\nR/o [PetitionerAddress]\n...Petitioner\n\nVERSUS\n\n[RespondentNames]\n...Respondents"
        },
        {
          "heading": "WRIT PETITION FOR ISSUANCE OF WRIT OF [WritType]",
          "content": ""
        },
        {
          "heading": "TO,\nTHE HON'BLE CHIEF JUSTICE AND HIS COMPANION JUSTICES OF THE [CourtName]",
          "content": "The humble petition of the Petitioner above-named MOST RESPECTFULLY SHOWETH:"
        },
        {
          "heading": "FACTS",
          "content": "[Facts]"
        },
        {
          "heading": "GROUNDS",
          "content": "The Petitioner respectfully submits that this Hon'ble Court should issue a writ of [WritType] on the following grounds:\n\n[Grounds]"
        },
        {
          "heading": "PRAYER",
          "content": "In the premises aforesaid, the Petitioner most respectfully prays that this Hon'ble Court may be pleased to:\n\na) Issue a writ of [WritType] or any other appropriate writ, order or direction [ReliefSought];\n\nb) Pass any other order or direction as this Hon'ble Court may deem fit and proper in the circumstances of the case and in the interest of justice."
        },
        {
          "heading": "URGENCY",
          "content": "The present petition is being filed on an urgent basis because [UrgencyReason]."
        },
        {
          "heading": "VERIFICATION",
          "content": "I, [PetitionerName], the Petitioner above-named, do hereby solemnly affirm and state that the contents of the above petition are true to my knowledge and belief and nothing material has been concealed therefrom."
        }
      ],
      "uiHints": {
        "formFields": {
          "WritType": {
            "type": "select",
            "options": ["HABEAS CORPUS", "MANDAMUS", "CERTIORARI", "PROHIBITION", "QUO WARRANTO"],
            "validation": "required"
          },
          "Facts": {
            "type": "textarea",
            "maxChars": 3000,
            "placeholder": "Detailed facts of the case..."
          },
          "Grounds": {
            "type": "textarea",
            "maxChars": 2000,
            "placeholder": "Legal grounds for the writ petition..."
          }
        }
      }
    }
  ]
};
