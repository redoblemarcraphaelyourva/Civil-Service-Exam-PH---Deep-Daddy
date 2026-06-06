import { useState, useEffect, useRef } from "react";
import { AlertCircle, ArrowLeft, ArrowRight, CheckCircle2, Clock, HelpCircle, LayoutGrid, RotateCcw, Send, Settings, BookOpen } from "lucide-react";
import { ExamSession, Question, SubjectCategory, LevelOfExam } from "../types";
import ExplainWrongAnswers from "./ExplainWrongAnswers";

interface ActiveExamProps {
  initialQuestions: Question[];
  level: LevelOfExam;
  isPracticeMode: boolean; // true = Practice (untimed, instant feedback), false = Mock Test (timed, summary at end)
  onGoBack: () => void;
  onSubmitExam: (answers: { [questionId: string]: number }, elapsedSeconds: number) => void;
}

export default function ActiveExam({ initialQuestions, level, isPracticeMode, onGoBack, onSubmitExam }: ActiveExamProps) {
  const [questions] = useState<Question[]>(() => {
    // Filter questions by level suitability
    return initialQuestions.filter(q => q.level.includes(level));
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<{ [qId: string]: number }>({});
  const [checkedQuestions, setCheckedQuestions] = useState<{ [qId: string]: boolean }>({}); // Practice mode verification state
  
  // Timer Management
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [timeLeft, setTimeRemaining] = useState(() => {
    return isPracticeMode ? 0 : questions.length * 60; // 1 minute per question for mock exam
  });

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setSecondsElapsed(prev => prev + 1);
      if (!isPracticeMode) {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            alert("Time's up! Your exam will now be automatically submitted.");
            handleForceSubmit();
            return 0;
          }
          return prev - 1;
        });
      }
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const handleForceSubmit = () => {
    onSubmitExam(userAnswers, secondsElapsed);
  };

  const currentQuestion = questions[currentIndex];

  const handleSelectOption = (optionIndex: number) => {
    if (isPracticeMode && checkedQuestions[currentQuestion.id]) {
      return; // Can't change after checking in instant feedback practice mode
    }
    setUserAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: optionIndex
    }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleCheckPracticeAnswer = () => {
    setCheckedQuestions(prev => ({
      ...prev,
      [currentQuestion.id]: true
    }));
  };

  const handleResetPracticeAnswer = () => {
    setCheckedQuestions(prev => ({
      ...prev,
      [currentQuestion.id]: false
    }));
    setUserAnswers(prev => {
      const copy = { ...prev };
      delete copy[currentQuestion.id];
      return copy;
    });
  };

  const handleJumpToQuestion = (index: number) => {
    setCurrentIndex(index);
  };

  const formatTime = (seconds: number) => {
    if (seconds <= 0) return "00:00";
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    const pad = (n: number) => n.toString().padStart(2, "0");
    if (h > 0) {
      return `${pad(h)}:${pad(m)}:${pad(s)}`;
    }
    return `${pad(m)}:${pad(s)}`;
  };

  const totalAnswered = Object.keys(userAnswers).length;
  const progressPercent = Math.round((totalAnswered / questions.length) * 100);

  // SVG graphic helper for Abstract Reasoning Pattern 1
  const renderAbstractPattern1 = () => {
    return (
      <div className="w-full max-w-sm mx-auto p-4 bg-slate-50 border border-slate-100 rounded-xl my-4">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center mb-2">Overlay Logical Pyramid</p>
        <svg viewBox="0 0 400 240" className="w-full h-auto drop-shadow-sm">
          {/* Grid lines */}
          <line x1="140" y1="180" x2="175" y2="110" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="3 3" />
          <line x1="260" y1="180" x2="225" y2="110" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="3 3" />
          <line x1="200" y1="180" x2="175" y2="110" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="3 3" />
          <line x1="200" y1="180" x2="225" y2="110" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="3 3" />
          <line x1="175" y1="90" x2="200" y2="40" stroke="#94a3b8" strokeWidth="2" />
          <line x1="225" y1="90" x2="200" y2="40" stroke="#94a3b8" strokeWidth="2" />

          {/* Row 3 (Bottom) */}
          {/* Circle 1: Vertical Line */}
          <circle cx="140" cy="195" r="22" fill="#ffffff" stroke="#475569" strokeWidth="2" />
          <line x1="140" y1="176" x2="140" y2="214" stroke="#0f172a" strokeWidth="3" />
          <text x="140" y="232" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#64748b">Left Node</text>

          {/* Circle 2: Horizontal Line */}
          <circle cx="200" cy="195" r="22" fill="#ffffff" stroke="#475569" strokeWidth="2" />
          <line x1="181" y1="195" x2="219" y2="195" stroke="#0f172a" strokeWidth="3" />
          <text x="200" y="232" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#64748b">Middle Node</text>

          {/* Circle 3: Diagonal Line */}
          <circle cx="260" cy="195" r="22" fill="#ffffff" stroke="#475569" strokeWidth="2" />
          <line x1="244" y1="211" x2="276" y2="179" stroke="#0f172a" strokeWidth="3" />
          <text x="260" y="232" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#64748b">Right Node</text>

          {/* Row 2 (Middle) */}
          {/* Circle Middle-Left (Cross: Left + Middle) */}
          <circle cx="175" cy="100" r="22" fill="#ffffff" stroke="#475569" strokeWidth="2" />
          <line x1="175" y1="81" x2="175" y2="119" stroke="#0f172a" strokeWidth="3" />
          <line x1="156" y1="100" x2="194" y2="100" stroke="#0f172a" strokeWidth="3" />

          {/* Circle Middle-Right (Diag + Horiz) */}
          <circle cx="225" cy="100" r="22" fill="#ffffff" stroke="#475569" strokeWidth="2" />
          <line x1="206" y1="100" x2="244" y2="100" stroke="#0f172a" strokeWidth="3" />
          <line x1="209" y1="116" x2="241" y2="84" stroke="#0f172a" strokeWidth="3" />

          {/* Row 1 (Top) */}
          {/* Target with Question Mark */}
          <circle cx="200" cy="30" r="22" fill="#f8fafc" stroke="#dc2626" strokeWidth="2" strokeDasharray="3 2" />
          <text x="200" y="35" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#dc2626">?</text>
        </svg>
      </div>
    );
  };

  // SVG graphic helper for Abstract Reasoning Pattern 2
  const renderAbstractPattern2 = () => {
    return (
      <div className="w-full max-w-sm mx-auto p-4 bg-slate-50 border border-slate-100 rounded-xl my-4 flex flex-col items-center">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center mb-3">Rotation Sequence</p>
        <div className="flex gap-4 items-center">
          {/* Box 1: UP */}
          <div className="flex flex-col items-center gap-1">
            <div className="w-14 h-14 bg-white border border-slate-300 rounded-lg flex items-center justify-center relative">
              <svg viewBox="0 0 40 40" className="w-10 h-10">
                <line x1="20" y1="32" x2="20" y2="8" stroke="#0f172a" strokeWidth="2.5" markerEnd="url(#arrow)" />
                <polygon points="20,5 16,11 24,11" fill="#0f172a" />
              </svg>
            </div>
            <span className="text-[9px] font-mono text-slate-400">Frame 1</span>
          </div>

          <span className="text-slate-300">→</span>

          {/* Box 2: RIGHT */}
          <div className="flex flex-col items-center gap-1">
            <div className="w-14 h-14 bg-white border border-slate-300 rounded-lg flex items-center justify-center relative">
              <svg viewBox="0 0 40 40" className="w-10 h-10">
                <line x1="8" y1="20" x2="32" y2="20" stroke="#0f172a" strokeWidth="2.5" />
                <polygon points="35,20 29,16 29,24" fill="#0f172a" />
              </svg>
            </div>
            <span className="text-[9px] font-mono text-slate-400">Frame 2</span>
          </div>

          <span className="text-slate-300">→</span>

          {/* Box 3: DOWN */}
          <div className="flex flex-col items-center gap-1">
            <div className="w-14 h-14 bg-white border border-slate-300 rounded-lg flex items-center justify-center relative">
              <svg viewBox="0 0 40 40" className="w-10 h-10">
                <line x1="20" y1="8" x2="20" y2="32" stroke="#0f172a" strokeWidth="2.5" />
                <polygon points="20,35 16,29 24,29" fill="#0f172a" />
              </svg>
            </div>
            <span className="text-[9px] font-mono text-slate-400">Frame 3</span>
          </div>

          <span className="text-slate-300">→</span>

          {/* Box 4: ? */}
          <div className="flex flex-col items-center gap-1">
            <div className="w-14 h-14 bg-red-50/50 border border-red-200 border-dashed rounded-lg flex items-center justify-center relative animate-pulse">
              <span className="text-red-500 font-bold text-sm">?</span>
            </div>
            <span className="text-[9px] font-mono text-red-400">Frame 4</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col lg:flex-row gap-6 relative">
      
      {/* LEFT: Central Question Workspace */}
      <div className="flex-1 bg-white border border-slate-100 rounded-2xl p-5 md:p-6 shadow-sm flex flex-col justify-between">
        <div>
          {/* SUBJECT CATEGORY TICKER */}
          <div className="flex flex-wrap items-center justify-between pb-4 border-b border-slate-100 mb-6 gap-3">
            <div className="flex items-center gap-2.5">
              <button
                onClick={onGoBack}
                className="p-1.5 hover:bg-slate-50 text-slate-500 hover:text-slate-800 rounded-md border border-slate-150 transition-all"
                title="Cancel Exam and Go Back"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-red-50 dark:bg-rose-950/20 text-red-600 dark:text-red-400 font-semibold text-[10px] tracking-wide rounded uppercase">
                    {currentQuestion.category}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    ({currentQuestion.subcategory})
                  </span>
                </div>
                <h2 className="text-xs text-slate-400 font-medium mt-0.5">
                  Civil Service Practicum — {level} Syllabus
                </h2>
              </div>
            </div>

            {/* TIMER & PROGRESS CORNER */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-slate-600 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100 text-xs font-mono">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>
                  {isPracticeMode ? `Practice Mode (${formatTime(secondsElapsed)})` : `Time Left: ${formatTime(timeLeft)}`}
                </span>
              </div>
              
              {!isPracticeMode && (
                <button
                  onClick={handleForceSubmit}
                  className="py-1.5 px-3 bg-red-600 hover:bg-red-700 text-white font-medium text-xs rounded-lg shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-red-400 flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Exam</span>
                </button>
              )}
            </div>
          </div>

          {/* ACTIVE QUESTION COMPONENT */}
          <div className="space-y-4">
            
            {/* ProgressBar */}
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mb-5">
              <div
                className="bg-red-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>

            {/* Reading Passage if defined */}
            {currentQuestion.passage && (
              <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl max-h-52 overflow-y-auto mb-4 italic text-slate-700 font-serif text-sm leading-relaxed whitespace-pre-line shadow-inner">
                {currentQuestion.passage}
              </div>
            )}

            {/* Custom SVG Graphics for Abstract Reasoning */}
            {currentQuestion.isAbstractReasoning && (
              <>
                {currentQuestion.id === "ar_1" && renderAbstractPattern1()}
                {currentQuestion.id === "ar_2" && renderAbstractPattern2()}
              </>
            )}

            {/* Question Text */}
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-red-500">
                Question {currentIndex + 1} of {questions.length}
              </span>
              <h3 className="text-slate-800 text-sm md:text-base font-medium leading-relaxed font-sans">
                {currentQuestion.questionText}
              </h3>
                        {/* Multiple Choice Options */}
            <div className="grid grid-cols-1 gap-2.5 mt-5">
              {currentQuestion.options.map((option, idx) => {
                const label = String.fromCharCode(97 + idx); // a, b, c, d
                const isSelected = userAnswers[currentQuestion.id] === idx;
                const isChecked = checkedQuestions[currentQuestion.id];
                const isCorrect = idx === currentQuestion.correctOptionIndex;

                let optionStyle = "border-slate-200 bg-white hover:border-slate-350 hover:bg-slate-50/50 text-slate-700";
                let badgeStyle = "bg-slate-100 text-slate-500 border-slate-200";

                if (isSelected) {
                  optionStyle = "border-2 border-blue-600 bg-blue-50/15 text-blue-900 font-medium";
                  badgeStyle = "bg-blue-600 text-white border-blue-600";
                }

                // If in practice mode and verified
                if (isPracticeMode && isChecked) {
                  if (isSelected) {
                    if (isCorrect) {
                      optionStyle = "border-2 border-emerald-500 bg-emerald-50 text-emerald-900 font-semibold";
                      badgeStyle = "bg-emerald-500 text-white border-emerald-500";
                    } else {
                      optionStyle = "border-2 border-rose-500 bg-rose-50 text-rose-900 font-semibold";
                      badgeStyle = "bg-rose-500 text-white border-rose-505";
                    }
                  } else if (isCorrect) {
                    optionStyle = "border-2 border-emerald-500 bg-emerald-50 text-emerald-900 font-semibold";
                    badgeStyle = "bg-emerald-500 text-white border-emerald-500";
                  } else {
                    optionStyle = "border-slate-200 bg-white opacity-40 text-slate-400";
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    disabled={isPracticeMode && isChecked}
                    className={`w-full p-4 border rounded-xl flex items-center gap-4 text-left transition-all focus:outline-none text-xs md:text-sm font-sans cursor-pointer ${optionStyle}`}
                  >
                    <span className={`w-7 h-7 rounded-full border flex items-center justify-center font-mono text-xs font-bold shrink-0 ${badgeStyle}`}>
                      {label.toUpperCase()}
                    </span>
                    <span className="flex-1">{option}</span>
                  </button>
                );
              })}
            </div>

            {/* Practice Mode Actions & Instants Explanations */}
            {isPracticeMode && (
              <div className="pt-2 border-t border-slate-200 mt-6 flex flex-col gap-3">
                <div className="flex gap-2.5">
                  {userAnswers[currentQuestion.id] !== undefined && !checkedQuestions[currentQuestion.id] && (
                    <button
                      onClick={handleCheckPracticeAnswer}
                      className="py-2 px-5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-colors focus:outline-none flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Check My Answer</span>
                    </button>
                  )}
                  {checkedQuestions[currentQuestion.id] && (
                    <button
                      onClick={handleResetPracticeAnswer}
                      className="py-2 px-5 bg-slate-100 hover:bg-slate-200 border border-slate-350 text-slate-700 font-bold text-xs uppercase tracking-wider rounded-lg transition-colors focus:outline-none flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reset Choice</span>
                    </button>
                  )}
                </div>

                {/* Instant Feedback Text & AI Explainer inside active practicing */}
                {checkedQuestions[currentQuestion.id] && (
                  <div className="space-y-4">
                    {userAnswers[currentQuestion.id] === currentQuestion.correctOptionIndex ? (
                      <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-850 text-xs md:text-sm flex gap-3 shadow-xs">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                        <div>
                          <strong className="font-bold text-emerald-950 block uppercase tracking-wide text-xs">Exquisite! Correct Answer</strong>
                          <p className="mt-1 leading-relaxed">{currentQuestion.explanation || "Your selected choice matches the correct syllabus concept perfectly."}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-850 text-xs md:text-sm flex gap-3 shadow-xs">
                        <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                        <div>
                          <strong className="font-bold text-rose-950 block uppercase tracking-wide text-xs">Incorrect Choice</strong>
                          <p className="mt-1 leading-relaxed">
                            Correct is <span className="font-bold text-emerald-700">{String.fromCharCode(65 + currentQuestion.correctOptionIndex)}: {currentQuestion.options[currentQuestion.correctOptionIndex]}</span>. 
                          </p>
                          <p className="text-xs text-slate-500 mt-1">
                            {currentQuestion.explanation || "Review the key details or activate our AI Coach below to understand the concept discrepancies."}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* AI explanation is triggered below if they get it wrong */}
                    {userAnswers[currentQuestion.id] !== currentQuestion.correctOptionIndex && (
                      <ExplainWrongAnswers
                        question={currentQuestion}
                        userAnswerIndex={userAnswers[currentQuestion.id]}
                      />
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* BOTTOM PAGINATION ROWS */}
        <div className="flex items-center justify-between pt-6 border-t border-slate-200 mt-8 gap-4">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="py-2 px-4 hover:bg-slate-50 border border-slate-350 text-slate-600 text-xs font-bold rounded-lg shadow-xs disabled:opacity-30 disabled:pointer-events-none transition-all flex items-center gap-1 focus:outline-none cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous Question</span>
          </button>
          
          <div className="text-xs font-mono text-slate-400 font-bold shrink-0 bg-slate-50 px-3 py-1.5 rounded-md border border-slate-200">
            {currentIndex + 1} / {questions.length} COMPLETE
          </div>

          <button
            onClick={handleNext}
            disabled={currentIndex === questions.length - 1}
            className="py-2 px-4 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg shadow-xs disabled:opacity-30 disabled:pointer-events-none transition-all flex items-center gap-1 focus:outline-none cursor-pointer"
          >
            <span>Next Question</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* RIGHT: BUBBLE SHEET SIDEBAR (Mirrors authentic exam sheets) */}
      <div className="w-full lg:w-72 bg-white border border-slate-200 rounded-xl p-5 shadow-sm shrink-0 flex flex-col justify-between max-h-[640px] overflow-y-auto">
        <div>
          <div className="flex items-center gap-2 pb-3 border-b border-slate-200 mb-4">
            <LayoutGrid className="w-4 h-4 text-blue-600 shrink-0" />
            <h3 className="font-bold text-xs text-slate-800 tracking-wide uppercase">
              Question Navigator
            </h3>
          </div>

          <p className="text-[10px] text-slate-400 mb-3 leading-relaxed">
            {isPracticeMode 
              ? "Practice mode active. Square nodes identify correct/incorrect solutions instantly." 
              : "Simulated exam active. Bubbled squares report answers securely."}
          </p>

          {/* Render bubbles list as elegant styled navigator squares matching Professional Polish theme */}
          <div className="grid grid-cols-5 sm:grid-cols-10 lg:grid-cols-4 gap-2">
            {questions.map((q, idx) => {
              const isCurrent = idx === currentIndex;
              const hasAnswered = userAnswers[q.id] !== undefined;
              const isChecked = checkedQuestions[q.id];
              const isAnswerCorrect = userAnswers[q.id] === q.correctOptionIndex;

              let bubbleBg = "border-slate-200 bg-slate-50 text-slate-400";

              if (hasAnswered) {
                if (isPracticeMode && isChecked) {
                  if (isAnswerCorrect) {
                    bubbleBg = "border-emerald-500 bg-emerald-50 text-emerald-700";
                  } else {
                    bubbleBg = "border-rose-500 bg-rose-50 text-rose-700";
                  }
                } else {
                  bubbleBg = "border-slate-800 bg-slate-800 text-white";
                }
              }

              if (isCurrent) {
                bubbleBg = "border-2 border-blue-600 bg-blue-600 text-white font-black ring-2 ring-blue-100 shadow-sm";
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleJumpToQuestion(idx)}
                  className={`w-10 h-10 rounded border text-xs font-mono font-bold flex flex-col items-center justify-center transition-all focus:outline-none cursor-pointer ${bubbleBg}`}
                >
                  <span>{String(idx + 1).padStart(2, '0')}</span>
                </button>
              );
            })}
          </div>

          {/* Professional Polish Navigator Legend Block */}
          <div className="mt-4 pt-4 border-t border-slate-100 text-[10px] text-slate-500 space-y-2 select-none">
            <div className="flex items-center">
              <span className="inline-block w-3 h-3 bg-emerald-500 rounded-sm mr-2 shrink-0"></span>
              <span>Correct Answer Node</span>
            </div>
            <div className="flex items-center">
              <span className="inline-block w-3 h-3 bg-rose-500 rounded-sm mr-2 shrink-0"></span>
              <span>Incorrect Answer Node</span>
            </div>
            <div className="flex items-center">
              <span className="inline-block w-3 h-3 bg-blue-600 rounded-sm mr-2 shrink-0"></span>
              <span>Current Selection Node</span>
            </div>
            <div className="flex items-center">
              <span className="inline-block w-3 h-3 bg-slate-800 rounded-sm mr-2 shrink-0"></span>
              <span>Bubbled Answer Draft</span>
            </div>
          </div>
        </div>

        {/* METRICS PANEL IN BUBBLE FOOTER */}
        <div className="pt-4 border-t border-slate-200 mt-5 space-y-2 text-xs">
          <div className="flex items-center justify-between text-slate-500">
            <span>Total Questions:</span>
            <span className="font-bold text-slate-800 font-mono">{questions.length}</span>
          </div>
          <div className="flex items-center justify-between text-slate-500">
            <span>Bubbled Items:</span>
            <span className="font-bold text-slate-800 font-mono">{totalAnswered}</span>
          </div>
          <div className="flex items-center justify-between text-slate-500">
            <span>Unbubbled:</span>
            <span className="font-bold text-red-500 font-mono">{questions.length - totalAnswered}</span>
          </div>

          {!isPracticeMode && (
            <div className="p-3 bg-red-50/55 border border-red-100 rounded-lg flex items-start gap-2 mt-4 text-[10px] text-red-700 leading-relaxed shadow-sm">
              <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5 text-red-600" />
              <span>
                Do not leave items blank. There is no penalty for guessing in the Civil Service Examination.
              </span>
            </div>
          )}
        </div>
      </div>  </div>

    </div>
  );
}
