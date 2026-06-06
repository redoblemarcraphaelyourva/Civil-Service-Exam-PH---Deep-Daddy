import { Award, Brain, CheckCircle2, RotateCw, Trophy, XCircle, AlertCircle, Calendar } from "lucide-react";
import { Question, SubjectCategory, SubjectStats, LevelOfExam } from "../types";
import ExplainWrongAnswers from "./ExplainWrongAnswers";

interface ExamResultsProps {
  questions: Question[];
  userAnswers: { [questionId: string]: number };
  elapsedSeconds: number;
  level: LevelOfExam;
  onRestart: () => void;
}

export default function ExamResults({ questions, userAnswers, elapsedSeconds, level, onRestart }: ExamResultsProps) {
  // Compute Results
  let score = 0;
  const incorrectQuestions: { question: Question; userOptionIndex: number }[] = [];

  questions.forEach(q => {
    const isCorrect = userAnswers[q.id] === q.correctOptionIndex;
    if (isCorrect) {
      score++;
    } else {
      incorrectQuestions.push({
        question: q,
        userOptionIndex: userAnswers[q.id] === undefined ? -1 : userAnswers[q.id]
      });
    }
  });

  const totalQuestions = questions.length;
  const finalPercentage = Math.round((score / totalQuestions) * 100);
  const isPassed = finalPercentage >= 80; // 80% passing grade for Civil Service Exams

  // Group by category to display standard topic breakdowns
  const categoryStats: { [cat: string]: { correct: number; total: number } } = {};
  
  questions.forEach(q => {
    if (!categoryStats[q.category]) {
      categoryStats[q.category] = { correct: 0, total: 0 };
    }
    categoryStats[q.category].total++;
    if (userAnswers[q.id] === q.correctOptionIndex) {
      categoryStats[q.category].correct++;
    }
  });

  const subjectBreakdowns: SubjectStats[] = Object.keys(categoryStats).map(catName => ({
    category: catName as SubjectCategory,
    total: categoryStats[catName].total,
    correct: categoryStats[catName].correct,
    percentage: Math.round((categoryStats[catName].correct / categoryStats[catName].total) * 100)
  }));

  const formatDuration = (totalSecs: number) => {
    const m = Math.floor(totalSecs / 60);
    const s = totalSecs % 60;
    return `${m}m ${s}s`;
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* 1. OVERALL SCORE & RATING BANNER */}
      <div className={`border rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 shadow-sm transition-all ${
        isPassed 
          ? "bg-slate-900 border-slate-800 text-slate-100" 
          : "bg-slate-900 border-slate-800 text-slate-150"
      }`}>
        {/* Visual score circle badge */}
        <div className="relative w-28 h-28 md:w-32 md:h-32 shrink-0 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="#1e293b"
              strokeWidth="10"
              fill="transparent"
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke={isPassed ? "#10b981" : "#ef4444"}
              strokeWidth="10"
              fill="transparent"
              strokeDasharray={`${2.51 * finalPercentage} 251.2`}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950 rounded-full mx-2 my-2 shadow-inner">
            <span className="text-2xl md:text-3xl font-mono font-bold text-white">{score}/{totalQuestions}</span>
            <span className="text-[9px] uppercase font-bold text-slate-400 font-mono tracking-widest">{finalPercentage}% score</span>
          </div>
        </div>

        {/* Text descriptions */}
        <div className="flex-1 text-center md:text-left space-y-2">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
            <span className={`px-3 py-1 rounded-md text-[9px] font-bold tracking-widest uppercase flex items-center gap-1 ${
              isPassed ? "bg-emerald-600 text-white" : "bg-red-600 text-white"
            }`}>
              {isPassed ? <Trophy className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />}
              <span>{isPassed ? "Syllabus Passed" : "Re-Review Recommended"}</span>
            </span>
            <span className="px-2.5 py-1 bg-slate-800 text-slate-300 rounded text-[10px] uppercase font-bold tracking-wide font-mono">
              CSE {level} LEVELS
            </span>
          </div>
          
          <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white uppercase font-sans">
            {isPassed 
              ? "Congratulations, Exam Passed!" 
              : "Further review recommended"}
          </h2>
          <p className="text-xs text-slate-300 max-w-lg leading-relaxed">
            {isPassed
              ? "You successfully passed the comprehensive 80% passing accuracy standard set by standard Civil Service Board simulations."
              : "Official Philippine accreditation requires a minimum score of 80% accuracy. We recommend revising item notes and trying this mock bank again."}
          </p>

          <div className="flex flex-wrap justify-center md:justify-start gap-4 text-xs pt-2">
            <div className="text-slate-400 font-mono text-[11px]">
              Duration Allowed: <span className="font-bold text-slate-200">{formatDuration(totalQuestions * 60)}</span>
            </div>
            <div className="text-slate-400 font-mono text-[11px]">
              Your Elapsed Time: <span className="font-bold text-slate-200">{formatDuration(elapsedSeconds)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. SUBJECT-BY-SUBJECT COMPETENCY BREAKDOWNS */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 md:p-6 shadow-sm">
        <h3 className="text-xs font-bold text-slate-800 uppercase tracking-widest mb-4 flex items-center gap-2">
          <Award className="w-4 h-4 text-blue-600" />
          <span>Competency Group Breakdown</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {subjectBreakdowns.map((subj, idx) => {
            const isSubjPassed = subj.percentage >= 80;
            return (
              <div key={idx} className="p-4 border border-slate-200 rounded-xl bg-slate-50/50">
                <div className="flex items-center justify-between text-xs mb-1.5 font-sans">
                  <span className="font-semibold text-slate-800 uppercase tracking-wide text-[11px]">{subj.category}</span>
                  <span className="font-bold text-slate-700 font-mono text-[11px]">{subj.correct}/{subj.total} answered ({subj.percentage}%)</span>
                </div>
                
                {/* Visual bar meter */}
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden mb-2">
                  <div
                    className={`h-full rounded-full transition-all ${
                      isSubjPassed ? "bg-emerald-500" : "bg-rose-500"
                    }`}
                    style={{ width: `${subj.percentage}%` }}
                  ></div>
                </div>

                <div className="flex justify-between items-center text-[10px]">
                  <span className="text-slate-400">Accreditation benchmark: 80%</span>
                  <span className={`font-bold uppercase tracking-wider font-mono ${
                    isSubjPassed ? "text-emerald-600" : "text-rose-500"
                  }`}>
                    {isSubjPassed ? "Proficient" : "Re-Learn Topic"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. DETAILED ERROR CORRECTION LIST & AI COACH PROXIES */}
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-200">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-widest flex items-center gap-2">
            <Brain className="w-4 h-4 text-blue-600" />
            <span>AI Guided Error Corrections ({incorrectQuestions.length})</span>
          </h3>
          <span className="text-[10px] text-slate-400 italic">Explore itemized feedback for incorrect results</span>
        </div>

        {incorrectQuestions.length === 0 ? (
          <div className="p-8 bg-emerald-50/20 border border-emerald-100 text-center rounded-2xl max-w-md mx-auto space-y-2">
            <Trophy className="w-10 h-10 text-emerald-500 mx-auto animate-bounce" />
            <h4 className="font-bold text-emerald-950">Flawless 100% Score!</h4>
            <p className="text-xs text-emerald-700 leading-relaxed">
              You answered all syllabus questions correctly! You exhibit absolute readiness for the official Civil Service Examination.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {incorrectQuestions.map(({ question, userOptionIndex }, idx) => {
              const correctLabel = String.fromCharCode(65 + question.correctOptionIndex);
              const userLabel = userOptionIndex === -1 ? "Skipped" : String.fromCharCode(65 + userOptionIndex);

              return (
                <div key={idx} className="bg-white border border-slate-200 shadow-sm rounded-xl p-5 space-y-3.5 relative overflow-hidden transition-all hover:border-slate-300">
                  {/* Subject and tags bar */}
                  <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono text-slate-400">
                    <span className="text-slate-400 block font-bold">ITEM REVIEW #{idx + 1}</span>
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-600 border border-slate-250 rounded font-bold uppercase shrink-0">
                      {question.category} — {question.subcategory}
                    </span>
                  </div>

                  {/* Reading Passage Context if defined */}
                  {question.passage && (
                    <div className="p-3 bg-slate-50 border border-slate-200 text-xs italic font-serif text-slate-650 rounded-lg max-h-36 overflow-y-auto leading-relaxed shadow-inner">
                      {question.passage}
                    </div>
                  )}

                  {/* Question Title */}
                  <h4 className="text-slate-800 text-sm font-semibold font-sans leading-relaxed">
                    {question.questionText}
                  </h4>

                  {/* Key choices labels comparison */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div className="p-3.5 rounded-lg bg-rose-50/40 border border-rose-200 font-sans flex items-start gap-2.5">
                      <XCircle className="w-4 h-4 text-rose-550 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[9px] text-rose-500 block uppercase font-bold tracking-widest font-mono">Your Bubble Answer</span>
                        <strong className="text-rose-950 font-bold mt-1 block">
                          {userOptionIndex === -1 ? "(No bubble selected)" : `${userLabel}: ${question.options[userOptionIndex]}`}
                        </strong>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-lg bg-emerald-50/40 border border-emerald-200 font-sans flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-550 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[9px] text-emerald-500 block uppercase font-bold tracking-widest font-mono">Expected Syllabus Answer</span>
                        <strong className="text-emerald-950 font-bold mt-1 block">
                          {correctLabel}: {question.options[question.correctOptionIndex]}
                        </strong>
                      </div>
                    </div>
                  </div>

                  {/* Dynamic Gemini explainer widget */}
                  <div className="pt-2">
                    <ExplainWrongAnswers
                      question={question}
                      userAnswerIndex={userOptionIndex}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 4. ACTIONS FOOTER PANEL */}
      <div className="pt-6 border-t border-slate-200 flex flex-wrap justify-between items-center gap-4">
        <button
          onClick={onRestart}
          className="w-full sm:w-auto py-3 px-6 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow transition-colors focus:ring-2 focus:ring-slate-800 flex items-center justify-center gap-2 cursor-pointer"
        >
          <RotateCw className="w-4 h-4" />
          <span>Exit Results & Practice More</span>
        </button>
      </div>

    </div>
  );
}
