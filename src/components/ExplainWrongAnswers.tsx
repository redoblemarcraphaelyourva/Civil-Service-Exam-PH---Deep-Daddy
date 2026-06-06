import { useState } from "react";
import { Sparkles, Brain, AlertCircle, AlertTriangle } from "lucide-react";
import { Question } from "../types";

interface ExplainWrongAnswersProps {
  question: Question;
  userAnswerIndex: number;
}

export default function ExplainWrongAnswers({ question, userAnswerIndex }: ExplainWrongAnswersProps) {
  const [explanation, setExplanation] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loadingTip, setLoadingTip] = useState("Analyzing question logic...");

  const loadingTips = [
    "Analyzing subject-verb structures...",
    "Solving algebraic relationships...",
    "Reviewing Constitutional precedents...",
    "Deconstructing logical distraction choices...",
    "Parsing Civil Service syllabus concepts...",
    "Formulating actionable test-taking drills..."
  ];

  const fetchExplanation = async () => {
    setLoading(true);
    setError(null);

    // Rotate encouraging tips on screen
    let tipIndex = 0;
    const interval = setInterval(() => {
      tipIndex = (tipIndex + 1) % loadingTips.length;
      setLoadingTip(loadingTips[tipIndex]);
    }, 2000);

    try {
      const response = await fetch("/api/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          questionText: question.questionText,
          passage: question.passage,
          options: question.options,
          correctOption: question.options[question.correctOptionIndex],
          userOption: question.options[userAnswerIndex],
          category: question.category,
          subcategory: question.subcategory
        })
      });

      clearInterval(interval);
      if (!response.ok) {
        throw new Error("The AI Coach is taking a coffee break. Please try again!");
      }

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      setExplanation(data.explanation);
    } catch (err: any) {
      clearInterval(interval);
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  // Safe markdown style renderer for Gemini's structured response
  const renderStyledText = (text: string) => {
    const lines = text.split("\n");
    return lines.map((line, index) => {
      const trimmed = line.trim();
      
      // Headers e.g. **1. The Discrepancy** or ### Title
      if (trimmed.startsWith("**") && trimmed.endsWith("**") && trimmed.length > 4) {
        const clean = trimmed.replace(/\*\*/g, "");
        return (
          <h4 key={index} id={`line-${index}`} className="text-sm font-semibold text-slate-800 dark:text-slate-200 mt-4 mb-2 flex items-center gap-2">
            <span className="w-1.5 h-3 bg-red-500 rounded-sm"></span>
            {clean}
          </h4>
        );
      }
      
      // Inline block bold replacements
      if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
        const cleanLine = trimmed.substring(2);
        return (
          <li key={index} id={`block-${index}`} className="text-xs text-slate-600 ml-4 list-disc marker:text-red-400 py-1 leading-relaxed">
            {parseInlineFormat(cleanLine)}
          </li>
        );
      }

      // Default line rendering with inline formatting
      return (
        <p key={index} id={`para-${index}`} className="text-xs text-slate-600 leading-relaxed py-0.5">
          {parseInlineFormat(trimmed)}
        </p>
      );
    });
  };

  const parseInlineFormat = (line: string) => {
    // Basic substitution for bold e.g. **text** -> strong
    const parts = line.split(/\*\*([^*]+)\*\*/g);
    return parts.map((part, i) => {
      if (i % 2 === 1) {
        return (
          <strong key={i} className="font-semibold text-slate-800 underline decoration-red-200 decoration-2">
            {part}
          </strong>
        );
      }
      // Check for code backticks `code`
      const subParts = part.split(/`([^`]+)`/g);
      return subParts.map((subPart, y) => {
        if (y % 2 === 1) {
          return (
            <code key={y} className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 rounded font-mono text-xs text-red-500 font-bold border border-slate-200">
              {subPart}
            </code>
          );
        }
        return subPart;
      });
    });
  };

  return (
    <div className="mt-4 p-4 border border-slate-100 bg-slate-50/50 rounded-xl">
      {!explanation && !loading && (
        <button
          onClick={fetchExplanation}
          className="w-full sm:w-auto py-2 px-4 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-medium text-xs rounded-lg shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-red-400 flex items-center justify-center gap-2"
        >
          <Sparkles className="w-3.5 h-3.5 text-red-500 animate-pulse" />
          <span>Explain My Error with AI Coach</span>
        </button>
      )}

      {loading && (
        <div className="flex flex-col items-center justify-center py-6 text-center">
          <div className="relative w-10 h-10 mb-3">
            <div className="absolute inset-0 rounded-full border-2 border-red-100 animate-ping"></div>
            <div className="absolute inset-0 rounded-full border-t-2 border-r-2 border-red-500 animate-spin"></div>
            <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center shadow-sm">
              <Brain className="w-4 h-4 text-red-500" />
            </div>
          </div>
          <p className="text-xs font-semibold text-slate-800 animate-pulse">{loadingTip}</p>
          <p className="text-[10px] text-slate-400 mt-1 max-w-[250px]">
            AI analyzes standard distractors using syllabus parameters.
          </p>
        </div>
      )}

      {error && (
        <div className="p-3 bg-rose-50 border border-red-100 rounded-lg flex gap-2.5 items-start">
          <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
          <div className="flex-1">
            <h5 className="text-xs font-semibold text-rose-800">AI Explainer Offline</h5>
            <p className="text-[11px] text-rose-600 mt-0.5">{error}</p>
            <button
              onClick={fetchExplanation}
              className="mt-2 text-[10px] text-red-500 font-semibold hover:underline"
            >
              Try Explaining Again
            </button>
          </div>
        </div>
      )}

      {explanation && !loading && (
        <div className="bg-white border border-slate-100 shadow-sm rounded-lg p-4 transition-all">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-2">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-red-50 rounded-full flex items-center justify-center text-red-500">
                <Brain className="w-3 h-3" />
              </div>
              <span className="text-[11px] font-bold text-slate-700 tracking-wide uppercase">
                AI Coach Assessment
              </span>
            </div>
            <span className="text-[10px] text-slate-400 italic">GenAI explanation</span>
          </div>

          <div className="space-y-2">
            {renderStyledText(explanation)}
          </div>
        </div>
      )}
    </div>
  );
}
