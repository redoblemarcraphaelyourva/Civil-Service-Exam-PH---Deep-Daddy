import { Question, SubjectCategory, LevelOfExam } from "../types";

export const mathematicsQuestions: Question[] = [
  {
    id: "m_1",
    category: SubjectCategory.MATHEMATICS,
    subcategory: "Word Problems & Operations",
    questionText: "If 1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 + 9 + 10 = 55, then what is the sum of 11 + 12 + 13 + 14 + 15 + 16 + 17 + 18 + 19 + 20?",
    options: ["65", "155", "125", "550"],
    correctOptionIndex: 1, // 155
    explanation: "You can rewrite the second series as (10 + 1) + (10 + 2) + ... + (10 + 10). This is equivalent to (10 * 10) + (1 + 2 + ... + 10) = 100 + 55 = 155.",
    level: [LevelOfExam.PROFESSIONAL, LevelOfExam.SUB_PROFESSIONAL]
  },
  {
    id: "m_2",
    category: SubjectCategory.MATHEMATICS,
    subcategory: "Word Problems & Operations",
    questionText: "Find the product: 800 x 125.",
    options: ["925", "10,000", "100,000", "1,000,000"],
    correctOptionIndex: 2, // 100,000
    explanation: "800 x 125 = 8 x 100 x 125 = 8 x 125 x 100 = 1,000 x 100 = 100,000.",
    level: [LevelOfExam.PROFESSIONAL, LevelOfExam.SUB_PROFESSIONAL]
  },
  {
    id: "m_3",
    category: SubjectCategory.MATHEMATICS,
    subcategory: "Word Problems & Operations",
    questionText: "Find the quotient: 8,000 ÷ 125.",
    options: ["48", "64", "80", "88"],
    correctOptionIndex: 1, // 64
    explanation: "8,000 ÷ 125 = (8 x 1000) ÷ 125. Since 1000 ÷ 125 = 8, we have 8 x 8 = 64.",
    level: [LevelOfExam.PROFESSIONAL, LevelOfExam.SUB_PROFESSIONAL]
  },
  {
    id: "m_4",
    category: SubjectCategory.MATHEMATICS,
    subcategory: "Word Problems & Operations",
    questionText: "Find the sum: 299 + 943 + 398 + 101.",
    options: ["1,531", "1,641", "1,741", "1,841"],
    correctOptionIndex: 2, // 1,741
    explanation: "Adding the numbers: 299 + 943 = 1242. 1242 + 398 = 1640. 1640 + 101 = 1741.",
    level: [LevelOfExam.PROFESSIONAL, LevelOfExam.SUB_PROFESSIONAL]
  },
  {
    id: "m_5",
    category: SubjectCategory.MATHEMATICS,
    subcategory: "Word Problems & Operations",
    questionText: "If 1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 + 9 + 10 = 55, then what is the value of 101 + 102 + 103 + 104 + 105 + 106 + 107 + 108 + 109 + 110?",
    options: ["1,055", "1,060", "1,155", "1,110"],
    correctOptionIndex: 0, // 1055
    explanation: "The values can be split as (100 + 1) + (100 + 2) + ... + (100 + 10) = 1,000 + (1+2+...+10) = 1000 + 55 = 1,055.",
    level: [LevelOfExam.PROFESSIONAL, LevelOfExam.SUB_PROFESSIONAL]
  },
  {
    id: "m_6",
    category: SubjectCategory.MATHEMATICS,
    subcategory: "Word Problems & Operations",
    questionText: "What is the remainder when 192,888 is divided by 8?",
    options: ["0", "1", "4", "5"],
    correctOptionIndex: 0, // 0
    explanation: "A number is divisible by 8 if its last three digits are divisible by 8. The last three digits 888 divided by 8 is 111, with a remainder of 0. Thus, the numbers divides perfectly with 0 remainder.",
    level: [LevelOfExam.PROFESSIONAL, LevelOfExam.SUB_PROFESSIONAL]
  },
  {
    id: "m_7",
    category: SubjectCategory.MATHEMATICS,
    subcategory: "Word Problems & Operations",
    questionText: "Rounding 299,943 to the nearest thousands, the result is:",
    options: ["299,940", "299,000", "299,900", "300,000"],
    correctOptionIndex: 3, // 300,000
    explanation: "To round 299,943 to the nearest thousands, look at the hundreds place (9). Since 9 is greater than or equal to 5, we round up the thousands place. 299,000 rounded up by 1,000 gives 300,000.",
    level: [LevelOfExam.PROFESSIONAL, LevelOfExam.SUB_PROFESSIONAL]
  },
  {
    id: "m_8",
    category: SubjectCategory.MATHEMATICS,
    subcategory: "Word Problems & Operations",
    questionText: "If 23 + 28 + 37 + x + 53 = 168 and 23 + 28 + 40 + y + 50 = 120. Find the value of x - y.",
    options: ["36", "48", "56", "64"],
    correctOptionIndex: 1, // 48
    explanation: "First equation: 23+28+37+53+x = 141+x = 168 -> x = 27. Second equation: 23+28+40+50+y = 141+y = 120 -> y = -21. Therefore, x - y = 27 - (-21) = 27 + 21 = 48.",
    level: [LevelOfExam.PROFESSIONAL]
  },
  {
    id: "m_9",
    category: SubjectCategory.MATHEMATICS,
    subcategory: "Converson and Terminology",
    questionText: "398.101 is read as:",
    options: [
      "three hundred ninety eight, one hundred one",
      "three hundred ninety eight and one hundred one thousandths",
      "three hundred ninety eight and one hundred one hundredths",
      "three hundred ninety eight point hundred one"
    ],
    correctOptionIndex: 1, // thousandths
    explanation: "In decimal numbers, the word 'and' replaces the decimal point. The places after decimal are tenths, hundredths, and thousandths. So 101 ends in the thousandths place: 'three hundred ninety eight and one hundred one thousandths'.",
    level: [LevelOfExam.PROFESSIONAL, LevelOfExam.SUB_PROFESSIONAL]
  },
  {
    id: "m_10",
    category: SubjectCategory.MATHEMATICS,
    subcategory: "Word Problems & Operations",
    questionText: "Paula is twice as old as Queenie. Seven years ago the sum of their ages was 16. How old is Queenie now?",
    options: ["8", "10", "16", "20"],
    correctOptionIndex: 1, // 10
    explanation: "Let Queenie's age be Q, so Paula is 2Q. Seven years ago, Queenie was Q-7 and Paula was 2Q-7. (Q-7) + (2Q-7) = 16 -> 3Q - 14 = 16 -> 3Q = 30 -> Q = 10. Queenie is 10 years old.",
    level: [LevelOfExam.PROFESSIONAL]
  },
  {
    id: "m_11",
    category: SubjectCategory.MATHEMATICS,
    subcategory: "Word Problems & Operations",
    questionText: "A patient must take his medication every 7 hours starting at 7:00 AM, Sunday. On what day will the patient first receive his medication at 8:00 AM?",
    options: ["Sunday", "Wednesday", "Thursday", "Tuesday"],
    correctOptionIndex: 3, // Tuesday
    explanation: "Each dose is taken after 7 hours, which shifts the hour of taking medication. We are looking for (+1 hour) shift from 7 AM, which is a multiple of 7 that has a remainder of 1 when divided by 24 (total hours in a day). Solving 7d ≡ 1 (mod 24), we find that 7 * 25 = 175 = 7 * 24 + 7, wait, let's find 7d = 24k + 1. For k=1, 24+1=25 (not div by 7), k=2, 48+1=49 (which is 7 * 7, divisible!). So after 7 doses (49 hours), the time is 8:00 AM. 49 hours is equal to 2 days (48 hours) and 1 hour. Starting on Sunday 7:00 AM + 2 days and 1 hour = Tuesday 8:00 AM.",
    level: [LevelOfExam.PROFESSIONAL]
  },
  {
    id: "m_12",
    category: SubjectCategory.MATHEMATICS,
    subcategory: "Word Problems & Operations",
    questionText: "Of the 300 grocery shoppers surveyed, 96 did not have a regular day of the week on which they shop. What percentage of the shoppers did not have a regular day of shopping?",
    options: ["32%", "48%", "64%", "96%"],
    correctOptionIndex: 0, // 32%
    explanation: "Percentage = (Part / Whole) * 100% = (96 / 300) * 100% = 32%.",
    level: [LevelOfExam.PROFESSIONAL, LevelOfExam.SUB_PROFESSIONAL]
  },
  {
    id: "m_13",
    category: SubjectCategory.MATHEMATICS,
    subcategory: "Word Problems & Operations",
    questionText: "A water container has 100mL of water in it and is 20% full. How many mL of water can this container hold if it is full?",
    options: ["200 mL", "400 mL", "500 mL", "800 mL"],
    correctOptionIndex: 2, // 500 mL
    explanation: "If 100 mL corresponds to 20%, then Full Capacity (100%) = 100 mL / 0.20 = 500 mL.",
    level: [LevelOfExam.PROFESSIONAL, LevelOfExam.SUB_PROFESSIONAL]
  },
  {
    id: "m_14",
    category: SubjectCategory.MATHEMATICS,
    subcategory: "Word Problems & Operations",
    questionText: "How many meters of fencing are needed to enclose an 84-meter by 48-meter rectangular garden?",
    options: ["132m", "244m", "264m", "4,032m²"],
    correctOptionIndex: 2, // 264m
    explanation: "Perimeter = 2 * (length + width) = 2 * (84 + 48) = 2 * (132) = 264 meters.",
    level: [LevelOfExam.PROFESSIONAL, LevelOfExam.SUB_PROFESSIONAL]
  },
  {
    id: "m_15",
    category: SubjectCategory.MATHEMATICS,
    subcategory: "Word Problems & Operations",
    questionText: "A house and lot are sold for Php 14M. The house costs 1.5 times as much as the lot. How much does the lot cost?",
    options: ["Php 5.6M", "Php 8.4M", "Php 10.5M", "Php 21M"],
    correctOptionIndex: 0, // Php 5.6M
    explanation: "Let the lot cost L. The house costs 1.5L. L + 1.5L = 14M -> 2.5L = 14M -> L = 14 / 2.5 = 5.6M. The lot costs Php 5.6M (and the house costs 1.5 * 5.6M = 8.4M).",
    level: [LevelOfExam.PROFESSIONAL]
  },
  {
    id: "m_16",
    category: SubjectCategory.MATHEMATICS,
    subcategory: "Word Problems & Operations",
    questionText: "The sale price of a television set is Php 7,200. The discount rate is 40%. Find its regular price.",
    options: ["Php 4,320", "Php 12,000", "Php 6,800", "Php 10,000"],
    correctOptionIndex: 1, // Php 12,000
    explanation: "The sale price represents 100% - 40% = 60% of the regular price. So, 0.60 * Regular Price = Php 7,200 -> Regular Price = 7,200 / 0.60 = Php 12,000.",
    level: [LevelOfExam.PROFESSIONAL, LevelOfExam.SUB_PROFESSIONAL]
  },
  {
    id: "ds_1",
    category: SubjectCategory.MATHEMATICS,
    subcategory: "Data Sufficiency",
    isDataSufficiency: true,
    questionText: "By what percent was the price per kilo of chicken increased?\n\nStatements:\n1) The price per kilo of chicken was increased by Php20\n2) The price per kilo of chicken was increased to Php120",
    options: [
      "if statement (1) ALONE is sufficient, but statement (2) alone is not sufficient.",
      "if statement (2) ALONE is sufficient, but statement (1) alone is not sufficient.",
      "if BOTH statements TOGETHER are sufficient, but NEITHER statement ALONE is sufficient.",
      "if each statement ALONE is sufficient.",
      "if statement (1) and (2) TOGETHER are not sufficient."
    ],
    correctOptionIndex: 2, // Both together
    explanation: "To find the percent increase, you need the increase amount (Php 20) and either the original price or final price (increased to Php 120). Statement 1 only gives the increase value. Statement 2 only gives the new final value. Together, the original price was 120 - 20 = 100, making the percent increase 20/100 = 20%. Therefore, both statements together are sufficient.",
    level: [LevelOfExam.PROFESSIONAL]
  },
  {
    id: "ds_2",
    category: SubjectCategory.MATHEMATICS,
    subcategory: "Data Sufficiency",
    isDataSufficiency: true,
    questionText: "A real estate broker received a commission of 8% of the selling price of a certain property. What was the selling price of the property?\n\nStatements:\n1) The selling price minus the real estate agent's commission was Php 9,200,000\n2) The selling price was 250% of the original purchase price of Php 4,000,000.",
    options: [
      "if statement (1) ALONE is sufficient, but statement (2) alone is not sufficient.",
      "if statement (2) ALONE is sufficient, but statement (1) alone is not sufficient.",
      "if BOTH statements TOGETHER are sufficient, but NEITHER statement ALONE is sufficient.",
      "if each statement ALONE is sufficient.",
      "if statement (1) and (2) TOGETHER are not sufficient."
    ],
    correctOptionIndex: 3, // each alone
    explanation: "For Statement 1, Selling Price (SP) - Commission (0.08 SP) = 0.92 SP = Php 9,200,000, which can easily be solved to find SP (9,200,000 / 0.92 = 10,000,000). Thus Statement 1 alone is sufficient. For Statement 2, SP = 250% of 4,000,000 = 2.5 * 4,000,000 = 10,000,000. Thus Statement 2 alone is also sufficient. Since each statement is sufficient on its own, the answer is option D.",
    level: [LevelOfExam.PROFESSIONAL]
  }
];
