import { 
  MessageSquarePlus, 
  FolderOpen, 
  FileText, 
  Upload,
  Gavel,
  Search, 
  CheckCircle2, 
  FileSearch, 
  GitCompare, 
  BookOpen,
  Lightbulb,
  Brain,
  Target,
  Layers,
  Clock,
  Paperclip,
  GraduationCap,
  UserCircle,
  Settings as SettingsIcon, 
  HelpCircle, 
  LogOut,
  Scale,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import { Page } from '../App';
import { useState } from 'react';

interface SidebarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export function Sidebar({ currentPage, onNavigate }: SidebarProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>(['main']);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const mainItems = [
    { id: 'new-chat' as Page, label: 'New Chat', icon: MessageSquarePlus },
    { id: 'cases' as Page, label: 'Cases', icon: FolderOpen },
    { id: 'drafts' as Page, label: 'Drafts', icon: FileText },
    { id: 'citation-verifier' as Page, label: 'Citation Verifier', icon: CheckCircle2 },
    { id: 'ipc-bns-converter' as Page, label: 'IPC ↔ BNS Converter', icon: GitCompare },
  ];

  const legalToolsItems = [
    { id: 'case-law-search' as Page, label: 'Case Law Search', icon: Search },
    { id: 'judgment-analyzer' as Page, label: 'Judgment Analyzer', icon: FileSearch },
    { id: 'bare-act-explainer' as Page, label: 'Bare Act Explainer', icon: BookOpen },
  ];

  const advancedModulesItems = [
    { id: 'fact-extraction' as Page, label: 'Fact Extraction', icon: Lightbulb },
    { id: 'issue-spotting' as Page, label: 'Issue Spotting', icon: Target },
    { id: 'strategy-board' as Page, label: 'Strategy Board', icon: Layers },
    { id: 'case-theory-builder' as Page, label: 'Case Theory Builder', icon: Brain },
    { id: 'annexure-manager' as Page, label: 'Annexure Manager', icon: Paperclip },
    { id: 'timeline-builder' as Page, label: 'Timeline Builder', icon: Clock },
  ];

  const studentToolsItems = [
    { id: 'exam-prep' as Page, label: 'Exam Prep', icon: GraduationCap },
    { id: 'ai-mentor' as Page, label: 'AI Mentor', icon: UserCircle },
  ];

  const isExpanded = (section: string) => expandedSections.includes(section);

  return (
    <div className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border">
        <button 
          onClick={() => onNavigate('dashboard')}
          className="flex items-center gap-2 w-full"
        >
          <Scale className="w-8 h-8 text-blue-600" />
          <div className="text-left">
            <div className="font-bold text-sidebar-foreground">JURIS</div>
            <div className="text-xs text-muted-foreground">AI Legal Assistant</div>
          </div>
        </button>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 overflow-y-auto p-4">
        <div className="space-y-1">
          {/* MAIN Section */}
          <div className="mb-4">
            <button
              onClick={() => toggleSection('main')}
              className="w-full flex items-center justify-between px-2 py-1 text-xs uppercase text-muted-foreground hover:text-sidebar-foreground mb-1"
            >
              <span>Main</span>
              {isExpanded('main') ? 
                <ChevronDown className="w-3 h-3" /> : 
                <ChevronRight className="w-3 h-3" />
              }
            </button>
            {isExpanded('main') && mainItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                      : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm">{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* LEGAL TOOLS Section */}
          <div className="mb-4">
            <button
              onClick={() => toggleSection('legal-tools')}
              className="w-full flex items-center justify-between px-2 py-1 text-xs uppercase text-muted-foreground hover:text-sidebar-foreground mb-1"
            >
              <span>Legal Tools</span>
              {isExpanded('legal-tools') ? 
                <ChevronDown className="w-3 h-3" /> : 
                <ChevronRight className="w-3 h-3" />
              }
            </button>
            {isExpanded('legal-tools') && legalToolsItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                      : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm">{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* ADVANCED MODULES Section */}
          <div className="mb-4">
            <button
              onClick={() => toggleSection('advanced')}
              className="w-full flex items-center justify-between px-2 py-1 text-xs uppercase text-muted-foreground hover:text-sidebar-foreground mb-1"
            >
              <span>Advanced Modules</span>
              {isExpanded('advanced') ? 
                <ChevronDown className="w-3 h-3" /> : 
                <ChevronRight className="w-3 h-3" />
              }
            </button>
            {isExpanded('advanced') && advancedModulesItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                      : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm">{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* STUDENT & MENTOR TOOLS Section */}
          <div className="mb-4">
            <button
              onClick={() => toggleSection('student')}
              className="w-full flex items-center justify-between px-2 py-1 text-xs uppercase text-muted-foreground hover:text-sidebar-foreground mb-1"
            >
              <span>Student Tools</span>
              {isExpanded('student') ? 
                <ChevronDown className="w-3 h-3" /> : 
                <ChevronRight className="w-3 h-3" />
              }
            </button>
            {isExpanded('student') && studentToolsItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                      : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-sidebar-border space-y-1">
        <button
          onClick={() => onNavigate('settings')}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
            currentPage === 'settings'
              ? 'bg-sidebar-accent text-sidebar-accent-foreground'
              : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
          }`}
        >
          <SettingsIcon className="w-5 h-5" />
          <span className="text-sm">Settings</span>
        </button>
        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors">
          <HelpCircle className="w-5 h-5" />
          <span className="text-sm">Help</span>
        </button>
        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors">
          <LogOut className="w-5 h-5" />
          <span className="text-sm">Logout</span>
        </button>
      </div>
    </div>
  );
}