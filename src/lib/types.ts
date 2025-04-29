export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswers: string[];
  expectedNumAnswers: number;
  category: Category;
  explanation?: string;
  language?: Language;
}

export type Language = "en" | "es";

export type Category =
  | "American Government"
  | "American History"
  | "Integrated Civics"
  | "Rights and Responsibilities";

export interface TestResults {
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  passThreshold: number;
  passed: boolean;
  questionsWithAnswers: {
    question: Question;
    userAnswers: string[];
    isCorrect: boolean;
  }[];
  timeStarted: Date;
  timeEnded?: Date;
}

export interface TestState {
  questions: Question[];
  currentQuestionIndex: number;
  userAnswers: string[][];
  timeStarted: Date;
  timeEnded?: Date;
  isComplete: boolean;
}
