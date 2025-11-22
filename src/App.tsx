import { useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { Dashboard } from './components/Dashboard';
import { NewChat } from './components/NewChat';
import { CaseLawSearch } from './components/CaseLawSearch';
import { CitationVerifier } from './components/CitationVerifier';
import { JudgmentAnalyzer } from './components/JudgmentAnalyzer';
import { IPCBNSConverter } from './components/IPCBNSConverter';
import { ExamPrep } from './components/ExamPrep';
import { Cases } from './components/Cases';
import { Drafts } from './components/Drafts';
import { Settings } from './components/Settings';
import { Documents } from './components/Documents';
import { Judgments } from './components/Judgments';
import { BareActExplainer } from './components/BareActExplainer';
import { FactExtraction } from './components/FactExtraction';
import { IssueSpotting } from './components/IssueSpotting';
import { StrategyBoard } from './components/StrategyBoard';
import { CaseTheoryBuilder } from './components/CaseTheoryBuilder';
import { TimelineBuilder } from './components/TimelineBuilder';
import { AnnexureManager } from './components/AnnexureManager';
import { AIMentor } from './components/AIMentor';
import { CaseWorkspace } from './components/CaseWorkspace';

export type Page = 
  | 'dashboard' 
  | 'new-chat' 
  | 'cases' 
  | 'drafts'
  | 'documents'
  | 'judgments'
  | 'case-law-search'
  | 'citation-verifier'
  | 'judgment-analyzer'
  | 'ipc-bns-converter'
  | 'bare-act-explainer'
  | 'fact-extraction'
  | 'issue-spotting'
  | 'strategy-board'
  | 'case-theory-builder'
  | 'timeline-builder'
  | 'annexure-manager'
  | 'exam-prep'
  | 'ai-mentor'
  | 'case-workspace'
  | 'settings';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [currentCaseId, setCurrentCaseId] = useState<string | undefined>();

  const handleNavigate = (page: Page, caseId?: string) => {
    setCurrentPage(page);
    if (caseId) {
      setCurrentCaseId(caseId);
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard onNavigate={handleNavigate} />;
      case 'new-chat':
        return <NewChat />;
      case 'cases':
        return <Cases onNavigate={handleNavigate} />;
      case 'case-workspace':
        return currentCaseId ? (
          <CaseWorkspace caseId={currentCaseId} onClose={() => handleNavigate('cases')} />
        ) : (
          <Cases onNavigate={handleNavigate} />
        );
      case 'drafts':
        return <Drafts />;
      case 'documents':
        return <Documents />;
      case 'judgments':
        return <Judgments />;
      case 'case-law-search':
        return <CaseLawSearch />;
      case 'citation-verifier':
        return <CitationVerifier />;
      case 'judgment-analyzer':
        return <JudgmentAnalyzer />;
      case 'ipc-bns-converter':
        return <IPCBNSConverter />;
      case 'bare-act-explainer':
        return <BareActExplainer />;
      case 'fact-extraction':
        return <FactExtraction />;
      case 'issue-spotting':
        return <IssueSpotting />;
      case 'strategy-board':
        return <StrategyBoard />;
      case 'case-theory-builder':
        return <CaseTheoryBuilder />;
      case 'timeline-builder':
        return <TimelineBuilder />;
      case 'annexure-manager':
        return <AnnexureManager />;
      case 'exam-prep':
        return <ExamPrep />;
      case 'ai-mentor':
        return <AIMentor />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard onNavigate={handleNavigate} />;
    }
  };

  return (
    <ThemeProvider>
      <div className="flex h-screen bg-background">
        <Sidebar currentPage={currentPage} onNavigate={handleNavigate} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <TopBar />
          <main className="flex-1 overflow-y-auto">
            {renderPage()}
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}