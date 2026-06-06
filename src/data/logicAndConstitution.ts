import { Question, SubjectCategory, LevelOfExam } from "../types";

export const logicAndConstitutionQuestions: Question[] = [
  {
    id: "c_1",
    category: SubjectCategory.CONSTITUTION,
    subcategory: "Philippine Constitution",
    questionText: "What do you call the introductory part of the Philippine Constitution?",
    options: ["Preface", "Amendments", "Preamble", "Bill of Rights"],
    correctOptionIndex: 2, // Preamble
    explanation: "The Preamble is the introductory statement of the Constitution that sets its purposes, principles, and aspirations.",
    level: [LevelOfExam.PROFESSIONAL, LevelOfExam.SUB_PROFESSIONAL]
  },
  {
    id: "c_2",
    category: SubjectCategory.CONSTITUTION,
    subcategory: "Philippine Constitution",
    questionText: "What form of government does the Philippines adopt?",
    options: ["Republican", "Democratic", "Neither a nor b", "Both a and b"],
    correctOptionIndex: 3, // Both a and b
    explanation: "According to Article II, Section 1 of the 1987 Constitution, 'The Philippines is a democratic and republican State. Sovereignty resides in the people and all government authority emanates from them.'",
    level: [LevelOfExam.PROFESSIONAL, LevelOfExam.SUB_PROFESSIONAL]
  },
  {
    id: "c_3",
    category: SubjectCategory.CONSTITUTION,
    subcategory: "Philippine Constitution",
    questionText: "What is the power of the State to take private property for public use upon payment of a just compensation?",
    options: ["right of confiscation", "right of limiting resources", "right of sequestration", "right of eminent domain"],
    correctOptionIndex: 3, // right of eminent domain
    explanation: "Eminent domain is the inherent power of the State to take private property for public use upon payment of just compensation.",
    level: [LevelOfExam.PROFESSIONAL, LevelOfExam.SUB_PROFESSIONAL]
  },
  {
    id: "c_4",
    category: SubjectCategory.CONSTITUTION,
    subcategory: "Philippine Constitution",
    questionText: "Who among the following may issue a warrant of arrest or a search warrant?",
    options: ["a senator", "a judge", "a congressman", "the President"],
    correctOptionIndex: 1, // a judge
    explanation: "Under Article III, Section 2 of the Constitution, only a judge may issue search warrants or warrants of arrest after personally determining probable cause.",
    level: [LevelOfExam.PROFESSIONAL, LevelOfExam.SUB_PROFESSIONAL]
  },
  {
    id: "c_5",
    category: SubjectCategory.CONSTITUTION,
    subcategory: "Philippine Constitution",
    questionText: "The right to vote is also known as:",
    options: ["suffrage", "naturalization", "democracy", "plebiscite"],
    correctOptionIndex: 0, // suffrage
    explanation: "Suffrage is the legal right to vote in political elections.",
    level: [LevelOfExam.PROFESSIONAL, LevelOfExam.SUB_PROFESSIONAL]
  },
  {
    id: "c_6",
    category: SubjectCategory.CONSTITUTION,
    subcategory: "Philippine Constitution",
    questionText: "How many Senators are there in the Philippine Senate?",
    options: ["twenty-five", "twenty-four", "twelve", "thirty"],
    correctOptionIndex: 1, // twenty-four
    explanation: "The Senate of the Philippines is composed of twenty-four Senators elected at large.",
    level: [LevelOfExam.PROFESSIONAL, LevelOfExam.SUB_PROFESSIONAL]
  },
  {
    id: "ir_1",
    category: SubjectCategory.LOGIC_REASONING,
    subcategory: "Inductive Reasoning (Series)",
    questionText: "Identify the principle involved and find the next term in the series:\n\n3, 6, 9, 12, 15, __?",
    options: ["2", "18", "22", "20"],
    correctOptionIndex: 1, // 18
    explanation: "This is a simple arithmetic series increasing by adding 3 to each consecutive term (3, 6, 9, 12, 15... so 15 + 3 = 18).",
    level: [LevelOfExam.PROFESSIONAL, LevelOfExam.SUB_PROFESSIONAL]
  },
  {
    id: "ir_2",
    category: SubjectCategory.LOGIC_REASONING,
    subcategory: "Inductive Reasoning (Series)",
    questionText: "Find the next item in the alphabetical series:\n\nC, E, G, I, K, __?",
    options: ["L", "M", "N", "O"],
    correctOptionIndex: 1, // M
    explanation: "The series skips one letter after each term: C (skip D) E (skip F) G (skip H) I (skip J) K. Skipping L gives M.",
    level: [LevelOfExam.PROFESSIONAL, LevelOfExam.SUB_PROFESSIONAL]
  },
  {
    id: "ir_3",
    category: SubjectCategory.LOGIC_REASONING,
    subcategory: "Inductive Reasoning (Series)",
    questionText: "Find the next item in the series:\n\n10, 17, 26, 37, __?",
    options: ["48", "49", "50", "51"],
    correctOptionIndex: 2, // 50
    explanation: "The difference between terms increases consecutive odd numbers: 10 (+7) 17 (+9) 26 (+11) 37. The next addition should be +13. 37 + 13 = 50. Alternatively, these are (n² + 1) for n=3,4,5,6 -> next is 7² + 1 = 50.",
    level: [LevelOfExam.PROFESSIONAL]
  },
  {
    id: "ar_1",
    category: SubjectCategory.LOGIC_REASONING,
    subcategory: "Abstract Reasoning (Visual Logic)",
    isAbstractReasoning: true,
    questionText: "Refer to the diagram below. The lines in each row build up logically. Analyze the merging pattern starting from the bottom row up to the top row. Which is the missing circle at the top represented by the question mark (?)?",
    // We will render this SVG visually in the frontend. It has 3 bottom circles, 2 middle circles, 1 top circle.
    // Bottom: 
    // Left: vertical line. 
    // Middle: horizontal line. 
    // Right: diagonal line.
    // Mid-Left merges Left & Middle (vertical + horizontal = CROSS).
    // Mid-Right merges Middle & Right (horizontal + diagonal).
    // Top-most merges Mid-Left and Mid-Right (vertical + horizontal + diagonal = STARS SPOKES).
    options: [
      "Circle with only a diagonal-left line (a)",
      "Circle with vertical and horizontal lines forming a cross (b)",
      "Circle with only vertical and diagonal lines (c)",
      "Circle with vertical, horizontal, AND diagonal lines forming a complete wheel (d)"
    ],
    correctOptionIndex: 3, // d is correct
    explanation: "This pyramid diagram demonstrates a 'superimposition' or 'overlay' rule. Middle row symbols are formed by overlaying the shapes in the bottom row directly below them. The leaf-nodes (bottom rows) are: Left(vertical bar), Middle(horizontal bar), Right(diagonal bar). Middle-Left connects Left and Middle to form a cross (+). Middle-Right connects Middle and Right to form a diagonal and horizontal bar. The top circle (?) is formed by overlaying Middle-Left (+) with Middle-Right (+ diagonal), which yields a complete wheel of vertical, horizontal, and diagonal lines.",
    level: [LevelOfExam.PROFESSIONAL, LevelOfExam.SUB_PROFESSIONAL]
  },
  {
    id: "ar_2",
    category: SubjectCategory.LOGIC_REASONING,
    subcategory: "Abstract Reasoning (Visual Sequence)",
    isAbstractReasoning: true,
    questionText: "Examine the clockwise rotation sequence of the arrow inside the square. Find the next screen in the sequence:\n\n" +
      "1st Frame: Arrow pointing UP (12 o'clock)\n" +
      "2nd Frame: Arrow pointing RIGHT (3 o'clock)\n" +
      "3rd Frame: Arrow pointing DOWN (6 o'clock)\n" +
      "4th Frame: ???",
    options: [
      "Arrow pointing DIAGONAL UP-RIGHT (a)",
      "Arrow pointing LEFT (9 o'clock) (b)",
      "Arrow pointing UP (12 o'clock) (c)",
      "Arrow pointing DOWN-LEFT (d)"
    ],
    correctOptionIndex: 1, // (b) left
    explanation: "The arrow inside the square rotates exactly 90 degrees clockwise in each frame. Following UP (12:00) -> RIGHT (3:00) -> DOWN (6:00), the next 90-degree step clockwise is LEFT (9:00).",
    level: [LevelOfExam.PROFESSIONAL, LevelOfExam.SUB_PROFESSIONAL]
  }
];
