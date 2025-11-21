import { useState } from 'react';
import { Paperclip, Upload, ArrowUp, ArrowDown, FileText } from 'lucide-react';

interface Annexure {
  id: string;
  label: string;
  title: string;
  fileName: string;
  pages: number;
}

export function AnnexureManager() {
  const [annexures, setAnnexures] = useState<Annexure[]>([
    { id: '1', label: 'A', title: 'Copy of FIR', fileName: 'fir_copy.pdf', pages: 3 },
    { id: '2', label: 'B', title: 'Medical Certificate', fileName: 'medical_cert.pdf', pages: 2 },
    { id: '3', label: 'C', title: 'Bank Statement', fileName: 'bank_statement.pdf', pages: 5 },
  ]);

  return (
    <div className="h-full overflow-y-auto bg-gray-50">
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-gray-900 mb-2">Annexure Manager</h1>
            <p className="text-gray-600">Organize and manage case annexures</p>
          </div>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
            <Upload className="w-5 h-5" />
            Add Annexure
          </button>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <div className="space-y-3">
            {annexures.map((annexure, index) => (
              <div
                key={annexure.id}
                className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-xl text-blue-600">{annexure.label}</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-gray-900">{annexure.title}</h3>
                  <p className="text-sm text-gray-600">{annexure.fileName} • {annexure.pages} pages</p>
                </div>
                <div className="flex gap-2">
                  <button 
                    disabled={index === 0}
                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                  >
                    <ArrowUp className="w-4 h-4" />
                  </button>
                  <button 
                    disabled={index === annexures.length - 1}
                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                  >
                    <ArrowDown className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Generate Index
          </button>
          <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
            Export All
          </button>
        </div>
      </div>
    </div>
  );
}
