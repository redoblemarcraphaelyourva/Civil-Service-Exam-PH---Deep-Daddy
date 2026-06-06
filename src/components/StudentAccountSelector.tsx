import { useState, useEffect, FormEvent } from "react";
import {
  UserPlus,
  UserCheck,
  Users,
  Eye,
  Settings,
  ShieldAlert,
  Plus,
  ArrowRight,
} from "lucide-react";
import {
  registerStudentProfile,
  fetchAllStudents,
  StudentProfile,
} from "../utils/firebaseService";

interface StudentAccountSelectorProps {
  currentStudent: StudentProfile | null;
  onSelectStudent: (student: StudentProfile | null) => void;
  isAdminMode: boolean;
  onToggleAdminMode: (isActive: boolean) => void;
  onRefreshHistory: () => void;
}

export default function StudentAccountSelector({
  currentStudent,
  onSelectStudent,
  isAdminMode,
  onToggleAdminMode,
  onRefreshHistory,
}: StudentAccountSelectorProps) {
  const [students, setStudents] = useState<StudentProfile[]>([]);
  const [loading, setLoading] = useState(false);
  const [showManager, setShowManager] = useState(false);
  
  // Registration form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState<{ text: string; error?: boolean } | null>(null);

  useEffect(() => {
    if (showManager) {
      loadStudents();
    }
  }, [showManager]);

  const loadStudents = async () => {
    setLoading(true);
    try {
      const list = await fetchAllStudents();
      setStudents(list);
    } catch (err) {
      console.error("Failed loading students roster:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    setMsg(null);

    if (!name.trim() || !email.trim()) {
      setMsg({ text: "Please enter both matching name and email address.", error: true });
      return;
    }

    const simpleEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!simpleEmailRegex.test(email)) {
      setMsg({ text: "Please enter a valid email target structure.", error: true });
      return;
    }

    // Create a client-side simple deterministic UID for standard mock testing
    const generatedUid = `stud_${Date.now()}_${Math.floor(Math.random() * 100)}`;

    try {
      setLoading(true);
      const profile = await registerStudentProfile(generatedUid, email.trim(), name.trim());
      setMsg({ text: `Account created successfully for ${name}!`, error: false });
      
      // Auto set as active student
      onSelectStudent(profile);
      
      // Reset fields
      setName("");
      setEmail("");
      
      // Reload lists
      await loadStudents();
      
      // Refresh local view logs if any
      onRefreshHistory();
    } catch (err) {
      console.error("Profile registration failed on Firebase:", err);
      setMsg({ text: "Relational sync rejected. Verify security rules.", error: true });
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (student: StudentProfile) => {
    onSelectStudent(student);
    onToggleAdminMode(false); // turn off admin mode if switching to a student
    setShowManager(false);
    onRefreshHistory();
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm space-y-3 relative overflow-hidden">
      
      {/* HEADER ROW BRIEF */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-blue-50 border border-blue-200 rounded-lg flex items-center justify-center text-blue-600 shrink-0">
            <Users className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <span className="text-[10px] text-slate-400 block uppercase font-bold tracking-wider font-mono">Active Student Session</span>
            <div className="flex items-center gap-1.5">
              <strong className="text-xs font-bold text-slate-800 truncate block">
                {currentStudent ? currentStudent.displayName : "Default Anonymous Examinee"}
              </strong>
              {currentStudent && <UserCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => {
              setShowManager(!showManager);
              setMsg(null);
            }}
            className="py-1.5 px-3 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 font-bold text-[10px] uppercase tracking-wider rounded-lg transition shrink-0 cursor-pointer"
          >
            {showManager ? "Close Roster" : "Manage Examinee Accounts"}
          </button>

          <button
            onClick={() => {
              onToggleAdminMode(!isAdminMode);
              if (!isAdminMode) {
                // Keep default select as null or remain active
                setShowManager(false);
              }
            }}
            className={`py-1.5 px-3 font-bold text-[10px] uppercase tracking-wider rounded-lg transition shrink-0 cursor-pointer border ${
              isAdminMode 
                ? "bg-amber-600 hover:bg-amber-500 text-white border-amber-600" 
                : "bg-slate-900 hover:bg-slate-800 text-amber-400 border-slate-950"
            }`}
          >
            {isAdminMode ? "Disable Admin Dashboard" : "Access Admin Dashboard"}
          </button>
        </div>
      </div>

      {/* EXPANDABLE MULTI-EXAMINEE SYSTEM CONTROLS */}
      {showManager && (
        <div className="border-t border-slate-200 pt-4 mt-2 grid grid-cols-1 md:grid-cols-12 gap-6 animate-fadeIn">
          
          {/* SEC-1: REGISTRATION COMPILER (COL-5) */}
          <form onSubmit={handleRegister} className="md:col-span-5 space-y-3.5 text-xs">
            <div className="space-y-0.5">
              <h4 className="font-bold text-slate-800 uppercase tracking-wide flex items-center gap-1">
                <Plus className="w-3.5 h-3.5 text-blue-600" />
                <span>Register New Student Profile</span>
              </h4>
              <p className="text-[10px] text-slate-500 leading-normal">
                Generates a secure, persistent record inside Firebase.
              </p>
            </div>

            <div className="space-y-2">
              <div>
                <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Examinee Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Juan De Leon"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs leading-none outline-none focus:ring-1 focus:ring-blue-500 focus:bg-white transition-all text-slate-800 font-medium"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">E-mail Target</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. email@school.edu.ph"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs leading-none outline-none focus:ring-1 focus:ring-blue-500 focus:bg-white transition-all text-slate-800 font-medium"
                />
              </div>
            </div>

            {msg && (
              <p className={`text-[10px] font-semibold ${msg.error ? "text-rose-600" : "text-emerald-600"}`}>
                {msg.text}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-1.5 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-300 text-white font-bold rounded-lg uppercase tracking-wider text-[9px] transition cursor-pointer"
            >
              {loading ? "Registering..." : "Create Registered Profile"}
            </button>
          </form>

          {/* SEC-2: SWAPPING SELECTOR DIRECTORY (COL-7) */}
          <div className="md:col-span-1 border-r border-slate-200 hidden md:block"></div>

          <div className="md:col-span-6 space-y-3.5">
            <div className="space-y-0.5">
              <h4 className="font-bold text-slate-800 uppercase tracking-wide text-xs">
                Switch Student Account Profile
              </h4>
              <p className="text-[10px] text-slate-500 leading-normal">
                Click any profile to instantly switch the active session and review progress records.
              </p>
            </div>

            <div className="space-y-1.5 overflow-y-auto max-h-[160px] pr-1 scrollbar-thin">
              {loading && students.length === 0 ? (
                <div className="py-6 text-center text-[11px] text-slate-400 animate-pulse">
                  Querying Firebase registries...
                </div>
              ) : students.length === 0 ? (
                <div className="py-6 text-center text-[10px] text-slate-400">
                  No registered student directories found in database.
                </div>
              ) : (
                students.map((stud) => {
                  const isCurrent = currentStudent?.uid === stud.uid;
                  return (
                    <button
                      key={stud.uid}
                      onClick={() => handleSelect(stud)}
                      className={`w-full p-2 text-left rounded-lg text-xs flex items-center justify-between border transition-all cursor-pointer ${
                        isCurrent 
                          ? "bg-blue-50/55 border-blue-400 text-blue-800 font-bold" 
                          : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-150"
                      }`}
                    >
                      <div className="min-w-0 pr-2">
                        <span className="truncate block font-semibold">{stud.displayName}</span>
                        <span className="text-[9px] text-slate-400 block truncate">{stud.email}</span>
                      </div>
                      
                      <div className="flex items-center gap-1.5 shrink-0">
                        {isCurrent ? (
                          <span className="text-[8px] bg-blue-600 text-white px-1 py-0.5 rounded uppercase font-mono tracking-wider font-extrabold shadow-sm">
                            Active
                          </span>
                        ) : (
                          <span className="text-[8px] text-slate-400 font-semibold group-hover:text-blue-600 flex items-center gap-0.5">
                            Select <ArrowRight className="w-2.5 h-2.5" />
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })
              )}
            </div>
            
            <div className="pt-1.5 flex items-center justify-between">
              <span className="text-[9px] text-slate-400 italic">
                * Simulated student bio items are stored safely in Firestore.
              </span>
              <button
                onClick={loadStudents}
                className="text-[9px] text-blue-600 hover:underline font-bold uppercase transition"
              >
                Sync Directory
              </button>
            </div>
          </div>

        </div>
      )}

      {/* DISCLOSURE FOOTNOTE ADMIN WARNING */}
      {isAdminMode && (
        <div className="mt-2 p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-2 text-[10.5px] text-amber-800 leading-normal animate-fadeIn">
          <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div className="font-sans font-medium">
            <strong className="font-bold">Admin Monitor Mode Activated</strong>: The central analyzer panel is rendering live exam analytics directly from the Firestore database. Disabling this toggle returns to client exam review controls.
          </div>
        </div>
      )}

    </div>
  );
}
