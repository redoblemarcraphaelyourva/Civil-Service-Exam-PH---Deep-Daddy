export enum LevelOfExam {
  PROFESSIONAL = "Professional",
  SUB_PROFESSIONAL = "Sub-Professional"
}

export enum SubjectCategory {
  MATHEMATICS = "Mathematics",
  ENGLISH = "English",
  FILIPINO = "Filipino",
  CONSTITUTION = "Constitution",
  LOGIC_REASONING = "Inductive & Abstract Reasoning"
}

export interface Question {
  id: string;
  category: SubjectCategory;
  subcategory: string;
  questionText: string;
  passage?: string; // For reading comprehensions or paragraphs
  options: string[]; // typically 4 options, a, b, c, d
  correctOptionIndex: number; // 0 = a, 1 = b, 2 = c, 3 = d
  explanation?: string; // Static default explanation
  level: LevelOfExam[]; // Which exam types contain this question
  isDataSufficiency?: boolean;
  isAbstractReasoning?: boolean;
  svgData?: string; // Custom SVG visual for abstract reasoning
}

export interface ExamSession {
  examLevel: LevelOfExam;
  totalTime: number; // in seconds
  timeRemaining: number;
  questions: Question[];
  currentQuestionIndex: number;
  userAnswers: { [questionId: string]: number }; // questionId -> selectedOptionIndex
  isSubmitted: boolean;
}

export interface SubjectStats {
  category: SubjectCategory;
  total: number;
  correct: number;
  percentage: number;
}
