import { useState } from 'react';
import { Upload, FileText, CheckCircle2, Download, Sparkles, FolderOpen, Eye, X } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Checkbox } from './ui/checkbox';
import { toast } from 'sonner';

export function AutoBundleEngine() {
  const [selectedType, setSelectedType] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [generatedDocs, setGeneratedDocs] = useState<string[]>([]);
  const [showForm, setShowForm] = useState(false);

  // Form fields
  const [caseTitle, setCaseTitle] = useState('');
  const [caseType, setCaseType] = useState('');
  const [plaintiff, setPlaintiff] = useState('');
  const [defendant, setDefendant] = useState('');
  const [facts, setFacts] = useState('');
  const [reliefs, setReliefs] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  const caseTypes = [
    { id: 'civil', label: 'Civil Case', icon: '⚖️' },
    { id: 'criminal', label: 'Criminal Case', icon: '🚔' },
    { id: 'consumer', label: 'Consumer Case', icon: '🛒' },
    { id: 'family', label: 'Family Case', icon: '👨‍👩‍👧' },
    { id: 'contract', label: 'Contract Dispute', icon: '📝' }
  ];

  const bundleDocuments = [
    { id: 'plaint', label: 'Plaint / Petition', required: true },
    { id: 'affidavit', label: 'Affidavit', required: true },
    { id: 'vakalatnama', label: 'Vakalatnama', required: true },
    { id: 'synopsis', label: 'Synopsis & List of Dates', required: false },
    { id: 'annexure-index', label: 'Annexure Index', required: true },
    { id: 'court-fee', label: 'Court Fee Calculation', required: false },
    { id: 'memo', label: 'Memo of Parties', required: false },
    { id: 'verification', label: 'Verification Affidavit', required: false }
  ];

  const [selectedDocs, setSelectedDocs] = useState<string[]>(
    bundleDocuments.filter(d => d.required).map(d => d.id)
  );

  const handleSelectType = (type: string) => {
    setSelectedType(type);
    setShowForm(true);
  };

  const handleGenerate = () => {
    if (!caseTitle || !plaintiff || !defendant || !facts) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsGenerating(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsGenerating(false);
          setGeneratedDocs(selectedDocs);
          toast.success('Case bundle generated successfully!');
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const handleDownloadBundle = () => {
    toast.success('Downloading complete case bundle as ZIP...');
  };

  const handlePreview = (docId: string) => {
    toast.success(`Opening preview for ${bundleDocuments.find(d => d.id === docId)?.label}`);
  };

  if (!showForm) {
    return (
      <div className="h-full overflow-y-auto bg-gray-50">
        <div className="max-w-5xl mx-auto p-6">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h1 className="text-gray-900">Auto-Bundle Engine™</h1>
                <p className="text-gray-600">AI-powered complete case bundle generator</p>
              </div>
            </div>
          </div>

          {/* Case Type Selection */}
          <div className="bg-white rounded-2xl p-8 border border-gray-200 mb-6">
            <h2 className="text-gray-900 mb-6">Select Case Type</h2>
            <div className="grid grid-cols-2 gap-4">
              {caseTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => handleSelectType(type.id)}
                  className="p-6 border-2 border-gray-200 rounded-xl hover:border-purple-500 hover:bg-purple-50 transition-all text-left group"
                >
                  <div className="text-3xl mb-3">{type.icon}</div>
                  <h3 className="text-gray-900 mb-1">{type.label}</h3>
                  <p className="text-sm text-gray-500">Generate complete bundle for {type.label.toLowerCase()}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-gray-900 mb-2">Complete Drafts</h3>
              <p className="text-sm text-gray-600">Generate all required legal documents automatically</p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-3">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="text-gray-900 mb-2">Court-Ready</h3>
              <p className="text-sm text-gray-600">Properly formatted and ready for filing</p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
                <Sparkles className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="text-gray-900 mb-2">AI-Powered</h3>
              <p className="text-sm text-gray-600">Intelligent drafting based on case facts</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto bg-gray-50">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowForm(false)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
            <div>
              <h1 className="text-gray-900">Create {caseTypes.find(t => t.id === selectedType)?.label} Bundle</h1>
              <p className="text-gray-600">Fill in the details to generate your case bundle</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Form Section */}
          <div className="col-span-2 space-y-6">
            {/* Case Details */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h2 className="text-gray-900 mb-4">Case Details</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="caseTitle">Case Title *</Label>
                  <Input
                    id="caseTitle"
                    value={caseTitle}
                    onChange={(e) => setCaseTitle(e.target.value)}
                    placeholder="e.g., Kumar vs. State of Delhi"
                    className="mt-2"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="plaintiff">Plaintiff / Petitioner *</Label>
                    <Input
                      id="plaintiff"
                      value={plaintiff}
                      onChange={(e) => setPlaintiff(e.target.value)}
                      placeholder="Name of plaintiff"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="defendant">Defendant / Respondent *</Label>
                    <Input
                      id="defendant"
                      value={defendant}
                      onChange={(e) => setDefendant(e.target.value)}
                      placeholder="Name of defendant"
                      className="mt-2"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Facts */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h2 className="text-gray-900 mb-4">Case Facts *</h2>
              <Textarea
                value={facts}
                onChange={(e) => setFacts(e.target.value)}
                placeholder="Provide detailed facts of the case..."
                rows={8}
              />
            </div>

            {/* Reliefs */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h2 className="text-gray-900 mb-4">Reliefs Sought</h2>
              <Textarea
                value={reliefs}
                onChange={(e) => setReliefs(e.target.value)}
                placeholder="Describe the reliefs you are seeking..."
                rows={4}
              />
            </div>

            {/* Document Upload */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h2 className="text-gray-900 mb-4">Upload Supporting Documents</h2>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-purple-400 transition-colors cursor-pointer">
                <Upload className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-900 mb-2">Drag & drop files here</p>
                <p className="text-sm text-gray-500 mb-4">or click to browse</p>
                <Button variant="outline">Upload Files</Button>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Document Selection & Preview */}
          <div className="space-y-6">
            {/* Document Selection */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 sticky top-6">
              <h3 className="text-gray-900 mb-4">Documents to Generate</h3>
              <div className="space-y-3 mb-6">
                {bundleDocuments.map((doc) => (
                  <div key={doc.id} className="flex items-start gap-3">
                    <Checkbox
                      checked={selectedDocs.includes(doc.id)}
                      onCheckedChange={(checked) => {
                        if (doc.required && !checked) {
                          toast.error('This document is required');
                          return;
                        }
                        if (checked) {
                          setSelectedDocs([...selectedDocs, doc.id]);
                        } else {
                          setSelectedDocs(selectedDocs.filter(id => id !== doc.id));
                        }
                      }}
                      disabled={doc.required}
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-900">{doc.label}</span>
                        {doc.required && (
                          <Badge className="bg-red-100 text-red-700 text-xs">Required</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Generate Button */}
              {!isGenerating && generatedDocs.length === 0 && (
                <Button
                  onClick={handleGenerate}
                  className="w-full"
                  size="lg"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Generate Bundle
                </Button>
              )}

              {/* Progress */}
              {isGenerating && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Generating...</span>
                    <span className="text-gray-900">{progress}%</span>
                  </div>
                  <Progress value={progress} />
                </div>
              )}

              {/* Generated Documents */}
              {generatedDocs.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-green-600 mb-4">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Bundle Generated!</span>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    {generatedDocs.map((docId) => {
                      const doc = bundleDocuments.find(d => d.id === docId);
                      return (
                        <div key={docId} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-gray-600" />
                            <span className="text-sm text-gray-900">{doc?.label}</span>
                          </div>
                          <button
                            onClick={() => handlePreview(docId)}
                            className="p-1 hover:bg-gray-200 rounded"
                          >
                            <Eye className="w-4 h-4 text-gray-600" />
                          </button>
                        </div>
                      );
                    })}
                  </div>

                  <Button onClick={handleDownloadBundle} className="w-full" variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Download Complete Bundle
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
