import { useState } from 'react';
import { Upload, FileText, Lightbulb, AlertCircle, CheckCircle2, Users, Calendar, MapPin, Sparkles, Download, Eye } from 'lucide-react';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { toast } from 'sonner';

interface ExtractedFact {
  id: string;
  category: 'party' | 'event' | 'evidence' | 'location' | 'date';
  content: string;
  confidence: number;
  source: string;
}

interface Party {
  name: string;
  role: string;
  details: string;
}

export function FactExtractorEngine() {
  const [isExtracting, setIsExtracting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [hasExtracted, setHasExtracted] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  // Mock extracted data
  const [parties, setParties] = useState<Party[]>([]);
  const [keyFacts, setKeyFacts] = useState<string[]>([]);
  const [missingFacts, setMissingFacts] = useState<string[]>([]);
  const [contradictions, setContradictions] = useState<string[]>([]);
  const [evidenceList, setEvidenceList] = useState<string[]>([]);
  const [timeline, setTimeline] = useState<Array<{ date: string; event: string }>>([]);

  const handleFileUpload = () => {
    toast.success('Files uploaded successfully!');
    setUploadedFiles(['FIR_Copy.pdf', 'Medical_Report.pdf', 'Witness_Statement.pdf']);
  };

  const handleExtract = () => {
    setIsExtracting(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsExtracting(false);
          setHasExtracted(true);
          
          // Populate mock data
          setParties([
            { name: 'Rajesh Kumar', role: 'Complainant', details: 'Age 35, Resident of Delhi' },
            { name: 'Amit Sharma', role: 'Accused', details: 'Age 42, Resident of Mumbai' },
            { name: 'Delhi Police', role: 'Investigating Authority', details: 'PS Connaught Place' }
          ]);

          setKeyFacts([
            'Incident occurred on March 15, 2024 at 10:30 PM',
            'Location: Connaught Place, New Delhi',
            'FIR registered under IPC Section 420 (Cheating)',
            'Amount involved: ₹5,00,000',
            'Digital evidence includes email correspondence and bank statements'
          ]);

          setMissingFacts([
            'Exact timeline of financial transactions',
            'Witness contact information (2 witnesses mentioned but details incomplete)',
            'CCTV footage mentioned but not attached'
          ]);

          setContradictions([
            'FIR states incident time as 10:30 PM, but witness statement mentions 11:00 PM',
            'Amount mentioned in complaint (₹5L) differs from bank statement (₹4.8L)'
          ]);

          setEvidenceList([
            'FIR Copy - PS Connaught Place',
            'Bank statements (Jan-Mar 2024)',
            'Email correspondence (15 emails)',
            'Medical report of complainant',
            'Witness statement - Mr. Verma',
            'Digital transaction records'
          ]);

          setTimeline([
            { date: '2024-01-10', event: 'First contact between parties via email' },
            { date: '2024-02-05', event: 'Initial payment of ₹2,00,000' },
            { date: '2024-03-01', event: 'Second payment of ₹2,80,000' },
            { date: '2024-03-15', event: 'Incident occurred - fraud discovered' },
            { date: '2024-03-16', event: 'FIR registered at Connaught Place PS' },
            { date: '2024-03-20', event: 'Medical examination conducted' }
          ]);

          toast.success('Fact extraction completed!');
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const handleExport = () => {
    toast.success('Exporting extracted facts as PDF...');
  };

  if (!hasExtracted) {
    return (
      <div className="h-full overflow-y-auto bg-gray-50">
        <div className="max-w-5xl mx-auto p-6">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Lightbulb className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-gray-900">Fact Extractor Engine™</h1>
                <p className="text-gray-600">AI-powered extraction of facts from legal documents</p>
              </div>
            </div>
          </div>

          {/* Upload Section */}
          <div className="bg-white rounded-2xl p-8 border border-gray-200 mb-6">
            <h2 className="text-gray-900 mb-6">Upload Documents</h2>
            
            <div 
              onClick={handleFileUpload}
              className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-blue-400 transition-colors cursor-pointer mb-6"
            >
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-900 mb-2">Drag & drop files here</p>
              <p className="text-sm text-gray-500 mb-4">Supported formats: PDF, Images, Word documents</p>
              <Button>Browse Files</Button>
            </div>

            {/* Uploaded Files */}
            {uploadedFiles.length > 0 && (
              <div className="space-y-2 mb-6">
                <h3 className="text-gray-900 mb-3">Uploaded Files</h3>
                {uploadedFiles.map((file, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <span className="flex-1 text-sm text-gray-900">{file}</span>
                    <Badge className="bg-green-100 text-green-700">Ready</Badge>
                  </div>
                ))}
              </div>
            )}

            {/* Extract Button */}
            {uploadedFiles.length > 0 && !isExtracting && (
              <Button onClick={handleExtract} className="w-full" size="lg">
                <Sparkles className="w-5 h-5 mr-2" />
                Extract Facts
              </Button>
            )}

            {/* Progress */}
            {isExtracting && (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Extracting facts...</span>
                  <span className="text-gray-900">{progress}%</span>
                </div>
                <Progress value={progress} />
                <p className="text-sm text-gray-500 text-center">
                  Analyzing documents, identifying parties, extracting events and evidence...
                </p>
              </div>
            )}
          </div>

          {/* Features */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
                <Users className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="text-gray-900 mb-2">Identify Parties</h3>
              <p className="text-sm text-gray-600">Automatically detect all parties involved</p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-3">
                <Calendar className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="text-gray-900 mb-2">Timeline Creation</h3>
              <p className="text-sm text-gray-600">Build chronological sequence of events</p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mb-3">
                <AlertCircle className="w-5 h-5 text-orange-600" />
              </div>
              <h3 className="text-gray-900 mb-2">Find Gaps</h3>
              <p className="text-sm text-gray-600">Identify missing facts and contradictions</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Lightbulb className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-gray-900">Extracted Facts</h1>
              <p className="text-gray-600">{uploadedFiles.length} documents analyzed</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleExport}>
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
            <Button onClick={() => setHasExtracted(false)}>
              <Upload className="w-4 h-4 mr-2" />
              Upload More
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="parties" className="space-y-6">
          <TabsList className="bg-white border border-gray-200">
            <TabsTrigger value="parties">Parties</TabsTrigger>
            <TabsTrigger value="facts">Key Facts</TabsTrigger>
            <TabsTrigger value="missing">Missing Facts</TabsTrigger>
            <TabsTrigger value="contradictions">Contradictions</TabsTrigger>
            <TabsTrigger value="evidence">Evidence</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
          </TabsList>

          <TabsContent value="parties">
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h2 className="text-gray-900 mb-4">Identified Parties</h2>
              <div className="space-y-4">
                {parties.map((party, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-gray-900">{party.name}</h3>
                      <Badge className="bg-blue-100 text-blue-700">{party.role}</Badge>
                    </div>
                    <p className="text-sm text-gray-600">{party.details}</p>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="facts">
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h2 className="text-gray-900 mb-4">Key Facts Extracted</h2>
              <div className="space-y-3">
                {keyFacts.map((fact, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-900">{fact}</p>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="missing">
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h2 className="text-gray-900 mb-4">Missing or Incomplete Facts</h2>
              <div className="space-y-3">
                {missingFacts.map((fact, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                    <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-900">{fact}</p>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="contradictions">
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h2 className="text-gray-900 mb-4">Detected Contradictions</h2>
              <div className="space-y-3">
                {contradictions.map((item, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-red-50 rounded-lg border border-red-200">
                    <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-900">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="evidence">
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h2 className="text-gray-900 mb-4">Evidence List</h2>
              <div className="grid grid-cols-2 gap-3">
                {evidenceList.map((evidence, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <span className="text-sm text-gray-900 flex-1">{evidence}</span>
                    <Button size="sm" variant="ghost">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="timeline">
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h2 className="text-gray-900 mb-4">Timeline Preview</h2>
              <div className="space-y-4">
                {timeline.map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-blue-600" />
                      </div>
                      {index < timeline.length - 1 && (
                        <div className="w-0.5 h-full bg-gray-200 my-2" />
                      )}
                    </div>
                    <div className="flex-1 pb-4">
                      <div className="text-sm text-gray-500 mb-1">{item.date}</div>
                      <p className="text-gray-900">{item.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
