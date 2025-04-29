import { Category, Question } from "./types";

export const sampleQuestions: Question[] = [
  {
    id: "1",
    question: "What is the supreme law of the land?",
    options: [
      "The Constitution",
      "Declaration of Independence",
      "Bill of Rights",
      "Articles of Confederation",
    ],
    correctAnswers: ["The Constitution"],
    expectedNumAnswers: 1,
    category: "American Government",
    explanation:
      "The Constitution is the fundamental framework of the United States government, establishing the structure, procedures, powers, and duties of the government.",
  },
  {
    id: "2",
    question: "What are two rights in the Declaration of Independence?",
    options: [
      "Life",
      "Liberty",
      "Freedom of speech",
      "Right to bear arms",
      "Pursuit of happiness",
    ],
    correctAnswers: ["Life", "Liberty", "Pursuit of happiness"],
    expectedNumAnswers: 3,
    category: "American Government",
    explanation:
      "The Declaration of Independence states that all people have certain unalienable rights, including life, liberty, and the pursuit of happiness.",
  },
  {
    id: "3",
    question: "Name two national U.S. holidays.",
    options: [
      "Independence Day",
      "Memorial Day",
      "Labor Day",
      "Valentine's Day",
      "St. Patrick's Day",
    ],
    correctAnswers: ["Independence Day", "Memorial Day"],
    expectedNumAnswers: 2,
    category: "American History",
    explanation:
      "Independence Day and Memorial Day are federal holidays in the United States.",
  },
  {
    id: "4",
    question: "What is one right or freedom from the First Amendment?",
    options: ["Speech", "Bear arms", "Trial by jury", "Right to vote"],
    correctAnswers: ["Speech"],
    expectedNumAnswers: 1,
    category: "Rights and Responsibilities",
    explanation:
      "The First Amendment protects freedom of speech, religion, press, assembly, and the right to petition the government.",
  },
  {
    id: "5",
    question: "What are two Cabinet-level positions?",
    options: [
      "Secretary of State",
      "Secretary of Defense",
      "Secretary of Education",
      "Chief Justice",
      "Speaker of the House",
    ],
    correctAnswers: ["Secretary of State", "Secretary of Defense"],
    expectedNumAnswers: 2,
    category: "American Government",
    explanation:
      "The Cabinet includes the heads of federal executive departments, with the Secretary of State and Secretary of Defense being two of the most prominent positions.",
  },
];

export const getQuestionsByCategory = (category: Category): Question[] => {
  return sampleQuestions.filter((q) => q.category === category);
};

export const getAllCategories = (): Category[] => {
  return Array.from(new Set(sampleQuestions.map((q) => q.category)));
};

export const getRandomQuestions = (count: number = 10): Question[] => {
  const shuffled = [...sampleQuestions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};
