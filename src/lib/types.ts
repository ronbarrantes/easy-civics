// export interface Question {
//   id: string;
//   question: string;
//   options: string[];
//   correctAnswers: string[];
//   expectedNumAnswers: number;
//   category?: Category;
//   explanation?: string;
//   language?: Language;
// }

export interface Answer {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface Question {
  id: string;
  questionNumber: number;
  prompt: string;
  expectedNumAnswers: number;
  explanation: string | null;
  answers: Answer[];
}

export type Language = "en" | "es";

// TODO: Add the correct categories
export type Category =
  | "American Government"
  | "American History"
  | "Integrated Civics"
  | "Rights and Responsibilities";

export interface AnsweredQuestion {
  question: Question;
  userAnswers: Set<string>;
  isCorrect: boolean;
}

export interface TestResults {
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  passThreshold: number;
  passed: boolean;
  questionsWithAnswers: AnsweredQuestion[];
  timeStarted: Date;
  timeEnded?: Date;
}

export interface TestState {
  questions: Question[];
  currentQuestionIndex: number;
  userAnswers: Array<Set<string>>;
  timeStarted: Date;
  timeEnded?: Date;
  isComplete: boolean;
}
