import { useState, useRef, useEffect } from 'react';
import { Send, Plus, Sparkles, FileText, Scale, BookOpen, Lightbulb } from 'lucide-react';
import { CaseBundleGenerator } from './CaseBundleGenerator';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export function NewChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showBundleGenerator, setShowBundleGenerator] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages([...messages, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: generateResponse(input),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const generateResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('section') || lowerQuery.includes('sec')) {
      return `I'll explain this legal provision for you:\n\n**Section Overview:**\nThis section deals with the legal framework governing the matter you've inquired about.\n\n**Simple Explanation:**\nIn layman's terms, this means that the law provides specific guidelines and requirements that must be followed.\n\n**Key Points:**\n• The provision establishes clear legal standards\n• It outlines rights and obligations of parties involved\n• Violations may result in specific legal consequences\n\n**Relevant Case Law:**\n• *State vs. Kumar* (2024 SCC 123)\n• *ABC Ltd. vs. XYZ Corp* (2023 SCC OnLine Del 456)\n\nWould you like me to elaborate on any specific aspect?`;
    }
    
    if (lowerQuery.includes('draft') || lowerQuery.includes('petition') || lowerQuery.includes('application')) {
      return `I can help you draft that legal document. I'll create a professional draft based on best practices and relevant legal provisions.\n\nWould you like me to:\n1. Generate a complete draft now\n2. Use the Case Bundle Generator for a structured approach\n3. Provide a template you can customize\n\nPlease provide the key details such as:\n• Parties involved\n• Nature of the case\n• Relief sought\n• Key facts\n\nI'll ensure the draft follows proper legal format and includes relevant citations.`;
    }
    
    if (lowerQuery.includes('case') || lowerQuery.includes('judgment')) {
      return `I can help you with case law research. Based on your query, here are some relevant aspects:\n\n**Key Judgments:**\nI can search through thousands of judgments to find precedents relevant to your matter.\n\n**What I can do:**\n• Find similar cases and precedents\n• Analyze judgment ratios and obiter dicta\n• Identify applicable legal principles\n• Verify citations and check if overruled\n\nWould you like me to search for specific judgments or analyze a particular case?`;
    }

    return `I'm JURIS, your AI legal assistant. I can help you with:\n\n• Legal research and case law analysis\n• Drafting petitions, applications, and legal documents\n• Explaining complex legal provisions in simple terms\n• Analyzing judgments and extracting key points\n• Verifying citations and precedents\n• IPC to BNS conversion\n• Exam preparation and legal study materials\n\nHow can I assist you with your legal work today?`;
  };

  const quickActions = [
    {
      icon: FileText,
      label: 'Create Case Bundle',
      description: 'Generate complete case documentation',
      action: () => setShowBundleGenerator(true)
    },
    {
      icon: Scale,
      label: 'Explain a Law',
      description: 'Get simple explanations of legal provisions',
      action: () => setInput('Explain Section ')
    },
    {
      icon: BookOpen,
      label: 'Analyze Judgment',
      description: 'Get detailed analysis of court judgments',
      action: () => setInput('Analyze the judgment ')
    },
    {
      icon: Lightbulb,
      label: 'Legal Advice',
      description: 'Get guidance on legal matters',
      action: () => setInput('I need advice on ')
    }
  ];

  if (showBundleGenerator) {
    return (
      <CaseBundleGenerator onClose={() => setShowBundleGenerator(false)} />
    );
  }

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Chat Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-gray-900">AI Legal Assistant</h2>
            <p className="text-sm text-gray-500">Ask me anything about law</p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        {messages.length === 0 ? (
          <div className="max-w-4xl mx-auto">
            {/* Welcome Message */}
            <div className="text-center mb-12">
              <div className="inline-flex w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl items-center justify-center mb-4">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-gray-900 mb-2">Welcome to JURIS AI</h1>
              <p className="text-gray-600">
                Your intelligent legal assistant for research, drafting, and case analysis
              </p>
            </div>

            {/* Quick Actions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <button
                    key={index}
                    onClick={action.action}
                    className="p-6 bg-white border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all text-left group"
                  >
                    <Icon className="w-8 h-8 text-blue-600 mb-3 group-hover:scale-110 transition-transform" />
                    <h3 className="text-gray-900 mb-1">{action.label}</h3>
                    <p className="text-sm text-gray-600">{action.description}</p>
                  </button>
                );
              })}
            </div>

            {/* Example Prompts */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-gray-900 mb-4">Try asking:</h3>
              <div className="space-y-2">
                {[
                  'Explain Section 420 IPC in simple terms',
                  'Draft a bail application for criminal case',
                  'What are the grounds for divorce under HMA?',
                  'Find judgments related to consumer protection'
                ].map((example, index) => (
                  <button
                    key={index}
                    onClick={() => setInput(example)}
                    className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors text-sm text-gray-700"
                  >
                    "{example}"
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-3xl ${
                    message.role === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white border border-gray-200 text-gray-900'
                  } rounded-2xl px-6 py-4`}
                >
                  <div className="whitespace-pre-wrap">{message.content}</div>
                  <div
                    className={`text-xs mt-2 ${
                      message.role === 'user' ? 'text-blue-100' : 'text-gray-500'
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 rounded-2xl px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                    </div>
                    <span className="text-sm text-gray-500">Thinking...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 px-6 py-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-end gap-3">
            <button
              onClick={() => setShowBundleGenerator(true)}
              className="p-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              title="Create Case Bundle"
            >
              <Plus className="w-5 h-5 text-gray-600" />
            </button>
            <div className="flex-1 relative">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder="Ask anything about law, request drafts, or get legal advice..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows={1}
                style={{ minHeight: '48px', maxHeight: '150px' }}
              />
            </div>
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="p-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">
            Press Enter to send, Shift+Enter for new line
          </p>
        </div>
      </div>
    </div>
  );
}
