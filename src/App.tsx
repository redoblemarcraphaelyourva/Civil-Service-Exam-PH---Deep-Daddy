import { useState, useEffect } from "react";
import { BookOpen, Sparkles, Trophy, AlignJustify, HelpCircle, FileText, CheckCircle2, ListFilter, Trash2, ShieldAlert } from "lucide-react";
import { LevelOfExam, Question, SubjectCategory } from "./types";
import { mathematicsQuestions } from "./data/mathematics";
import { englishQuestions } from "./data/english";
import { filipinoQuestions } from "./data/filipino";
import { logicAndConstitutionQuestions } from "./data/logicAndConstitution";
import ActiveExam from "./components/ActiveExam";
import ExamResults from "./components/ExamResults";
import { generate180Questions } from "./utils/mockGenerator";

// Firebase Integration imports
import { signInAnonymously, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "./lib/firebase";
import {
  StudentProfile,
  recordExamAttempt,
  fetchStudentAttempts,
  testDatabaseConnection,
} from "./utils/firebaseService";
import { seedDemoAccountsIfEmpty } from "./utils/seeder";
import StudentAccountSelector from "./components/StudentAccountSelector";
import AdminDashboard from "./components/AdminDashboard";

// Combine question bank
const ALL_QUESTIONS: Question[] = [
  ...mathematicsQuestions,
  ...englishQuestions,
  ...filipinoQuestions,
  ...logicAndConstitutionQuestions
];

interface HistoryRecord {
  date: string;
  score: number;
  total: number;
  percentage: number;
  level: LevelOfExam;
  elapsedSeconds: number;
}

export default function App() {
  // Application Screen states: "HOME" | "EXAM" | "RESULTS"
  const [screen, setScreen] = useState<"HOME" | "EXAM" | "RESULTS">("HOME");
  
  // Quiz parameters
  const [level, setLevel] = useState<LevelOfExam>(LevelOfExam.PROFESSIONAL);
  const [isPracticeMode, setIsPracticeMode] = useState(false);
  const [selectedPracticeCategory, setSelectedSelectedCategory] = useState<SubjectCategory | "ALL">("ALL");

  // Running session info
  const [sessionQuestions, setSessionQuestions] = useState<Question[]>([]);
  const [userAnswers, setUserAnswers] = useState<{ [qId: string]: number }>({});
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  // Persistence for scores
  const [history, setHistory] = useState<HistoryRecord[]>([]);

  // Examinee Multi-Account admin states
  const [currentStudent, setCurrentStudent] = useState<StudentProfile | null>(null);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isDBReady, setIsDBReady] = useState(false);

  // Seeding and anonymous auth on mount
  useEffect(() => {
    async function setupDatabaseAndSync() {
      // 1. Initialized seeder
      await seedDemoAccountsIfEmpty();
      // 2. Verified connection
      await testDatabaseConnection();
      
      // 3. Auto-authenticated for database sandbox access
      try {
        await signInAnonymously(auth);
      } catch (err) {
        console.warn("Could not sign-in session anonymously. Running local mode.", err);
      }
      setIsDBReady(true);
    }
    setupDatabaseAndSync();
  }, []);

  // Monitor auth changes to locate corresponding student profile
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (u) {
        try {
          const profileDoc = await getDoc(doc(db, "users", u.uid));
          if (profileDoc.exists()) {
            setCurrentStudent(profileDoc.data() as StudentProfile);
          }
        } catch (e) {
          console.warn("Profile fetching unverified or rejected by policy rules:", e);
        }
      }
    });
    return () => unsub();
  }, []);

  // Set score scoreboard of selected student profile
  const refreshHistoryForStudent = async (student: StudentProfile | null) => {
    if (!student) {
      // Revert to local standard scoreboard cache backup
      const stored = localStorage.getItem("civil_service_reviewer_high_scores");
      if (stored) {
        try {
          setHistory(JSON.parse(stored));
        } catch (err) {
          setHistory([]);
        }
      } else {
        setHistory([]);
      }
      return;
    }

    try {
      const list = await fetchStudentAttempts(student.uid);
      const formatted: HistoryRecord[] = list
        .filter(x => !x.isPracticeMode) // Only show Mock Exams in core scoreboard
        .map(itm => ({
          date: new Date(itm.submittedAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
          }),
          score: itm.score,
          total: itm.total,
          percentage: itm.percentage,
          level: itm.level as LevelOfExam,
          elapsedSeconds: itm.elapsedSeconds
        }));
      setHistory(formatted);
    } catch (err) {
      console.warn("Error refreshing score history ledger from Cloud:", err);
    }
  };

  useEffect(() => {
    refreshHistoryForStudent(currentStudent);
  }, [currentStudent]);

  useEffect(() => {
    // Only fetch history if not in admin mode
    if (!currentStudent) {
      const stored = localStorage.getItem("civil_service_reviewer_high_scores");
      if (stored) {
        try {
          setHistory(JSON.parse(stored));
        } catch (err) {
          console.error("Failed to parse scoreboard history", err);
        }
      }
    }
  }, []);

  const handleStartPracticeSubject = (category: SubjectCategory | "ALL") => {
    setSelectedSelectedCategory(category);
    setIsPracticeMode(true);
    
    // Filter questions by level suitability AND subject category if not ALL
    let filtered = ALL_QUESTIONS.filter(q => q.level.includes(level));
    if (category !== "ALL") {
      filtered = filtered.filter(q => q.category === category);
    }
    
    setSessionQuestions(filtered);
    setScreen("EXAM");

    // HTML elements unique target IDs
    const rootEl = document.getElementById("root");
    if (rootEl) rootEl.scrollIntoView({ behavior: "smooth" });
  };

  const handleStartMockExam = () => {
    setIsPracticeMode(false);
    setSelectedSelectedCategory("ALL");

    // Dynamic generation of an authentic, comprehensive, balanced 180-item examinee pool
    const selected = generate180Questions(ALL_QUESTIONS, level);

    setSessionQuestions(selected);
    setScreen("EXAM");

    // Smooth scroll back to top of workspace
    const rootEl = document.getElementById("root");
    if (rootEl) rootEl.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmitExam = async (answers: { [qId: string]: number }, totalSecs: number) => {
    setUserAnswers(answers);
    setElapsedSeconds(totalSecs);

    let correct = 0;
    sessionQuestions.forEach(q => {
      if (answers[q.id] === q.correctOptionIndex) {
        correct++;
      }
    });
    const percent = Math.round((correct / sessionQuestions.length) * 100);

    // Save only Mock Exam scores to history (Practice mode scores shouldn't clutter mock diagnostics)
    if (!isPracticeMode) {
      const record: HistoryRecord = {
        date: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit"
        }),
        score: correct,
        total: sessionQuestions.length,
        percentage: percent,
        level: level,
        elapsedSeconds: totalSecs
      };

      const updated = [record, ...history].slice(0, 10); // keep last 10 attempts
      setHistory(updated);
      localStorage.setItem("civil_service_reviewer_high_scores", JSON.stringify(updated));
    }

    // Save synchronously to active Firestore student profile if defined
    if (currentStudent) {
      try {
        await recordExamAttempt(
          currentStudent.uid,
          level,
          correct,
          sessionQuestions.length,
          percent,
          totalSecs,
          isPracticeMode,
          isPracticeMode ? selectedPracticeCategory : "ALL"
        );
        console.log("Exam successfully uploaded to cloud profile database.");
      } catch (err) {
        console.error("Cloud database syncing problem:", err);
      }
    }

    setScreen("RESULTS");
    const rootEl = document.getElementById("root");
    if (rootEl) rootEl.scrollIntoView({ behavior: "smooth" });
  };

  const handleResetToHome = () => {
    setScreen("HOME");
    setUserAnswers({});
    setSessionQuestions([]);
    setElapsedSeconds(0);
    const rootEl = document.getElementById("root");
    if (rootEl) rootEl.scrollIntoView({ behavior: "smooth" });
  };

  const handleClearHistory = () => {
    if (confirm("Are you sure you want to clear your Mock Exam History? This cannot be undone.")) {
      setHistory([]);
      localStorage.removeItem("civil_service_reviewer_high_scores");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 py-6 px-4 sm:px-6 md:px-8 font-sans transition-colors duration-150 relative">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* TOP BRANDING BAR (PROFESSIONAL POLISH DESIGN) */}
        <header className="w-full bg-slate-900 text-white rounded-2xl shadow-lg border border-slate-800 overflow-hidden relative">
          {/* Subtle geometric overlay */}
          <div className="absolute top-0 right-0 w-80 h-full bg-gradient-to-l from-blue-600/10 to-transparent pointer-events-none"></div>
          
          <div className="p-6 md:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 text-center sm:text-left">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center font-black text-xl text-white shadow-md shrink-0">
                C
              </div>
              <div className="space-y-1">
                <div className="flex flex-wrap justify-center sm:justify-start items-center gap-2">
                  <span className="px-2.5 py-0.5 bg-blue-500/20 text-blue-300 border border-blue-500/30 text-[9px] font-mono tracking-widest font-bold uppercase rounded">
                    CSC Comprehensive Review
                  </span>
                  <span className="px-2 py-0.5 bg-slate-800 text-slate-300 text-[10px] font-mono rounded">
                    2026 Ready
                  </span>
                </div>
                <h1 className="text-xl md:text-2xl font-bold tracking-tight uppercase">
                  Civil Service Exam Portal
                </h1>
              </div>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-3">
              <div className="bg-slate-800 border border-slate-700 px-4 py-2 rounded-xl text-center">
                <span className="text-[9px] text-slate-400 block uppercase font-bold tracking-wider font-mono">Passing Grade</span>
                <span className="text-xs font-bold text-emerald-400 font-mono">80.0% Minimum Score</span>
              </div>
              <div className="bg-slate-800 border border-slate-700 px-4 py-2 rounded-xl text-center">
                <span className="text-[9px] text-slate-400 block uppercase font-bold tracking-wider font-mono">Current Status</span>
                <span className="text-xs font-bold text-blue-400 uppercase">Active Review</span>
              </div>
            </div>
          </div>
        </header>

        {/* EXAMINEE MULTI-ACCOUNT WORKSPACE SELECTOR */}
        <StudentAccountSelector
          currentStudent={currentStudent}
          onSelectStudent={setCurrentStudent}
          isAdminMode={isAdminMode}
          onToggleAdminMode={setIsAdminMode}
          onRefreshHistory={() => refreshHistoryForStudent(currentStudent)}
        />

        {/* WORKSPACE CONTENT ROUTER */}
        {isAdminMode ? (
          <div className="animate-fadeIn">
            <AdminDashboard
              onBack={() => setIsAdminMode(false)}
              onSelectStudentAsActive={(stud) => {
                setCurrentStudent(stud);
                setIsAdminMode(false);
              }}
            />
          </div>
        ) : (
          <>
            {screen === "HOME" && (
          <div className="space-y-6 animate-fadeIn">
            
            {/* PANEL: SYLLABUS PARAMETERS */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
              
              {/* Level options toggler */}
              <div className="md:col-span-6 flex flex-col justify-between space-y-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Select Scope Niveau</span>
                  <h3 className="text-sm font-bold text-slate-800">Accreditation Exam Level</h3>
                </div>
                
                <div className="grid grid-cols-1 gap-2.5">
                  <button
                    onClick={() => setLevel(LevelOfExam.PROFESSIONAL)}
                    className={`p-4 rounded-xl border text-left transition-all focus:outline-none flex gap-3 cursor-pointer ${
                      level === LevelOfExam.PROFESSIONAL 
                        ? "border-blue-600 bg-blue-50/25 ring-2 ring-blue-500/20" 
                        : "border-slate-200 hover:border-slate-300 bg-white"
                    }`}
                  >
                    <div className="mt-0.5 shrink-0">
                      <div className={`w-4 h-4 rounded-full border-4 flex items-center justify-center ${
                        level === LevelOfExam.PROFESSIONAL ? "border-blue-600" : "border-slate-300"
                      }`}>
                        {level === LevelOfExam.PROFESSIONAL && <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-xs text-slate-800 uppercase tracking-wider">Professional Level</h4>
                      <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                        For career administrative, advisory, and scientific positions. Includes rigorous Word Problems, logic patterns, and Abstract Reasoning.
                      </p>
                    </div>
                  </button>

                  <button
                    onClick={() => setLevel(LevelOfExam.SUB_PROFESSIONAL)}
                    className={`p-4 rounded-xl border text-left transition-all focus:outline-none flex gap-3 cursor-pointer ${
                      level === LevelOfExam.SUB_PROFESSIONAL 
                        ? "border-blue-600 bg-blue-50/25 ring-2 ring-blue-500/20" 
                        : "border-slate-200 hover:border-slate-300 bg-white"
                    }`}
                  >
                    <div className="mt-0.5 shrink-0">
                      <div className={`w-4 h-4 rounded-full border-4 flex items-center justify-center ${
                        level === LevelOfExam.SUB_PROFESSIONAL ? "border-blue-600" : "border-slate-300"
                      }`}>
                        {level === LevelOfExam.SUB_PROFESSIONAL && <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-xs text-slate-800 uppercase tracking-wider">Sub-Professional Level</h4>
                      <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                        For general administrative assistants and custodial support service tiers. Includes focus on **Clerical Operations (Alphabetizing)**.
                      </p>
                    </div>
                  </button>
                </div>
              </div>

              {/* Mode Options card */}
              <div className="hidden md:flex justify-center items-center md:col-span-1">
                <div className="w-px h-full bg-slate-200"></div>
              </div>

              {/* Start Mock Exam Action card */}
              <div className="md:col-span-5 flex">
                <div className="w-full p-6 bg-slate-900 rounded-xl text-white space-y-4 relative overflow-hidden shadow-md flex flex-col justify-between">
                  {/* Subtle radial sheen */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent pointer-events-none"></div>
                  
                  <div className="space-y-3 relative z-10">
                    <span className="bg-red-500/20 text-red-300 border border-red-550/30 text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded inline-block font-mono">
                      Strict Exam Simulation Mode
                    </span>
                    <h3 className="font-bold text-base uppercase tracking-wide">
                      Time-Bound Mock Exam
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Generates a comprehensive, highly accurate simulated exam consisting of exactly 180 questions balanced strictly across all CSE syllabus topics. Simulates official board timer limits (3 hours), complete test layout grids, and historical ledger records.
                    </p>
                  </div>

                  <button
                    onClick={handleStartMockExam}
                    className="w-full py-2.5 px-6 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer shadow-md flex items-center justify-center gap-1.5 relative z-10"
                  >
                    <span>Begin Simulated Exam</span>
                    <Sparkles className="w-3.5 h-3.5 fill-current text-blue-200" />
                  </button>
                </div>
              </div>

            </div>

            {/* SUBJECT PRACTICE CARDS (UNTINED REVIEWER) */}
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Self-Paced Training Modules</span>
                  <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide">Select Competency Subject area</h3>
                </div>
                <span className="text-[9px] text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded font-mono font-bold uppercase tracking-wide">practice training live</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                {/* Mathematics Card */}
                <button
                  onClick={() => handleStartPracticeSubject(SubjectCategory.MATHEMATICS)}
                  className="p-5 bg-white border border-slate-200 rounded-xl flex flex-col justify-between items-start text-left hover:border-blue-600 hover:shadow-md transition-all group focus:outline-none cursor-pointer"
                >
                  <div className="w-10 h-10 bg-blue-50 text-blue-600 group-hover:bg-blue-100 group-hover:text-blue-700 rounded-lg flex items-center justify-center font-black font-mono transition-all">
                    Σ
                  </div>
                  <div className="mt-6 select-none">
                    <h4 className="font-bold text-xs text-slate-800 uppercase tracking-wider group-hover:text-blue-600 transition-colors">Mathematics</h4>
                    <p className="text-[10px] text-slate-500 mt-1 leading-relaxed">Algebra word problems, fractions, data sufficiency</p>
                  </div>
                </button>

                {/* English Card */}
                <button
                  onClick={() => handleStartPracticeSubject(SubjectCategory.ENGLISH)}
                  className="p-5 bg-white border border-slate-200 rounded-xl flex flex-col justify-between items-start text-left hover:border-blue-600 hover:shadow-md transition-all group focus:outline-none cursor-pointer"
                >
                  <div className="w-10 h-10 bg-indigo-50 text-indigo-600 group-hover:bg-indigo-100 group-hover:text-indigo-700 rounded-lg flex items-center justify-center font-bold font-serif transition-colors">
                    Aa
                  </div>
                  <div className="mt-6 select-none">
                    <h4 className="font-bold text-xs text-slate-800 uppercase tracking-wider group-hover:text-blue-600 transition-colors">English Language</h4>
                    <p className="text-[10px] text-slate-500 mt-1 leading-relaxed">Synonyms, word association, syntax correctness</p>
                  </div>
                </button>

                {/* Filipino Card */}
                <button
                  onClick={() => handleStartPracticeSubject(SubjectCategory.FILIPINO)}
                  className="p-5 bg-white border border-slate-200 rounded-xl flex flex-col justify-between items-start text-left hover:border-blue-600 hover:shadow-md transition-all group focus:outline-none cursor-pointer"
                >
                  <div className="w-10 h-10 bg-rose-50 text-rose-600 group-hover:bg-rose-100 group-hover:text-rose-700 rounded-lg flex items-center justify-center font-bold transition-colors">
                    Ph
                  </div>
                  <div className="mt-6 select-none">
                    <h4 className="font-bold text-xs text-slate-800 uppercase tracking-wider group-hover:text-blue-600 transition-colors">Filipino Lang</h4>
                    <p className="text-[10px] text-slate-500 mt-1 leading-relaxed">Kasingkahulugan, wastong gamit, talasalitaan</p>
                  </div>
                </button>

                {/* Constitutional Logic */}
                <button
                  onClick={() => handleStartPracticeSubject(SubjectCategory.CONSTITUTION)}
                  className="p-5 bg-white border border-slate-200 rounded-xl flex flex-col justify-between items-start text-left hover:border-blue-600 hover:shadow-md transition-all group focus:outline-none cursor-pointer"
                >
                  <div className="w-10 h-10 bg-amber-50 text-amber-600 group-hover:bg-amber-100 group-hover:text-amber-700 rounded-lg flex items-center justify-center font-bold transition-colors">
                    ⚖
                  </div>
                  <div className="mt-6 select-none">
                    <h4 className="font-bold text-xs text-slate-800 uppercase tracking-wider group-hover:text-blue-600 transition-colors">Constitution</h4>
                    <p className="text-[10px] text-slate-500 mt-1 leading-relaxed">Phil. Constitution, public ethical values, local code</p>
                  </div>
                </button>

              </div>
              
              {/* Extra Logic / Abstract Practice Bar */}
              <div className="pt-1">
                <button
                  onClick={() => handleStartPracticeSubject(SubjectCategory.LOGIC_REASONING)}
                  className="w-full p-4 bg-white border border-slate-200 hover:border-blue-600 rounded-xl flex items-center justify-between hover:shadow-md transition-all text-left focus:outline-none gap-4 group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-600 group-hover:bg-teal-100 group-hover:text-teal-700 flex items-center justify-center font-bold text-base transition-colors shrink-0">
                      ⊞
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-slate-800 uppercase tracking-wider group-hover:text-blue-600 transition-colors">Logic & Abstract Reasoning</h4>
                      <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">Inductive reasoning sequences, visual array logic, and structural spatial patterns</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-blue-600 uppercase tracking-widest shrink-0 group-hover:translate-x-1 transition-transform">Practice Area →</span>
                </button>
              </div>
            </div>

            {/* MOCK EXAM SCOREBOARD (PERSISTENT LOGS) */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 md:p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-widest flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-amber-500" />
                  <span>Interactive examination Ledger</span>
                </h3>
                {history.length > 0 && (
                  <button
                    onClick={handleClearHistory}
                    className="text-[10px] text-rose-600 hover:text-rose-700 font-bold uppercase hover:underline flex items-center gap-1 focus:outline-none cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Purge Exam history</span>
                  </button>
                )}
              </div>

              {history.length === 0 ? (
                <div className="py-8 text-center text-slate-400 text-xs">
                  <p>You have not executed any full time-bound simulated exam records yet.</p>
                  <p className="text-[10px] text-slate-400 mt-1 font-mono">
                    Diagnostic reports and scores will be compiled here once complete.
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="text-slate-400 uppercase tracking-wider font-mono text-[9px] border-b border-slate-200/60 font-bold">
                        <th className="pb-2.5 font-semibold">Date Completed</th>
                        <th className="pb-2.5 font-semibold">Exam level tier</th>
                        <th className="pb-2.5 font-semibold text-right">Raw score</th>
                        <th className="pb-2.5 font-semibold text-right">Grade output</th>
                        <th className="pb-2.5 font-semibold text-right">Status label</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {history.map((rec, i) => {
                        const passed = rec.percentage >= 80;
                        return (
                          <tr key={i} className="text-slate-700 font-medium hover:bg-slate-50/50 transition-colors">
                            <td className="py-3.5 font-mono text-[11px] text-slate-500">{rec.date}</td>
                            <td className="py-3.5 font-sans font-semibold text-slate-700">{rec.level}</td>
                            <td className="py-3.5 text-right font-mono font-bold text-slate-800">
                              {rec.score} / {rec.total} items
                            </td>
                            <td className="py-3.5 text-right font-mono font-bold text-slate-900">{rec.percentage}%</td>
                            <td className="py-3.5 text-right">
                              <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase font-mono tracking-wider ${
                                passed ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-rose-50 text-rose-700 border border-rose-200"
                              }`}>
                                {passed ? "PASSED" : "RE-REVIEW"}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* SYLLABUS DISCLOSURE CARD */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex gap-3 text-xs text-slate-600 leading-relaxed">
              <ShieldAlert className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
              <div>
                <strong className="font-semibold text-slate-850 block">Syllabus Compliance & Accuracy Notice</strong>
                All multiple choice datasets are structured according to standard 2026 accreditations guidelines for the Philippine Civil Service Career Examinations. The default passing target requires a minimum accuracy score of <strong>80.0%</strong>.
              </div>
            </div>

          </div>
        )}

        {screen === "EXAM" && (
          <div className="animate-fadeIn">
            <ActiveExam
              initialQuestions={sessionQuestions}
              level={level}
              isPracticeMode={isPracticeMode}
              onGoBack={handleResetToHome}
              onSubmitExam={handleSubmitExam}
            />
          </div>
        )}

        {screen === "RESULTS" && (
          <div className="animate-fadeIn">
            <ExamResults
              questions={sessionQuestions}
              userAnswers={userAnswers}
              elapsedSeconds={elapsedSeconds}
              level={level}
              onRestart={handleResetToHome}
            />
          </div>
        )}
          </>
        )}

      </div>
    </div>
  );
}
