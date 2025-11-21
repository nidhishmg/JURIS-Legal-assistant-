import { useState } from 'react';
import { X, FileText, Scale, ShoppingCart, Users, FileSignature, ArrowRight } from 'lucide-react';

interface CaseBundleGeneratorProps {
  onClose: () => void;
}

type CaseType = 'civil' | 'criminal' | 'consumer' | 'family' | 'contract' | null;

export function CaseBundleGenerator({ onClose }: CaseBundleGeneratorProps) {
  const [selectedType, setSelectedType] = useState<CaseType>(null);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [step, setStep] = useState<'select' | 'form' | 'preview'>('select');

  const caseTypes = [
    {
      id: 'civil' as CaseType,
      title: 'Civil Case',
      icon: Scale,
      description: 'Civil suits, property disputes, recovery matters',
      color: 'blue'
    },
    {
      id: 'criminal' as CaseType,
      title: 'Criminal Case',
      icon: Scale,
      description: 'Bail applications, complaints, criminal petitions',
      color: 'red'
    },
    {
      id: 'consumer' as CaseType,
      title: 'Consumer Case',
      icon: ShoppingCart,
      description: 'Consumer complaints and disputes',
      color: 'green'
    },
    {
      id: 'family' as CaseType,
      title: 'Family Case',
      icon: Users,
      description: 'Divorce, custody, maintenance matters',
      color: 'purple'
    },
    {
      id: 'contract' as CaseType,
      title: 'Contract/Agreement',
      icon: FileSignature,
      description: 'Legal agreements and contracts',
      color: 'orange'
    }
  ];

  const handleTypeSelect = (type: CaseType) => {
    setSelectedType(type);
    setStep('form');
  };

  const getFormFields = (): Array<{ name: string; label: string; type: string; required: boolean }> => {
    const commonFields = [
      { name: 'petitioner', label: 'Petitioner/Plaintiff Name', type: 'text', required: true },
      { name: 'respondent', label: 'Respondent/Defendant Name', type: 'text', required: true },
      { name: 'court', label: 'Court Name', type: 'text', required: true },
    ];

    switch (selectedType) {
      case 'civil':
        return [
          ...commonFields,
          { name: 'subject', label: 'Subject Matter', type: 'text', required: true },
          { name: 'relief', label: 'Relief Sought', type: 'textarea', required: true },
          { name: 'facts', label: 'Brief Facts', type: 'textarea', required: true },
        ];
      case 'criminal':
        return [
          ...commonFields,
          { name: 'fir', label: 'FIR Number', type: 'text', required: false },
          { name: 'sections', label: 'Sections Invoked', type: 'text', required: true },
          { name: 'facts', label: 'Brief Facts', type: 'textarea', required: true },
        ];
      case 'consumer':
        return [
          ...commonFields,
          { name: 'complaint', label: 'Nature of Complaint', type: 'text', required: true },
          { name: 'deficiency', label: 'Deficiency in Service', type: 'textarea', required: true },
          { name: 'compensation', label: 'Compensation Sought', type: 'text', required: true },
        ];
      case 'family':
        return [
          ...commonFields,
          { name: 'marriageDate', label: 'Date of Marriage', type: 'date', required: true },
          { name: 'grounds', label: 'Grounds', type: 'textarea', required: true },
          { name: 'children', label: 'Details of Children (if any)', type: 'text', required: false },
        ];
      case 'contract':
        return [
          { name: 'party1', label: 'First Party Name', type: 'text', required: true },
          { name: 'party2', label: 'Second Party Name', type: 'text', required: true },
          { name: 'contractType', label: 'Type of Contract', type: 'text', required: true },
          { name: 'terms', label: 'Key Terms', type: 'textarea', required: true },
          { name: 'consideration', label: 'Consideration', type: 'text', required: true },
        ];
      default:
        return commonFields;
    }
  };

  const handleSubmit = () => {
    setStep('preview');
  };

  const generatePreview = () => {
    const type = selectedType;
    if (!type) return '';

    if (type === 'criminal') {
      return `
IN THE HIGH COURT OF DELHI AT NEW DELHI

CRIMINAL MISCELLANEOUS APPLICATION NO. ______ OF 2025

IN THE MATTER OF:

${formData.petitioner}                                    ...Petitioner
                    VERSUS
${formData.respondent}                                ...Respondent

BAIL APPLICATION UNDER SECTION 439 CR.P.C.

TO,
THE HON'BLE CHIEF JUSTICE AND HIS COMPANION JUDGES OF THE HIGH COURT OF DELHI

THE HUMBLE PETITION OF THE PETITIONER ABOVE NAMED

MOST RESPECTFULLY SHOWETH:

1. That the present petition is being filed under Section 439 of the Code of Criminal Procedure, 1973 seeking grant of regular bail to the petitioner in FIR No. ${formData.fir || '______'} registered under Sections ${formData.sections}.

2. That the brief facts of the case are as follows:
${formData.facts}

3. That the petitioner is in judicial custody since ______ and has been falsely implicated in the present case.

4. That the petitioner is ready to abide by any terms and conditions that this Hon'ble Court may deem fit to impose.

PRAYER

In the light of the facts and circumstances stated above, it is most respectfully prayed that this Hon'ble Court may be pleased to:

a) Grant regular bail to the petitioner in FIR No. ${formData.fir || '______'};
b) Pass any other order that this Hon'ble Court may deem fit and proper in the interest of justice.

AND FOR THIS ACT OF KINDNESS, THE PETITIONER SHALL DUTY BOUND FOREVER PRAY.

                                                    PETITIONER
                                                    THROUGH COUNSEL

PLACE: New Delhi
DATE: ${new Date().toLocaleDateString('en-IN')}
`;
    }

    if (type === 'civil') {
      return `
IN THE ${formData.court?.toUpperCase() || 'HIGH COURT'}

CIVIL SUIT NO. ______ OF 2025

IN THE MATTER OF:

${formData.petitioner}                                    ...Plaintiff
                    VERSUS
${formData.respondent}                                ...Defendant

PLAINT

TO,
THE HON'BLE COURT

THE HUMBLE PLAINT OF THE PLAINTIFF ABOVE NAMED

MOST RESPECTFULLY SHOWETH:

1. That the plaintiff is a resident of ______ and the defendant is a resident of ______.

2. That the subject matter of the present suit is: ${formData.subject}

3. That the facts of the case are as follows:
${formData.facts}

4. That the plaintiff has approached this Hon'ble Court seeking the following relief:
${formData.relief}

5. That the valuation of the suit for the purpose of court fees is Rs. ______.

6. That this Hon'ble Court has jurisdiction to try the present suit.

PRAYER

In view of the facts and circumstances stated above, it is most respectfully prayed that this Hon'ble Court may be pleased to:

a) ${formData.relief}
b) Award costs of the present suit;
c) Pass any other order that this Hon'ble Court may deem fit in the interest of justice.

AND FOR THIS ACT OF KINDNESS, THE PLAINTIFF SHALL DUTY BOUND FOREVER PRAY.

                                                    PLAINTIFF
                                                    THROUGH COUNSEL

PLACE: New Delhi
DATE: ${new Date().toLocaleDateString('en-IN')}
`;
    }

    return `[Preview for ${type} case will be generated here with the provided details...]`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h2 className="text-gray-900">Case Bundle Generator</h2>
            <p className="text-sm text-gray-600">
              {step === 'select' && 'Select the type of case or document'}
              {step === 'form' && 'Fill in the case details'}
              {step === 'preview' && 'Preview and download your draft'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {step === 'select' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {caseTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <button
                    key={type.id}
                    onClick={() => handleTypeSelect(type.id)}
                    className="p-6 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:shadow-lg transition-all text-left group"
                  >
                    <div className={`w-12 h-12 bg-${type.color}-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon className={`w-6 h-6 text-${type.color}-600`} />
                    </div>
                    <h3 className="text-gray-900 mb-2">{type.title}</h3>
                    <p className="text-sm text-gray-600">{type.description}</p>
                  </button>
                );
              })}
            </div>
          )}

          {step === 'form' && (
            <div className="max-w-2xl mx-auto">
              <div className="space-y-4">
                {getFormFields().map((field) => (
                  <div key={field.name}>
                    <label className="block text-sm text-gray-700 mb-2">
                      {field.label}
                      {field.required && <span className="text-red-500">*</span>}
                    </label>
                    {field.type === 'textarea' ? (
                      <textarea
                        value={formData[field.name] || ''}
                        onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={4}
                        required={field.required}
                      />
                    ) : (
                      <input
                        type={field.type}
                        value={formData[field.name] || ''}
                        onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required={field.required}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 'preview' && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-4">
                <pre className="whitespace-pre-wrap text-sm">{generatePreview()}</pre>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setStep('form')}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Edit Details
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Download as PDF
                </button>
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  Download as Word
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {step === 'form' && (
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <button
              onClick={() => setStep('select')}
              className="px-4 py-2 text-gray-600 hover:text-gray-900"
            >
              Back
            </button>
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              Generate Draft
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
