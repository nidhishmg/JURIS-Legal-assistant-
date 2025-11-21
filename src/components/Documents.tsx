import { useState } from 'react';
import { Upload, FileText, Image, File, Search, Filter, Eye, Download, Trash2, FolderOpen } from 'lucide-react';

interface Document {
  id: string;
  name: string;
  type: 'PDF' | 'Image' | 'Word' | 'Other';
  category: string;
  uploadDate: string;
  size: string;
  case?: string;
  summary?: string;
}

export function Documents() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [uploadModalOpen, setUploadModalOpen] = useState(false);

  const mockDocuments: Document[] = [
    {
      id: '1',
      name: 'FIR Copy - Sharma Case',
      type: 'PDF',
      category: 'FIR',
      uploadDate: '2024-11-15',
      size: '2.4 MB',
      case: 'Sharma vs. State of Delhi',
      summary: 'First Information Report registered under Section 420 IPC'
    },
    {
      id: '2',
      name: 'Medical Certificate',
      type: 'Image',
      category: 'Evidence',
      uploadDate: '2024-11-14',
      size: '1.8 MB',
      case: 'Sharma vs. State of Delhi',
      summary: 'Medical examination certificate from AIIMS'
    },
    {
      id: '3',
      name: 'Sale Deed Agreement',
      type: 'PDF',
      category: 'Contract',
      uploadDate: '2024-11-10',
      size: '3.2 MB',
      case: 'Property Dispute - Rohini',
      summary: 'Sale deed dated 15th March 2020 between parties'
    },
    {
      id: '4',
      name: 'Witness Statement - Mr. Verma',
      type: 'Word',
      category: 'Statement',
      uploadDate: '2024-11-08',
      size: '856 KB',
      case: 'Sharma vs. State of Delhi'
    },
    {
      id: '5',
      name: 'Court Order Copy',
      type: 'PDF',
      category: 'Court Order',
      uploadDate: '2024-11-05',
      size: '1.2 MB',
      case: 'ABC Ltd. vs. XYZ Corporation',
      summary: 'Interim order dated 1st November 2024'
    }
  ];

  const [documents] = useState<Document[]>(mockDocuments);

  const categories = ['All', 'FIR', 'Evidence', 'Contract', 'Statement', 'Court Order', 'Affidavit', 'Notice'];

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || doc.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'PDF':
        return <FileText className="w-6 h-6 text-red-500" />;
      case 'Image':
        return <Image className="w-6 h-6 text-blue-500" />;
      case 'Word':
        return <File className="w-6 h-6 text-blue-600" />;
      default:
        return <File className="w-6 h-6 text-gray-500" />;
    }
  };

  const stats = {
    total: documents.length,
    pdf: documents.filter(d => d.type === 'PDF').length,
    images: documents.filter(d => d.type === 'Image').length,
    other: documents.filter(d => d.type !== 'PDF' && d.type !== 'Image').length,
  };

  return (
    <div className="h-full overflow-y-auto bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-gray-900 mb-2">Documents</h1>
            <p className="text-gray-600">Upload, organize, and manage case documents</p>
          </div>
          <button 
            onClick={() => setUploadModalOpen(true)}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <Upload className="w-5 h-5" />
            Upload Document
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-sm text-gray-600 mb-1">Total Documents</p>
            <p className="text-2xl text-gray-900">{stats.total}</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-sm text-gray-600 mb-1">PDF Files</p>
            <p className="text-2xl text-red-600">{stats.pdf}</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-sm text-gray-600 mb-1">Images</p>
            <p className="text-2xl text-blue-600">{stats.images}</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-sm text-gray-600 mb-1">Other Files</p>
            <p className="text-2xl text-gray-600">{stats.other}</p>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search documents by name..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map(cat => (
                <option key={cat} value={cat.toLowerCase()}>{cat}</option>
              ))}
            </select>
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center gap-2">
              <Filter className="w-5 h-5" />
              More Filters
            </button>
          </div>
        </div>

        {/* Documents List */}
        <div className="space-y-3">
          {filteredDocuments.map((doc) => (
            <div
              key={doc.id}
              className="bg-white border border-gray-200 rounded-xl p-6 hover:border-blue-300 hover:shadow-md transition-all"
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  {getTypeIcon(doc.type)}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-gray-900">{doc.name}</h3>
                        <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs">
                          {doc.category}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{doc.type} • {doc.size}</p>
                    </div>
                  </div>

                  {/* Summary */}
                  {doc.summary && (
                    <p className="text-sm text-gray-700 mb-3 bg-gray-50 p-3 rounded-lg">
                      📄 AI Summary: {doc.summary}
                    </p>
                  )}

                  {/* Metadata */}
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <span>Uploaded: {new Date(doc.uploadDate).toLocaleDateString('en-IN')}</span>
                    {doc.case && (
                      <>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <FolderOpen className="w-4 h-4" />
                          {doc.case}
                        </span>
                      </>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      View
                    </button>
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm flex items-center gap-2">
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm">
                      Add to Annexure
                    </button>
                    <button className="p-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Upload Modal */}
        {uploadModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-2xl w-full p-8">
              <h2 className="text-gray-900 mb-4">Upload Document</h2>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center mb-6">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-700 mb-2">Drag and drop files here</p>
                <p className="text-sm text-gray-500 mb-4">or</p>
                <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Choose Files
                </button>
                <p className="text-xs text-gray-500 mt-4">
                  Supports PDF, DOC, DOCX, JPG, PNG (Max 10MB)
                </p>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Category</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Select category</option>
                    {categories.slice(1).map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Link to Case (Optional)</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>None</option>
                    <option>Sharma vs. State of Delhi</option>
                    <option>ABC Ltd. vs. XYZ Corporation</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3">
                <button 
                  onClick={() => setUploadModalOpen(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Upload
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
