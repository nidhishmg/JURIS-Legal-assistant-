import { CheckCircle2, FolderOpen, FileText, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';

interface CaseCreatedSuccessProps {
  caseId: string;
  caseTitle: string;
  onOpenWorkspace: () => void;
  onReturnToCases: () => void;
  onGenerateDrafts: () => void;
}

export function CaseCreatedSuccess({
  caseId,
  caseTitle,
  onOpenWorkspace,
  onReturnToCases,
  onGenerateDrafts
}: CaseCreatedSuccessProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
        <div className="p-8 text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-12 h-12 text-green-600" />
          </div>

          {/* Title */}
          <h2 className="text-gray-900 mb-2">Case Created Successfully!</h2>
          <p className="text-gray-600 mb-6">
            Your new case has been created and is ready to use
          </p>

          {/* Case Info */}
          <div className="bg-gray-50 rounded-xl p-6 mb-6 text-left">
            <div className="flex items-start gap-3">
              <FolderOpen className="w-5 h-5 text-blue-600 mt-1" />
              <div className="flex-1">
                <p className="text-sm text-gray-500 mb-1">Case Title</p>
                <p className="text-gray-900 mb-3">{caseTitle || 'New Case'}</p>
                <p className="text-sm text-gray-500 mb-1">Case ID</p>
                <p className="text-gray-900">{caseId}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              onClick={onOpenWorkspace}
              className="w-full"
              size="lg"
            >
              <FolderOpen className="w-5 h-5 mr-2" />
              Open Case Workspace
              <ArrowRight className="w-4 h-4 ml-auto" />
            </Button>

            <Button
              onClick={onGenerateDrafts}
              variant="outline"
              className="w-full"
              size="lg"
            >
              <FileText className="w-5 h-5 mr-2" />
              Generate Drafts Now
            </Button>

            <Button
              onClick={onReturnToCases}
              variant="ghost"
              className="w-full"
            >
              Return to Cases List
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
