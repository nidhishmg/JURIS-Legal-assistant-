import { useState } from 'react';
import { UserCircle, MessageSquare, Send, Lightbulb, BookOpen, Target } from 'lucide-react';

export function AIMentor() {
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'mentor'; content: string }>>([
    {
      role: 'mentor',
      content: 'Hello! I\'m your AI Legal Mentor. I can help you with:\n\n• Draft improvement and feedback\n• Legal research guidance\n• Exam preparation strategies\n• Career advice\n• Study planning\n\nHow can I assist you today?'
    }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages([...messages, 
      { role: 'user', content: input },
      { role: 'mentor', content: 'That\'s a great question! Let me help you with that...' }
    ]);
    setInput('');
  };

  const quickActions = [
    { label: 'Review my draft', icon: BookOpen },
    { label: 'Exam strategy', icon: Target },
    { label: 'Research tips', icon: Lightbulb },
  ];

  return (
    <div className="h-full flex flex-col bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center">
            <UserCircle className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-gray-900">AI Legal Mentor</h2>
            <p className="text-sm text-gray-500">Your personal legal career guide</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-3xl ${
                  message.role === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white border border-gray-200 text-gray-900'
                } rounded-2xl px-6 py-4 whitespace-pre-wrap`}
              >
                {message.content}
              </div>
            </div>
          ))}

          {messages.length === 1 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <button
                    key={index}
                    onClick={() => setInput(action.label)}
                    className="p-4 bg-white border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all text-left group"
                  >
                    <Icon className="w-6 h-6 text-blue-600 mb-2" />
                    <p className="text-gray-900">{action.label}</p>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className="bg-white border-t border-gray-200 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-end gap-3">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Ask for guidance, feedback, or advice..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            rows={1}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="p-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white rounded-lg"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
