import { useState } from 'react';
import { Upload, FileText, CheckCircle2, XCircle, AlertTriangle, ExternalLink, AlertCircle, FileUp, File } from 'lucide-react';
import { verifyCitationsWithAI } from '../services/grokAI';
import * as pdfjsLib from 'pdfjs-dist';
import { createWorker } from 'tesseract.js';

// Set up PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

interface Citation {
  id: string;
  original: string;
  corrected: string;
  status: 'verified' | 'overruled' | 'incorrect' | 'modified';
  judgment: string;
  court: string;
  date: string;
  note?: string;
  sources?: string[];
  pinpointReference?: string;
}

export function CitationVerifier() {
  const [inputText, setInputText] = useState('');
  const [citations, setCitations] = useState<Citation[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [extractionProgress, setExtractionProgress] = useState<string>('');

  const extractTextFromPDF = async (file: File): Promise<string> => {
    try {
      setExtractionProgress('Initializing PDF reader...');
      
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      
      let fullText = '';
      const totalPages = pdf.numPages;
      
      setExtractionProgress(`Found ${totalPages} page(s) in PDF. Starting extraction...`);

      // Process each page
      for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
        setExtractionProgress(`Processing page ${pageNum} of ${totalPages}...`);
        
        const page = await pdf.getPage(pageNum);
        
        // Try native text extraction first
        const textContent = await page.getTextContent();
        const pageText = textContent.items
          .map((item: any) => item.str)
          .join(' ');
        
        // Render page to canvas for OCR (always do this for better accuracy)
        setExtractionProgress(`Rendering page ${pageNum} for OCR...`);
        
        const viewport = page.getViewport({ scale: 2.5 }); // Higher scale for better OCR
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        
        if (!context) {
          throw new Error('Failed to create canvas context');
        }
        
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        
        await page.render({
          canvasContext: context,
          viewport: viewport
        }).promise;
        
        // Always run OCR for better text extraction
        setExtractionProgress(`Running OCR on page ${pageNum}...`);
        
        const imageData = canvas.toDataURL('image/png');
        const worker = await createWorker('eng', 1, {
          logger: (m) => {
            if (m.status === 'recognizing text') {
              setExtractionProgress(`OCR: ${Math.round(m.progress * 100)}% complete on page ${pageNum}...`);
            }
          }
        });
        
        const { data: { text: ocrText } } = await worker.recognize(imageData);
        await worker.terminate();
        
        // Use whichever gives more text (OCR usually better for scanned PDFs)
        const bestText = ocrText.trim().length > pageText.trim().length ? ocrText : pageText;
        
        if (bestText.trim().length > 0) {
          fullText += `\n\n--- Page ${pageNum} ---\n\n${bestText.trim()}`;
        }
        
        console.log(`Page ${pageNum}: Native=${pageText.length} chars, OCR=${ocrText.length} chars, Using=${bestText.length} chars`);
      }
      
      setExtractionProgress('Finalizing extraction...');
      
      const cleanedText = fullText.trim();
      
      if (cleanedText.length < 50) {
        throw new Error('Could not extract sufficient text from PDF. The file might be corrupted, encrypted, or contain only images without readable text.');
      }
      
      setExtractionProgress(`✓ Successfully extracted ${cleanedText.length} characters from ${totalPages} pages`);
      
      return cleanedText;
      
    } catch (error: any) {
      console.error('PDF extraction error:', error);
      setExtractionProgress('');
      throw new Error(error.message || 'Failed to extract text from PDF. Please ensure the PDF is not encrypted or corrupted.');
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      setError('Please upload a PDF file');
      return;
    }

    setPdfFile(file);
    setError(null);
    setIsAnalyzing(true);
    setCitations([]);
    setInputText(''); // Clear previous text
    setExtractionProgress(`📄 Uploading ${file.name}...`);

    try {
      const extractedText = await extractTextFromPDF(file);
      
      if (!extractedText || extractedText.length < 50) {
        throw new Error('Could not extract sufficient text from PDF. Please ensure the file contains readable text.');
      }

      // Display extracted text in the textarea immediately
      setInputText(extractedText);
      setExtractionProgress(`✓ Extracted ${extractedText.length} characters. Now verifying citations...`);
      
      // Small delay to show the extracted text before verification
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const response = await verifyCitationsWithAI(extractedText);

      if (response.success && response.citations.length > 0) {
        setCitations(response.citations);
        setExtractionProgress('');
      } else if (response.error) {
        setError(response.error);
        setExtractionProgress('');
      } else {
        setError('No citations found in the PDF document');
        setExtractionProgress('');
      }
    } catch (err: any) {
      console.error('PDF processing error:', err);
      setError(err.message || 'Failed to process PDF file. Please try again or paste text manually.');
      setPdfFile(null);
      setExtractionProgress('');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const exportToPDF = () => {
    const reportContent = generateReportContent();
    const printWindow = window.open('', '_blank');
    
    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Citation Verification Report</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 40px; line-height: 1.6; }
            h1 { color: #1e40af; border-bottom: 3px solid #1e40af; padding-bottom: 10px; }
            h2 { color: #374151; margin-top: 30px; }
            .summary { background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .summary-item { display: inline-block; margin-right: 30px; }
            .citation { border: 1px solid #e5e7eb; padding: 20px; margin: 15px 0; border-radius: 8px; }
            .status { padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: bold; }
            .verified { background: #d1fae5; color: #065f46; }
            .overruled { background: #fee2e2; color: #991b1b; }
            .incorrect { background: #fed7aa; color: #92400e; }
            .modified { background: #fef3c7; color: #92400e; }
            .note { background: #fef3c7; border-left: 4px solid #f59e0b; padding: 10px; margin-top: 10px; }
            .sources { color: #6b7280; font-size: 14px; margin-top: 8px; }
            .meta { color: #6b7280; font-size: 14px; }
            @media print {
              body { padding: 20px; }
            }
          </style>
        </head>
        <body>
          ${reportContent}
          <script>
            window.onload = function() {
              window.print();
              setTimeout(() => window.close(), 100);
            }
          </script>
        </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

  const exportToExcel = () => {
    // Create a proper Excel-compatible CSV with UTF-8 BOM
    const BOM = '\uFEFF';
    
    // Calculate summary statistics
    const totalCitations = citations.length;
    const verified = citations.filter(c => c.status === 'verified').length;
    const overruled = citations.filter(c => c.status === 'overruled').length;
    const incorrect = citations.filter(c => c.status === 'incorrect').length;
    const modified = citations.filter(c => c.status === 'modified').length;
    const issues = incorrect + modified;
    
    // Build CSV content with proper formatting
    let csvContent = BOM;
    
    // Title and Date
    csvContent += '"Citation Verification Report"\n';
    csvContent += `"Generated: ${new Date().toLocaleString('en-IN')}"\n`;
    csvContent += '\n';
    
    // Summary Section
    csvContent += '"SUMMARY"\n';
    csvContent += '"Metric","Count"\n';
    csvContent += `"Total Citations","${totalCitations}"\n`;
    csvContent += `"Verified","${verified}"\n`;
    csvContent += `"Overruled","${overruled}"\n`;
    csvContent += `"Incorrect","${incorrect}"\n`;
    csvContent += `"Modified","${modified}"\n`;
    csvContent += `"Total Issues Found","${issues}"\n`;
    csvContent += '\n\n';
    
    // Detailed Citations Section
    csvContent += '"DETAILED VERIFICATION RESULTS"\n';
    csvContent += '"Sr. No.","Case Name","Original Citation","Corrected Citation","Status","Court","Date","Pinpoint Reference","Verified By (Sources)","Notes/Remarks"\n';
    
    citations.forEach((citation, index) => {
      const srNo = index + 1;
      const caseName = (citation.judgment || '').replace(/"/g, '""');
      const original = (citation.original || '').replace(/"/g, '""');
      const corrected = (citation.corrected || '').replace(/"/g, '""');
      const status = citation.status.toUpperCase();
      const court = (citation.court || '').replace(/"/g, '""');
      const date = new Date(citation.date).toLocaleDateString('en-IN');
      const pinpoint = (citation.pinpointReference || 'N/A').replace(/"/g, '""');
      const sources = (citation.sources?.join('; ') || 'N/A').replace(/"/g, '""');
      const note = (citation.note || 'N/A').replace(/"/g, '""');
      
      csvContent += `"${srNo}","${caseName}","${original}","${corrected}","${status}","${court}","${date}","${pinpoint}","${sources}","${note}"\n`;
    });
    
    // Footer
    csvContent += '\n\n';
    csvContent += '"DISCLAIMER"\n';
    csvContent += '"This report was generated using AI-powered citation verification across SCC, Manupatra, LiveLaw, and Indian Kanoon."\n';
    csvContent += '"This verification is for informational purposes only. Please verify critical citations manually before court submissions."\n';

    // Create and download the file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    const fileName = `Citation_Verification_Report_${new Date().toISOString().split('T')[0]}.csv`;
    
    link.setAttribute('href', url);
    link.setAttribute('download', fileName);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const viewJudgment = (citation: Citation) => {
    // Try to construct search URLs for different legal databases
    const searchQuery = encodeURIComponent(`${citation.judgment} ${citation.corrected || citation.original}`);
    const caseName = encodeURIComponent(citation.judgment);
    
    // Create a modal or window with multiple database links
    const urls = [
      { name: 'Indian Kanoon', url: `https://indiankanoon.org/search/?formInput=${searchQuery}` },
      { name: 'SCC Online', url: `https://www.scconline.com/` },
      { name: 'Manupatra', url: `https://www.manupatra.com/` },
      { name: 'LiveLaw', url: `https://www.livelaw.in/?s=${searchQuery}` },
      { name: 'Google Scholar', url: `https://scholar.google.com/scholar?q=${searchQuery}` }
    ];

    // Open a new window with search options
    const searchWindow = window.open('', '_blank', 'width=800,height=600');
    
    if (searchWindow) {
      searchWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>View Judgment - ${citation.judgment}</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 30px;
              background: linear-gradient(to bottom, #f3f4f6, #e5e7eb);
            }
            .container {
              max-width: 700px;
              margin: 0 auto;
              background: white;
              padding: 30px;
              border-radius: 12px;
              box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            }
            h1 {
              color: #1e40af;
              margin-bottom: 10px;
              font-size: 24px;
            }
            .citation {
              color: #6b7280;
              font-size: 14px;
              margin-bottom: 20px;
              padding: 10px;
              background: #f3f4f6;
              border-radius: 6px;
            }
            .info {
              margin-bottom: 25px;
              padding: 15px;
              background: #eff6ff;
              border-left: 4px solid #3b82f6;
              border-radius: 6px;
            }
            .info p {
              margin: 5px 0;
              color: #1e40af;
              font-size: 14px;
            }
            .links {
              margin-top: 20px;
            }
            .link-item {
              display: block;
              padding: 15px 20px;
              margin: 10px 0;
              background: linear-gradient(to right, #3b82f6, #2563eb);
              color: white;
              text-decoration: none;
              border-radius: 8px;
              transition: all 0.2s;
              font-weight: 500;
            }
            .link-item:hover {
              background: linear-gradient(to right, #2563eb, #1d4ed8);
              transform: translateX(5px);
              box-shadow: 0 4px 8px rgba(0,0,0,0.15);
            }
            .note {
              margin-top: 20px;
              padding: 15px;
              background: #fef3c7;
              border-radius: 6px;
              font-size: 13px;
              color: #92400e;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>${citation.judgment}</h1>
            <div class="citation">
              <strong>Citation:</strong> ${citation.corrected || citation.original}
            </div>
            
            <div class="info">
              <p><strong>Court:</strong> ${citation.court}</p>
              <p><strong>Date:</strong> ${new Date(citation.date).toLocaleDateString('en-IN')}</p>
              ${citation.pinpointReference ? `<p><strong>Reference:</strong> ${citation.pinpointReference}</p>` : ''}
              <p><strong>Status:</strong> <span style="text-transform: uppercase; font-weight: bold;">${citation.status}</span></p>
            </div>

            <h2 style="color: #374151; font-size: 18px; margin-bottom: 15px;">Search in Legal Databases</h2>
            <div class="links">
              ${urls.map(db => `
                <a href="${db.url}" target="_blank" class="link-item">
                  🔍 Search on ${db.name}
                </a>
              `).join('')}
            </div>

            <div class="note">
              <strong>Note:</strong> Click on any database link above to search for this judgment. 
              Some databases may require subscription or login.
            </div>
          </div>
        </body>
        </html>
      `);
      searchWindow.document.close();
    } else {
      // Fallback: open Indian Kanoon directly
      window.open(urls[0].url, '_blank');
    }
  };

  const copyCorrectedText = () => {
    let correctedContent = inputText;
    
    citations.forEach(citation => {
      if (citation.original !== citation.corrected && citation.corrected) {
        correctedContent = correctedContent.replace(citation.original, citation.corrected);
      }
    });

    navigator.clipboard.writeText(correctedContent).then(() => {
      alert('Corrected text copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy text:', err);
      alert('Failed to copy text. Please try again.');
    });
  };

  const generateReportContent = () => {
    const verified = citations.filter(c => c.status === 'verified').length;
    const overruled = citations.filter(c => c.status === 'overruled').length;
    const issues = citations.filter(c => c.status === 'incorrect' || c.status === 'modified').length;

    return `
      <h1>Citation Verification Report</h1>
      <p><strong>Generated:</strong> ${new Date().toLocaleString('en-IN')}</p>
      
      <div class="summary">
        <h2>Summary</h2>
        <div class="summary-item"><strong>Total Citations:</strong> ${citations.length}</div>
        <div class="summary-item"><strong>Verified:</strong> ${verified}</div>
        <div class="summary-item"><strong>Overruled:</strong> ${overruled}</div>
        <div class="summary-item"><strong>Issues Found:</strong> ${issues}</div>
      </div>

      <h2>Detailed Verification Results</h2>
      ${citations.map((citation, index) => `
        <div class="citation">
          <h3>${index + 1}. ${citation.judgment}</h3>
          <span class="status ${citation.status}">${citation.status.toUpperCase()}</span>
          
          <p><strong>Original Citation:</strong> ${citation.original}</p>
          ${citation.original !== citation.corrected ? `<p><strong>Corrected Citation:</strong> ${citation.corrected}</p>` : ''}
          
          <p class="meta">
            <strong>Court:</strong> ${citation.court} | 
            <strong>Date:</strong> ${new Date(citation.date).toLocaleDateString('en-IN')}
            ${citation.pinpointReference ? ` | <strong>Reference:</strong> ${citation.pinpointReference}` : ''}
          </p>
          
          ${citation.sources && citation.sources.length > 0 ? `
            <p class="sources"><strong>Verified by:</strong> ${citation.sources.join(', ')}</p>
          ` : ''}
          
          ${citation.note ? `
            <div class="note">
              <strong>Note:</strong> ${citation.note}
            </div>
          ` : ''}
        </div>
      `).join('')}
      
      <footer style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 12px;">
        <p>This report was generated using AI-powered citation verification across SCC, Manupatra, LiveLaw, and Indian Kanoon.</p>
        <p><em>Note: This verification is for informational purposes only. Please verify critical citations manually before court submissions.</em></p>
      </footer>
    `;
  };

  const handleVerify = async () => {
    if (!inputText.trim()) {
      setError('Please enter text containing legal citations or upload a PDF');
      return;
    }

    setIsAnalyzing(true);
    setError(null);
    setCitations([]);
    setPdfFile(null);

    try {
      const response = await verifyCitationsWithAI(inputText);

      if (response.success && response.citations.length > 0) {
        setCitations(response.citations);
      } else if (response.error) {
        setError(response.error);
      } else {
        setError('No citations found in the provided text');
      }
    } catch (err) {
      console.error('Verification error:', err);
      setError('Failed to verify citations. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getStatusIcon = (status: Citation['status']) => {
    switch (status) {
      case 'verified':
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case 'overruled':
        return <XCircle className="w-5 h-5 text-red-600" />;
      case 'incorrect':
        return <AlertTriangle className="w-5 h-5 text-orange-600" />;
      case 'modified':
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
    }
  };

  const getStatusBadge = (status: Citation['status']) => {
    const styles = {
      verified: 'bg-green-100 text-green-700',
      overruled: 'bg-red-100 text-red-700',
      incorrect: 'bg-orange-100 text-orange-700',
      modified: 'bg-yellow-100 text-yellow-700',
    };

    const labels = {
      verified: 'Verified',
      overruled: 'Overruled',
      incorrect: 'Incorrect',
      modified: 'Modified',
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs ${styles[status]}`}>
        {labels[status]}
      </span>
    );
  };

  return (
    <div className="h-full overflow-y-auto bg-gray-50">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-gray-900 mb-2">Citation Verifier</h1>
          <p className="text-gray-600">
            AI-powered citation verification across SCC, Manupatra, LiveLaw, and Indian Kanoon
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-red-800">{error}</p>
            </div>
            <button
              onClick={() => setError(null)}
              className="text-red-600 hover:text-red-800"
            >
              ✕
            </button>
          </div>
        )}

        {/* Progress Alert */}
        {extractionProgress && (
          <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
            <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin flex-shrink-0 mt-0.5"></div>
            <div className="flex-1">
              <p className="text-blue-800 font-medium">{extractionProgress}</p>
              <p className="text-blue-600 text-sm mt-1">This may take a few moments for large documents...</p>
            </div>
          </div>
        )}

        {/* Input Section */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          {pdfFile && (
            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-2">
                <File className="w-4 h-4 text-blue-600" />
                <span className="text-sm text-blue-800 font-medium">Loaded: {pdfFile.name}</span>
              </div>
              <button
                onClick={() => {
                  setPdfFile(null);
                  setInputText('');
                  setCitations([]);
                  setError(null);
                  const fileInput = document.getElementById('pdf-upload') as HTMLInputElement;
                  if (fileInput) fileInput.value = '';
                }}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                Clear
              </button>
            </div>
          )}
          
          <div className="mb-4">
            <label className="block text-sm text-gray-700 mb-2">
              Paste your text with citations or upload a PDF document
            </label>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Enter or paste text containing legal citations here...

Example:
As held in Maneka Gandhi vs. Union of India (AIR 1978 SC 597), the right to life and liberty under Article 21 cannot be taken away except by procedure established by law. This principle was further elaborated in Vishaka vs. State of Rajasthan (1997) 1 SCC 416."
              className="w-full h-48 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              disabled={isAnalyzing}
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleVerify}
              disabled={!inputText.trim() || isAnalyzing}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isAnalyzing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Analyzing...
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  Verify Citations
                </>
              )}
            </button>

            <div className="relative">
              <input
                type="file"
                accept="application/pdf"
                onChange={handleFileUpload}
                disabled={isAnalyzing}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                id="pdf-upload"
              />
              <label
                htmlFor="pdf-upload"
                className={`px-6 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 text-blue-700 rounded-lg hover:from-blue-100 hover:to-indigo-100 hover:border-blue-400 hover:shadow-md flex items-center gap-2 cursor-pointer transition-all duration-200 ${
                  isAnalyzing ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {pdfFile ? (
                  <>
                    <File className="w-5 h-5 text-blue-600" />
                    <span className="font-medium">{pdfFile.name}</span>
                  </>
                ) : (
                  <>
                    <FileUp className="w-5 h-5 text-blue-600" />
                    <span className="font-medium">Upload PDF Document</span>
                  </>
                )}
              </label>
            </div>
          </div>
        </div>

        {/* Results Section */}
        {citations.length > 0 && (
          <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl text-gray-900">{citations.length}</p>
                    <p className="text-sm text-gray-600">Total Citations</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl text-gray-900">
                      {citations.filter(c => c.status === 'verified').length}
                    </p>
                    <p className="text-sm text-gray-600">Verified</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                    <XCircle className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <p className="text-2xl text-gray-900">
                      {citations.filter(c => c.status === 'overruled').length}
                    </p>
                    <p className="text-sm text-gray-600">Overruled</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-2xl text-gray-900">
                      {citations.filter(c => c.status === 'incorrect' || c.status === 'modified').length}
                    </p>
                    <p className="text-sm text-gray-600">Issues Found</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Citations List */}
            <div className="bg-white rounded-xl border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-gray-900">Verification Results</h2>
              </div>
              <div className="divide-y divide-gray-200">
                {citations.map((citation) => (
                  <div key={citation.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start gap-4">
                      <div className="mt-1">
                        {getStatusIcon(citation.status)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-gray-900 mb-1">{citation.judgment}</h3>
                            <div className="flex items-center gap-2 mb-2">
                              {citation.original !== citation.corrected ? (
                                <>
                                  <span className="text-sm text-gray-500 line-through">
                                    {citation.original}
                                  </span>
                                  <span className="text-sm text-gray-400">→</span>
                                  <span className="text-sm text-blue-600">
                                    {citation.corrected}
                                  </span>
                                </>
                              ) : (
                                <span className="text-sm text-gray-600">
                                  {citation.original}
                                </span>
                              )}
                            </div>
                          </div>
                          {getStatusBadge(citation.status)}
                        </div>

                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                          <span>{citation.court}</span>
                          <span>•</span>
                          <span>{new Date(citation.date).toLocaleDateString('en-IN')}</span>
                          {citation.pinpointReference && (
                            <>
                              <span>•</span>
                              <span className="text-blue-600">{citation.pinpointReference}</span>
                            </>
                          )}
                        </div>

                        {citation.sources && citation.sources.length > 0 && (
                          <div className="mb-2 flex items-center gap-2 text-sm">
                            <span className="text-gray-500">Verified by:</span>
                            <div className="flex gap-1 flex-wrap">
                              {citation.sources.map((source, idx) => (
                                <span key={idx} className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-xs">
                                  {source}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {citation.note && (
                          <div className={`mt-3 p-3 rounded-lg ${
                            citation.status === 'overruled' 
                              ? 'bg-red-50 border border-red-200' 
                              : 'bg-orange-50 border border-orange-200'
                          }`}>
                            <p className="text-sm text-gray-700">{citation.note}</p>
                          </div>
                        )}

                        <div className="mt-3 flex gap-2">
                          <button 
                            onClick={() => viewJudgment(citation)}
                            className="px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex items-center gap-1"
                          >
                            <ExternalLink className="w-4 h-4" />
                            View Judgment
                          </button>
                          {citation.status === 'incorrect' && (
                            <button className="px-3 py-1.5 text-sm text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                              Apply Correction
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Export Options */}
            <div className="flex gap-3">
              <button 
                onClick={exportToPDF}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
              >
                <FileText className="w-5 h-5" />
                Export Report as PDF
              </button>
              <button 
                onClick={exportToExcel}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center gap-2"
              >
                <FileText className="w-5 h-5" />
                Export as Excel
              </button>
              <button 
                onClick={copyCorrectedText}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Copy Corrected Text
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
