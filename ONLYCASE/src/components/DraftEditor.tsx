import { useState, useRef } from 'react';
import { ArrowLeft, Save, Download, Trash2, Image as ImageIcon, X, GripVertical, Copy, Share2 } from 'lucide-react';
import { SavedDraft } from './Drafts';

interface DraftEditorProps {
  draft: SavedDraft;
  onClose: () => void;
  onSave: (draft: SavedDraft) => void;
  onDelete: () => void;
}

export function DraftEditor({ draft, onClose, onSave, onDelete }: DraftEditorProps) {
  const [title, setTitle] = useState(draft.title);
  const [body, setBody] = useState(draft.body);
  const [photos, setPhotos] = useState<string[]>(draft.photos);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [draggedPhotoIndex, setDraggedPhotoIndex] = useState<number | null>(null);

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
    setHasUnsavedChanges(true);
  };

  const handleBodyChange = (newBody: string) => {
    setBody(newBody);
    setHasUnsavedChanges(true);
  };

  const handleSave = () => {
    const updatedDraft: SavedDraft = {
      ...draft,
      title,
      body,
      photos,
      updatedAt: new Date().toISOString()
    };
    onSave(updatedDraft);
    setHasUnsavedChanges(false);
  };

  const handleSaveAndClose = () => {
    handleSave();
    onClose();
  };

  const handleClose = () => {
    if (hasUnsavedChanges) {
      const confirm = window.confirm('You have unsaved changes. Do you want to discard them?');
      if (!confirm) return;
    }
    onClose();
  };

  const handleDelete = () => {
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    onDelete();
    setShowDeleteConfirm(false);
  };

  const handleAddPhoto = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            setPhotos(prev => [...prev, event.target!.result as string]);
            setHasUnsavedChanges(true);
          }
        };
        reader.readAsDataURL(file);
      });
    }
    e.target.value = '';
  };

  const handleRemovePhoto = (index: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== index));
    setHasUnsavedChanges(true);
  };

  const handleDragStart = (index: number) => {
    setDraggedPhotoIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedPhotoIndex === null || draggedPhotoIndex === index) return;

    const newPhotos = [...photos];
    const draggedPhoto = newPhotos[draggedPhotoIndex];
    newPhotos.splice(draggedPhotoIndex, 1);
    newPhotos.splice(index, 0, draggedPhoto);
    
    setPhotos(newPhotos);
    setDraggedPhotoIndex(index);
    setHasUnsavedChanges(true);
  };

  const handleDragEnd = () => {
    setDraggedPhotoIndex(null);
  };

  const handleExport = () => {
    const blob = new Blob([`${title}\n\n${body}`], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.replace(/[^a-z0-9]/gi, '_')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(body);
    alert('Draft copied to clipboard!');
  };

  const wordCount = body.trim().split(/\s+/).length;
  const charCount = body.length;

  return (
    <div className="h-full overflow-hidden bg-background flex flex-col">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={handleClose}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Library</span>
            </button>
            
            <div className="flex items-center gap-2">
              {hasUnsavedChanges && (
                <span className="text-sm text-yellow-600 dark:text-yellow-400">Unsaved changes</span>
              )}
              <button
                onClick={handleCopyToClipboard}
                className="px-4 py-2 border border-border text-foreground rounded-lg hover:bg-accent flex items-center gap-2"
              >
                <Copy className="w-4 h-4" />
                Copy
              </button>
              <button
                onClick={handleExport}
                className="px-4 py-2 border border-border text-foreground rounded-lg hover:bg-accent flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Export
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Save
              </button>
              <button
                onClick={handleSaveAndClose}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Save & Close
              </button>
              <button
                onClick={handleDelete}
                className="p-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 dark:hover:bg-red-950"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Title Input */}
          <input
            type="text"
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            className="w-full text-2xl bg-transparent border-none focus:outline-none text-foreground placeholder:text-muted-foreground mb-2"
            placeholder="Draft Title"
          />

          {/* Stats */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>{wordCount.toLocaleString()} words</span>
            <span>•</span>
            <span>{charCount.toLocaleString()} characters</span>
            {photos.length > 0 && (
              <>
                <span>•</span>
                <span>{photos.length} photo{photos.length > 1 ? 's' : ''}</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto px-6 py-6">
          {/* Photos Section */}
          {photos.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-foreground">Attached Photos</h3>
                <button
                  onClick={handleAddPhoto}
                  className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
                >
                  <ImageIcon className="w-4 h-4" />
                  Add More
                </button>
              </div>
              <div className="grid grid-cols-4 gap-4">
                {photos.map((photo, index) => (
                  <div
                    key={index}
                    draggable
                    onDragStart={() => handleDragStart(index)}
                    onDragOver={(e) => handleDragOver(e, index)}
                    onDragEnd={handleDragEnd}
                    className="relative group cursor-move"
                  >
                    <div className="absolute top-2 left-2 p-1 bg-black bg-opacity-50 rounded cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100 transition-opacity">
                      <GripVertical className="w-4 h-4 text-white" />
                    </div>
                    <img
                      src={photo}
                      alt={`Photo ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg border border-border"
                    />
                    <button
                      onClick={() => handleRemovePhoto(index)}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {photos.length === 0 && (
            <div className="mb-6">
              <button
                onClick={handleAddPhoto}
                className="w-full py-8 border-2 border-dashed border-border rounded-lg hover:border-blue-500 hover:bg-accent/50 transition-colors flex flex-col items-center justify-center gap-2 text-muted-foreground hover:text-foreground"
              >
                <ImageIcon className="w-8 h-8" />
                <span>Click to add photos</span>
              </button>
            </div>
          )}

          {/* Body Editor */}
          <div className="bg-card border border-border rounded-xl p-6">
            <textarea
              value={body}
              onChange={(e) => handleBodyChange(e.target.value)}
              className="w-full min-h-[600px] bg-transparent border-none focus:outline-none resize-none text-foreground placeholder:text-muted-foreground font-mono"
              placeholder="Start writing your draft..."
              style={{ lineHeight: '1.8' }}
            />
          </div>
        </div>
      </div>

      {/* File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-card rounded-xl shadow-2xl p-6 max-w-md w-full mx-4 border border-border">
            <h3 className="text-foreground mb-2">Delete Draft?</h3>
            <p className="text-muted-foreground mb-6">
              This action cannot be undone. The draft and all its photos will be permanently deleted.
            </p>
            <div className="flex items-center gap-3 justify-end">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 border border-border text-foreground rounded-lg hover:bg-accent"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete Draft
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
