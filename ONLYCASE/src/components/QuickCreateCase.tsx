import { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { toast } from 'sonner';

interface QuickCreateCaseProps {
  onClose: () => void;
  onSuccess: (caseId: string) => void;
  defaultCaseType?: string;
}

export function QuickCreateCase({ onClose, onSuccess, defaultCaseType }: QuickCreateCaseProps) {
  const [caseTitle, setCaseTitle] = useState('');
  const [clientName, setClientName] = useState('');
  const [caseType, setCaseType] = useState(defaultCaseType || '');
  const [court, setCourt] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const handleCreate = () => {
    if (!caseTitle || !clientName || !caseType) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsCreating(true);
    toast.success('Creating case...');

    setTimeout(() => {
      const newCaseId = Date.now().toString();
      setIsCreating(false);
      toast.success('Case created successfully!');
      onSuccess(newCaseId);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-gray-900">Quick Create Case</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>
          <p className="text-sm text-gray-600 mt-2">Create a new case with basic details</p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div>
            <Label htmlFor="caseTitle">Case Title *</Label>
            <Input
              id="caseTitle"
              value={caseTitle}
              onChange={(e) => setCaseTitle(e.target.value)}
              placeholder="e.g., Kumar vs. State of Delhi"
              className="mt-2"
              autoFocus
            />
          </div>

          <div>
            <Label htmlFor="clientName">Client / Petitioner Name *</Label>
            <Input
              id="clientName"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              placeholder="Full name"
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="caseType">Case Type *</Label>
            <Select value={caseType} onValueChange={setCaseType}>
              <SelectTrigger className="mt-2" id="caseType">
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
            <Label htmlFor="court">Court / Jurisdiction</Label>
            <Input
              id="court"
              value={court}
              onChange={(e) => setCourt(e.target.value)}
              placeholder="e.g., Delhi High Court (optional)"
              className="mt-2"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50 flex gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1"
            disabled={isCreating}
          >
            Cancel
          </Button>
          <Button
            onClick={handleCreate}
            className="flex-1"
            disabled={isCreating}
          >
            {isCreating ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Creating...
              </>
            ) : (
              'Create Case'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
