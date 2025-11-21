import { useState, useRef } from 'react';
import { X, FileText, Image as ImageIcon, Loader2 } from 'lucide-react';
import { templatesJson } from '../data/templatesData';
import { SavedDraft } from './Drafts';

interface TemplateSelectorProps {
  onClose: () => void;
  onDraftGenerated: (draft: SavedDraft) => void;
}

interface TemplateInputs {
  [key: string]: string;
}

interface TemplatePhotos {
  [key: string]: string[];
}

export function TemplateSelector({ onClose, onDraftGenerated }: TemplateSelectorProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [inputs, setInputs] = useState<TemplateInputs>({});
  const [photos, setPhotos] = useState<TemplatePhotos>({});
  const [generating, setGenerating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [currentPhotoField, setCurrentPhotoField] = useState<string | null>(null);

  const templates = templatesJson.templates.slice(0, 10);

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    setInputs({});
    setPhotos({});
  };

  const handleInputChange = (field: string, value: string) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const handleAddPhoto = (templateId: string) => {
    setCurrentPhotoField(templateId);
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0 && currentPhotoField) {
      const newPhotos: string[] = [];
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            newPhotos.push(event.target.result as string);
            if (newPhotos.length === files.length) {
              setPhotos(prev => ({
                ...prev,
                [currentPhotoField]: [...(prev[currentPhotoField] || []), ...newPhotos]
              }));
            }
          }
        };
        reader.readAsDataURL(file);
      });
    }
    e.target.value = '';
  };

  const handleRemovePhoto = (templateId: string, photoIndex: number) => {
    setPhotos(prev => ({
      ...prev,
      [templateId]: prev[templateId].filter((_, i) => i !== photoIndex)
    }));
  };

  const handleGenerateDraft = () => {
    if (!selectedTemplate) return;

    const template = templates.find(t => t.id === selectedTemplate);
    if (!template) return;

    // Check if all required inputs are filled
    const missingFields = template.requiredInputs.filter(field => !inputs[field]);
    if (missingFields.length > 0) {
      alert(`Please fill in the following required fields: ${missingFields.join(', ')}`);
      return;
    }

    setGenerating(true);

    // Generate draft body by substituting placeholders
    let body = '';
    template.template.forEach((section, index) => {
      if (section.heading) {
        body += section.heading + '\n\n';
      }
      if (section.content) {
        body += section.content + '\n\n';
      }
    });

    // Replace all placeholders with user inputs
    Object.keys(inputs).forEach(field => {
      const regex = new RegExp(`\\[${field}\\]`, 'g');
      body = body.replace(regex, inputs[field]);
    });

    // Add current year and date
    const now = new Date();
    body = body.replace(/\[CurrentYear\]/g, now.getFullYear().toString());
    body = body.replace(/\[Date\]/g, now.getDate().toString());
    body = body.replace(/\[Month\]/g, now.toLocaleString('default', { month: 'long' }));
    body = body.replace(/\[Year\]/g, now.getFullYear().toString());

    // Create draft object
    const draft: SavedDraft = {
      draftId: `draft-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      title: template.title,
      body: body,
      photos: photos[selectedTemplate] || [],
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
      sourceTemplateId: template.id
    };

    setTimeout(() => {
      setGenerating(false);
      onDraftGenerated(draft);
    }, 500);
  };

  const getFieldType = (template: any, field: string) => {
    return template.uiHints?.formFields?.[field]?.type || 'text';
  };

  const getFieldPlaceholder = (template: any, field: string) => {
    return template.uiHints?.formFields?.[field]?.placeholder || field;
  };

  const isGenerateDisabled = () => {
    if (!selectedTemplate) return true;
    const template = templates.find(t => t.id === selectedTemplate);
    if (!template) return true;
    return template.requiredInputs.some(field => !inputs[field]);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col border border-border">
        {/* Header */}
        <div className="px-6 py-4 border-b border-border flex items-center justify-between">
          <div>
            <h2 className="text-foreground">
              {selectedTemplate ? 'Fill Template Details' : 'Select a Template'}
            </h2>
            <p className="text-sm text-muted-foreground">
              {selectedTemplate 
                ? 'Fill in the required information to generate your draft' 
                : 'Choose from 10 legal document templates'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-accent rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-foreground" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {!selectedTemplate ? (
            // Template Selection Grid
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {templates.map((template) => (
                <div
                  key={template.id}
                  onClick={() => handleTemplateSelect(template.id)}
                  className="bg-accent/50 border border-border rounded-xl p-6 hover:border-blue-500 hover:shadow-lg transition-all cursor-pointer group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-950 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-blue-200 dark:group-hover:bg-blue-900 transition-colors">
                      <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-foreground mb-1">{template.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{template.description}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-xs px-2 py-1 bg-accent rounded-full text-muted-foreground">
                          {template.category}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {template.requiredInputs.length} fields
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Template Form
            <div>
              {(() => {
                const template = templates.find(t => t.id === selectedTemplate);
                if (!template) return null;

                return (
                  <div className="space-y-4">
                    {/* Back Button */}
                    <button
                      onClick={() => setSelectedTemplate(null)}
                      className="text-sm text-blue-600 hover:text-blue-700 mb-4"
                    >
                      ← Back to templates
                    </button>

                    {/* Template Info */}
                    <div className="bg-accent/50 rounded-lg p-4 mb-6">
                      <h3 className="text-foreground mb-1">{template.title}</h3>
                      <p className="text-sm text-muted-foreground">{template.description}</p>
                    </div>

                    {/* Input Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {template.requiredInputs.map((field) => {
                        const fieldType = getFieldType(template, field);
                        const placeholder = getFieldPlaceholder(template, field);

                        return (
                          <div key={field} className="space-y-2">
                            <label className="text-sm text-foreground">
                              {field} <span className="text-red-500">*</span>
                            </label>
                            {fieldType === 'textarea' ? (
                              <textarea
                                value={inputs[field] || ''}
                                onChange={(e) => handleInputChange(field, e.target.value)}
                                placeholder={placeholder}
                                rows={4}
                                className="w-full px-3 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-foreground placeholder:text-muted-foreground"
                              />
                            ) : fieldType === 'number' ? (
                              <input
                                type="number"
                                value={inputs[field] || ''}
                                onChange={(e) => handleInputChange(field, e.target.value)}
                                placeholder={placeholder}
                                className="w-full px-3 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-foreground placeholder:text-muted-foreground"
                              />
                            ) : fieldType === 'select' ? (
                              <select
                                value={inputs[field] || ''}
                                onChange={(e) => handleInputChange(field, e.target.value)}
                                className="w-full px-3 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-foreground"
                              >
                                <option value="">Select {field}</option>
                                {template.uiHints?.formFields?.[field]?.options?.map((option: string) => (
                                  <option key={option} value={option}>{option}</option>
                                ))}
                              </select>
                            ) : (
                              <input
                                type="text"
                                value={inputs[field] || ''}
                                onChange={(e) => handleInputChange(field, e.target.value)}
                                placeholder={placeholder}
                                className="w-full px-3 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-foreground placeholder:text-muted-foreground"
                              />
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Photo Upload Section */}
                    <div className="border-t border-border pt-6 mt-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h4 className="text-foreground">Attach Photos (Optional)</h4>
                          <p className="text-sm text-muted-foreground">Add supporting images or documents</p>
                        </div>
                        <button
                          onClick={() => handleAddPhoto(selectedTemplate)}
                          className="px-4 py-2 bg-accent text-foreground rounded-lg hover:bg-accent/70 flex items-center gap-2 border border-border"
                        >
                          <ImageIcon className="w-4 h-4" />
                          Add Photo
                        </button>
                      </div>

                      {/* Photo Thumbnails */}
                      {photos[selectedTemplate] && photos[selectedTemplate].length > 0 && (
                        <div className="grid grid-cols-4 gap-4">
                          {photos[selectedTemplate].map((photo, index) => (
                            <div key={index} className="relative group">
                              <img
                                src={photo}
                                alt={`Photo ${index + 1}`}
                                className="w-full h-24 object-cover rounded-lg border border-border"
                              />
                              <button
                                onClick={() => handleRemovePhoto(selectedTemplate, index)}
                                className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </div>
                );
              })()}
            </div>
          )}
        </div>

        {/* Footer */}
        {selectedTemplate && (
          <div className="px-6 py-4 border-t border-border flex items-center justify-end gap-3">
            <button
              onClick={onClose}
              className="px-6 py-2 border border-border text-foreground rounded-lg hover:bg-accent transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleGenerateDraft}
              disabled={isGenerateDisabled() || generating}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {generating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Generating...
                </>
              ) : (
                'Generate Draft'
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
