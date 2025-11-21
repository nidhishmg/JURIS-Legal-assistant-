import { useState } from 'react';
import { BookOpen, Brain, FileText, Award, ChevronRight, Clock, CheckCircle2 } from 'lucide-react';

type Subject = 'cpc' | 'constitution' | 'contracts' | 'ipc' | 'evidence' | 'crpc';
type Mode = 'mcq' | 'flashcards' | 'past-papers' | null;

interface Question {
  id: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export function ExamPrep() {
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [selectedMode, setSelectedMode] = useState<Mode>(null);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  const subjects = [
    { id: 'cpc' as Subject, name: 'Code of Civil Procedure', icon: '⚖️', questions: 450 },
    { id: 'constitution' as Subject, name: 'Constitutional Law', icon: '📜', questions: 380 },
    { id: 'contracts' as Subject, name: 'Indian Contract Act', icon: '📝', questions: 320 },
    { id: 'ipc' as Subject, name: 'Indian Penal Code', icon: '⚔️', questions: 520 },
    { id: 'evidence' as Subject, name: 'Indian Evidence Act', icon: '🔍', questions: 290 },
    { id: 'crpc' as Subject, name: 'Code of Criminal Procedure', icon: '🏛️', questions: 410 },
  ];

  const mockQuestions: Question[] = [
    {
      id: '1',
      question: 'Under which Article of the Constitution is the Right to Equality guaranteed?',
      options: [
        'Article 12',
        'Article 14',
        'Article 19',
        'Article 21'
      ],
      correct: 1,
      explanation: 'Article 14 of the Constitution guarantees the Right to Equality, stating that "The State shall not deny to any person equality before the law or the equal protection of the laws within the territory of India."'
    },
    {
      id: '2',
      question: 'What is the period of limitation for filing a suit for possession of immovable property?',
      options: [
        '3 years',
        '6 years',
        '12 years',
        '30 years'
      ],
      correct: 2,
      explanation: 'Under the Limitation Act, 1963, Article 65 provides that a suit for possession of immovable property based on title must be filed within 12 years from the date when the possession of the defendant becomes adverse to the plaintiff.'
    },
    {
      id: '3',
      question: 'Which Section of IPC deals with the offense of murder?',
      options: [
        'Section 299',
        'Section 300',
        'Section 302',
        'Section 304'
      ],
      correct: 2,
      explanation: 'Section 302 of the Indian Penal Code deals with the punishment for murder. It states: "Whoever commits murder shall be punished with death, or imprisonment for life, and shall also be liable to fine."'
    }
  ];

  if (!selectedSubject) {
    return (
      <div className="h-full overflow-y-auto bg-gray-50">
        <div className="max-w-6xl mx-auto p-6">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-gray-900 mb-2">Exam Preparation</h1>
            <p className="text-gray-600">
              Prepare for law exams with MCQs, flashcards, and past year papers
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Brain className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl text-gray-900">2,370</p>
                  <p className="text-sm text-gray-600">Total Questions</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl text-gray-900">456</p>
                  <p className="text-sm text-gray-600">Completed</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Award className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl text-gray-900">78%</p>
                  <p className="text-sm text-gray-600">Avg. Score</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-2xl text-gray-900">24h</p>
                  <p className="text-sm text-gray-600">Study Time</p>
                </div>
              </div>
            </div>
          </div>

          {/* Subjects Grid */}
          <div className="mb-8">
            <h2 className="text-gray-900 mb-4">Select Subject</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {subjects.map((subject) => (
                <button
                  key={subject.id}
                  onClick={() => setSelectedSubject(subject.id)}
                  className="p-6 bg-white border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all text-left group"
                >
                  <div className="text-4xl mb-3">{subject.icon}</div>
                  <h3 className="text-gray-900 mb-2">{subject.name}</h3>
                  <p className="text-sm text-gray-600">
                    {subject.questions} practice questions
                  </p>
                  <div className="mt-4 flex items-center text-blue-600 group-hover:gap-2 transition-all">
                    <span className="text-sm">Start Learning</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Study Modes */}
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-8 text-white">
            <h2 className="mb-4">Multiple Study Modes</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4">
                <BookOpen className="w-8 h-8 mb-3" />
                <h3 className="mb-2">MCQ Practice</h3>
                <p className="text-sm text-blue-100">
                  Test your knowledge with multiple choice questions
                </p>
              </div>
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4">
                <Brain className="w-8 h-8 mb-3" />
                <h3 className="mb-2">Flashcards</h3>
                <p className="text-sm text-blue-100">
                  Quick revision with digital flashcards
                </p>
              </div>
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4">
                <FileText className="w-8 h-8 mb-3" />
                <h3 className="mb-2">Past Papers</h3>
                <p className="text-sm text-blue-100">
                  Practice with previous year exam questions
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!selectedMode) {
    const subjectInfo = subjects.find(s => s.id === selectedSubject);
    
    return (
      <div className="h-full overflow-y-auto bg-gray-50">
        <div className="max-w-4xl mx-auto p-6">
          {/* Back Button */}
          <button
            onClick={() => setSelectedSubject(null)}
            className="mb-6 flex items-center gap-2 text-blue-600 hover:text-blue-700"
          >
            <ChevronRight className="w-4 h-4 rotate-180" />
            Back to Subjects
          </button>

          {/* Subject Header */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="text-5xl">{subjectInfo?.icon}</div>
              <div>
                <h1 className="text-gray-900 mb-1">{subjectInfo?.name}</h1>
                <p className="text-gray-600">{subjectInfo?.questions} questions available</p>
              </div>
            </div>
          </div>

          {/* Difficulty Selection */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h2 className="text-gray-900 mb-4">Select Difficulty</h2>
            <div className="grid grid-cols-3 gap-3">
              {(['easy', 'medium', 'hard'] as const).map((level) => (
                <button
                  key={level}
                  onClick={() => setDifficulty(level)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    difficulty === level
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <p className="text-gray-900 capitalize">{level}</p>
                  <p className="text-xs text-gray-600 mt-1">
                    {level === 'easy' && 'Basic concepts'}
                    {level === 'medium' && 'Moderate level'}
                    {level === 'hard' && 'Advanced topics'}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Study Mode Selection */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-gray-900 mb-4">Choose Study Mode</h2>
            <div className="space-y-3">
              <button
                onClick={() => setSelectedMode('mcq')}
                className="w-full p-6 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition-all text-left group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-gray-900 mb-1">MCQ Test</h3>
                      <p className="text-sm text-gray-600">
                        Answer multiple choice questions with instant feedback
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600" />
                </div>
              </button>

              <button
                onClick={() => setSelectedMode('flashcards')}
                className="w-full p-6 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition-all text-left group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Brain className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="text-gray-900 mb-1">Flashcards</h3>
                      <p className="text-sm text-gray-600">
                        Quick revision with flip cards
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600" />
                </div>
              </button>

              <button
                onClick={() => setSelectedMode('past-papers')}
                className="w-full p-6 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition-all text-left group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <FileText className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-gray-900 mb-1">Past Year Papers</h3>
                      <p className="text-sm text-gray-600">
                        Practice with previous examination questions
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-green-600" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // MCQ Test Mode
  if (selectedMode === 'mcq') {
    const question = mockQuestions[currentQuestion];

    return (
      <div className="h-full overflow-y-auto bg-gray-50">
        <div className="max-w-4xl mx-auto p-6">
          {/* Header */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
            <div className="flex items-center justify-between mb-2">
              <button
                onClick={() => setSelectedMode(null)}
                className="text-blue-600 hover:text-blue-700 text-sm"
              >
                ← Back
              </button>
              <div className="text-sm text-gray-600">
                Question {currentQuestion + 1} of {mockQuestions.length}
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all"
                style={{ width: `${((currentQuestion + 1) / mockQuestions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-white rounded-xl border border-gray-200 p-8 mb-6">
            <h2 className="text-gray-900 mb-6">{question.question}</h2>

            <div className="space-y-3">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSelectedAnswer(index);
                    setShowExplanation(true);
                    if (index === question.correct) {
                      setScore({ ...score, correct: score.correct + 1, total: score.total + 1 });
                    } else {
                      setScore({ ...score, total: score.total + 1 });
                    }
                  }}
                  disabled={selectedAnswer !== null}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                    selectedAnswer === null
                      ? 'border-gray-200 hover:border-blue-300'
                      : selectedAnswer === index
                      ? index === question.correct
                        ? 'border-green-500 bg-green-50'
                        : 'border-red-500 bg-red-50'
                      : index === question.correct
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      selectedAnswer === null
                        ? 'border-gray-300'
                        : selectedAnswer === index
                        ? index === question.correct
                          ? 'border-green-500 bg-green-500'
                          : 'border-red-500 bg-red-500'
                        : index === question.correct
                        ? 'border-green-500 bg-green-500'
                        : 'border-gray-300'
                    }`}>
                      {selectedAnswer !== null && (selectedAnswer === index || index === question.correct) && (
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <span className="text-gray-900">{option}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Explanation */}
          {showExplanation && (
            <div className={`rounded-xl border-2 p-6 mb-6 ${
              selectedAnswer === question.correct
                ? 'bg-green-50 border-green-500'
                : 'bg-red-50 border-red-500'
            }`}>
              <h3 className="text-gray-900 mb-2">
                {selectedAnswer === question.correct ? '✓ Correct!' : '✗ Incorrect'}
              </h3>
              <p className="text-gray-700">{question.explanation}</p>
            </div>
          )}

          {/* Navigation */}
          {showExplanation && (
            <div className="flex items-center justify-between">
              <div className="text-gray-600">
                Score: {score.correct} / {score.total} ({Math.round((score.correct / score.total) * 100)}%)
              </div>
              <button
                onClick={() => {
                  if (currentQuestion < mockQuestions.length - 1) {
                    setCurrentQuestion(currentQuestion + 1);
                    setSelectedAnswer(null);
                    setShowExplanation(false);
                  } else {
                    // Quiz completed
                    alert(`Quiz completed! Your score: ${score.correct}/${score.total}`);
                    setSelectedMode(null);
                    setCurrentQuestion(0);
                    setScore({ correct: 0, total: 0 });
                  }
                }}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                {currentQuestion < mockQuestions.length - 1 ? 'Next Question' : 'Finish Quiz'}
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return null;
}
