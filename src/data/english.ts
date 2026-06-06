import { Question, SubjectCategory, LevelOfExam } from "../types";

export const englishQuestions: Question[] = [
  {
    id: "e_c_1",
    category: SubjectCategory.ENGLISH,
    subcategory: "Clerical Operations (Alphabetizing)",
    questionText: "Arrange the following items in alphabetical order:\n\nA. Commission on the Filipino Language\nB. Commission on Human Rights\nC. Commission on Higher Education\nD. Commission on Population",
    options: [
      "ABCD",
      "CBDA",
      "BCDA",
      "ACBD"
    ],
    correctOptionIndex: 1, // CBDA: Higher, Human, Population, Filipino, wait!
    // Let's sort alphabetically:
    // A: Commission on the Filipino Language (starts with F in Filipino)
    // B: Commission on Human Rights (starts with H in Human)
    // C: Commission on Higher Education (starts with H-i in Higher)
    // D: Commission on Population (starts with P in Population)
    // Sorting: Filipino (F), Higher (Hi), Human (Hu), Population (P) -> A, C, B, D?
    // Wait, let's look at the options and correct answer in OCR: "Answer: CBDA" 
    // Wait, let's verify alphabetically:
    // C: Commission on Higher Education (H-i-g-h-e-r)
    // B: Commission on Human Rights (H-u-m-a-n)
    // D: Commission on Population (P-o-p-u-l...)
    // A: Commission on the Filipino Language -> Filipino (F) comes before H! 
    // Wait, let's see why the book says CBDA. Oh, wait, in standard filing rules, sometimes "the" or other words are handled differently? Or perhaps it sorts B, C, D, A, or C, B, D, A.
    // Let's look at alphabetical order of words:
    // C: Commission on Higher Education (C - o - m - m - i - s - s - i - o - n   o - n   H - i - g - h...)
    // B: Commission on Human Rights (C - o - m - m - i - s - s - i - o - n   o - n   H - u - m - a - n)
    // D: Commission on Population (C - o - m... P - o - p...)
    // A: Commission on the Filipino Language. Wait, if categorized by Filipino (F), it would be F. But if we ignore "the" particle in filing, then:
    // Commission... Higher (H-i) -> C
    // Commission... Human (H-u) -> B
    // Commission... Population (P) -> D
    // Commission... Filipino (F) -> A? Wait, F comes before H! So why would B,C,D,A or C,B,D,A be correct?
    // Ah, wait! If "the" is kept: "Commission on the..." -> "the" has 't', which comes after 'o' or 'p'.
    // Let's compare "on Higher" (o - n   H) vs "on the" (o - n   t).
    // Word by word sorting:
    // Commission
    // on (all have "on")
    // For A: "the" (starts with 't' which comes after 'H' and 'P'!)
    // For B, C: "Human", "Higher"
    // For D: "Population"
    // Alphabetical order:
    // "Higher" ('H') -> C
    // "Human" ('H') -> B
    // "Population" ('P') -> D
    // "the" ('t') -> A
    // Thus order: C, B, D, A! That is perfect logical sense word-by-word standard filing rules!
    explanation: "Under word-by-word indexing rules, common prepositions and articles like 'the' are indexed. For 'Commission on Higher Education' (C), 'Commission on Human Rights' (B), 'Commission on Population' (D), and 'Commission on the Filipino Language' (A), the words after 'on' are 'Higher' (H-i), 'Human' (H-u), 'Population' (P), and 'the' (t). This results in C, B, D, A.",
    level: [LevelOfExam.SUB_PROFESSIONAL]
  },
  {
    id: "e_c_2",
    category: SubjectCategory.ENGLISH,
    subcategory: "Clerical Operations (Alphabetizing)",
    questionText: "Arrange the following items in alphabetical order:\n\nA. Cooperative Development Authority\nB. Cottage Industry Development Enterprise\nC. Cottage Industry Technology Center\nD. Council for the Welfare of Children",
    options: [
      "ABCD",
      "ACBD",
      "BCAD",
      "CBAD"
    ],
    correctOptionIndex: 0, // ABCD
    explanation: "Comparing word by word:\n1. Cooperative (Co-o...)\n2. Cottage Industry Development (Co-t... I... D...)\n3. Cottage Industry Technology (Co-t... I... T...)\n4. Council (Co-u...)\nSince Co-o < Co-t-D < Co-t-T < Co-u, the order is A, B, C, D.",
    level: [LevelOfExam.SUB_PROFESSIONAL]
  },
  {
    id: "e_syn_1",
    category: SubjectCategory.ENGLISH,
    subcategory: "Synonyms",
    questionText: "Choose the word closest in meaning to the bold and italicized word:\n\nWe should never be *apathetic* towards other people for we have a social responsibility to fulfill.",
    options: ["indifferent", "concerned", "generous", "worried"],
    correctOptionIndex: 0, // indifferent
    explanation: "Apathetic means showing or feeling no interest, enthusiasm, or concern. This is closest to being indifferent.",
    level: [LevelOfExam.PROFESSIONAL, LevelOfExam.SUB_PROFESSIONAL]
  },
  {
    id: "e_syn_2",
    category: SubjectCategory.ENGLISH,
    subcategory: "Synonyms",
    questionText: "Choose the word closest in meaning to the bold and italicized word:\n\nA good leader should be *cognizant* of the numerous issues that affect his constituents.",
    options: ["aware", "uninformed", "confused", "idealistic"],
    correctOptionIndex: 0, // aware
    explanation: "Cognizant means having knowledge or being aware of something.",
    level: [LevelOfExam.PROFESSIONAL, LevelOfExam.SUB_PROFESSIONAL]
  },
  {
    id: "e_syn_3",
    category: SubjectCategory.ENGLISH,
    subcategory: "Synonyms",
    questionText: "Choose the word closest in meaning to the bold and italicized word:\n\nAlways be careful not to issue any *disparaging* remarks against other people.",
    options: ["praising", "confusing", "damaging", "discouraging"],
    correctOptionIndex: 2, // damaging
    explanation: "Disparaging means expressing the opinion that something is of little worth; derogatory or damaging to someone's reputation.",
    level: [LevelOfExam.PROFESSIONAL, LevelOfExam.SUB_PROFESSIONAL]
  },
  {
    id: "e_ant_1",
    category: SubjectCategory.ENGLISH,
    subcategory: "Antonyms",
    questionText: "Choose the word opposite in meaning to the bold and italicized word:\n\nHanna *accompanied* her sister to the drugstore.",
    options: ["followed", "let go on one's own", "left behind", "stopped"],
    correctOptionIndex: 2, // left behind
    explanation: "Accompanied means going along with someone. The opposite is to leave them behind.",
    level: [LevelOfExam.PROFESSIONAL, LevelOfExam.SUB_PROFESSIONAL]
  },
  {
    id: "e_ant_2",
    category: SubjectCategory.ENGLISH,
    subcategory: "Antonyms",
    questionText: "Choose the word opposite in meaning to the bold and italicized word:\n\nBeside the *boulevard* are gigantic buildings.",
    options: ["alley", "street", "avenue", "road"],
    correctOptionIndex: 0, // alley
    explanation: "A boulevard is a wide, grand, and spacious street. Its opposite in terms of scale and grandness is a narrow alley.",
    level: [LevelOfExam.PROFESSIONAL, LevelOfExam.SUB_PROFESSIONAL]
  },
  {
    id: "e_ant_3",
    category: SubjectCategory.ENGLISH,
    subcategory: "Antonyms",
    questionText: "Choose the word opposite in meaning to the bold and italicized word:\n\nHe often got into trouble because he was *brusque*.",
    options: ["blunt", "rude", "refined", "curt"],
    correctOptionIndex: 2, // refined
    explanation: "Brusque means abrupt or offhand in speech or manner (rough/rude). The opposite of rough and rude is polite or refined.",
    level: [LevelOfExam.PROFESSIONAL, LevelOfExam.SUB_PROFESSIONAL]
  },
  {
    id: "e_ana_1",
    category: SubjectCategory.ENGLISH,
    subcategory: "Single-Word Analogy",
    questionText: "Moby Dick : Herman Melville || The Old Man and the Sea : _________",
    options: ["Charles Dickens", "Ernest Hemingway", "Charles Perrault", "Robert Frost"],
    correctOptionIndex: 1, // Ernest Hemingway
    explanation: "Moby Dick was written by Herman Melville. Similarly, The Old Man and the Sea was written by Ernest Hemingway.",
    level: [LevelOfExam.PROFESSIONAL, LevelOfExam.SUB_PROFESSIONAL]
  },
  {
    id: "e_ana_2",
    category: SubjectCategory.ENGLISH,
    subcategory: "Double-Word Analogy",
    questionText: "Choose the pair that has the same relationship as the given pair:\n\nabattoir : slaughterhouse",
    options: [
      "quay : wharf",
      "quack : duck",
      "snail : slow",
      "clown : fun"
    ],
    correctOptionIndex: 0, // quay : wharf
    explanation: "An abattoir is a synonym for a slaughterhouse. Similarly, a quay is a synonym for a wharf (pier).",
    level: [LevelOfExam.PROFESSIONAL]
  },
  {
    id: "e_err_1",
    category: SubjectCategory.ENGLISH,
    subcategory: "Identifying Errors",
    questionText: "Identify which underlined part contains an error. If there is no error, choose 'No error'.\n\nNo (a) {@underline one were} (b) {@underline happy about} the (c) {@underline Mindanao crisis}. (d) {@underline No error}.",
    options: ["No one", "were", "happy about", "Mindanao crisis / No error"],
    correctOptionIndex: 1, // were
    explanation: "'No one' is an indefinite singular pronoun and requires a singular verb. Therefore, 'were' should be replaced with 'was'.",
    level: [LevelOfExam.PROFESSIONAL, LevelOfExam.SUB_PROFESSIONAL]
  },
  {
    id: "e_err_2",
    category: SubjectCategory.ENGLISH,
    subcategory: "Identifying Errors",
    questionText: "Identify which underlined part contains an error. If there is no error, choose 'No error'.\n\nThe (a) {@underline House of Representatives'} (b) {@underline decision to decrease the} budget for the (c) {@underline Department of Education was met} with protests. (d) {@underline No error}.",
    options: ["House of Representatives'", "decision to decrease the", "Department of Education was met", "No error"],
    correctOptionIndex: 3, // No error
    explanation: "There are no subject-verb agreement or grammatical errors here. Under official rules, this is grammatically correct.",
    level: [LevelOfExam.PROFESSIONAL, LevelOfExam.SUB_PROFESSIONAL]
  },
  {
    id: "e_para_1",
    category: SubjectCategory.ENGLISH,
    subcategory: "Paragraph Development",
    questionText: "Decide the correct order for the given sentences to create a well-organized paragraph, then answer the question:\n\n" +
      "A. The first procedure is that the bill passes through three readings on separate days.\n" +
      "B. Otherwise, the bill will go back to the House from where it originated, and it will be deliberated upon again.\n" +
      "C. If the President approves the bill, then it shall be deemed a law.\n" +
      "D. A bill, before becoming a law, undergoes several procedures.\n" +
      "E. On the third reading, the votes of the lawmakers shall be recorded and if the bill is approved, it goes to the President for approval or veto.\n\n" +
      "What should be the first sentence?",
    options: ["Sentence A", "Sentence B", "Sentence C", "Sentence D", "Sentence E"],
    correctOptionIndex: 3, // Sentence D
    explanation: "Sentence D introduces the core topic (A bill undergoing procedures). It is the appropriate topic sentence and first sentence of the paragraph.",
    level: [LevelOfExam.PROFESSIONAL]
  },
  {
    id: "e_para_2",
    category: SubjectCategory.ENGLISH,
    subcategory: "Paragraph Development",
    questionText: "Refer to the sentences on how a bill becomes a law (A to E in the previous question). What should be the fourth sentence?",
    options: ["Sentence A", "Sentence B", "Sentence C", "Sentence D", "Sentence E"],
    correctOptionIndex: 2, // Sentence C
    explanation: "Following the logical sequence: D (Intro) -> A (First procedure / Reading) -> E (Third reading and President option) -> C (If approval, it becomes law) -> B (Otherwise, goes back). Thus the fourth sentence is C.",
    level: [LevelOfExam.PROFESSIONAL]
  },
  {
    id: "e_use_1",
    category: SubjectCategory.ENGLISH,
    subcategory: "Correct Usage",
    questionText: "Choose the word that correctly completes the sentence:\n\nLily _________ remarkable poems even at her young age.",
    options: ["rites", "rights", "writes", "write"],
    correctOptionIndex: 2, // writes
    explanation: "'Lily' is a singular subject, so the singular verb form 'writes' is correct.",
    level: [LevelOfExam.PROFESSIONAL, LevelOfExam.SUB_PROFESSIONAL]
  },
  {
    id: "e_use_2",
    category: SubjectCategory.ENGLISH,
    subcategory: "Correct Usage",
    questionText: "Choose the word that correctly completes the sentence:\n\nBeing too _________ will undoubtedly make other men hate you.",
    options: ["vane", "vain", "vein", "vanity"],
    correctOptionIndex: 1, // vain
    explanation: "'Vain' is an adjective meaning having or showing an excessively high opinion of one's appearance, abilities, or worth.",
    level: [LevelOfExam.PROFESSIONAL, LevelOfExam.SUB_PROFESSIONAL]
  },
  {
    id: "e_read_1",
    category: SubjectCategory.ENGLISH,
    subcategory: "Reading Comprehension",
    passage: "“All animals wage perpetual war; every species is born to devour another. Not one, not even sheep or doves, that does not swallow a prodigious number of invisible creatures. Males make war for the females, like Menelaus and Paris. Air, earth, water, are fields of carnage. God having given reason to men, this reason might teach them not to emulate the brutes, particularly when nature has provided them neither with arms to kill their fellows nor with a desire for their blood.”\n“Can there be anything more horrible in all nature?”\n- Voltaire",
    questionText: "What is the author's stand on war based on the passage?",
    options: ["It is horrible", "It is important", "It is a means to control population", "It is a natural product of man's reason"],
    correctOptionIndex: 0, // It is horrible
    explanation: "The author ends the selection with a rhetorical question: 'Can there be anything more horrible in all nature?', clearly indicating his stance that war is horrible.",
    level: [LevelOfExam.PROFESSIONAL]
  }
];
