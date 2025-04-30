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

import { QuestionWithAnswers } from "@/server/api/routers/qa-router";

export type Question = QuestionWithAnswers;

export type Language = "en" | "es";

// TODO: Add the correct categories
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
    userAnswers: UserAnswer[];
    isCorrect: boolean;
  }[];
  timeStarted: Date;
  timeEnded?: Date;
}

export interface UserAnswer {
  questionId: string;
  userAnswersId: Set<string>;
}

export interface TestState {
  questions: Question[];
  currentQuestionIndex: number;
  userAnswers: UserAnswer[];
  timeStarted: Date;
  timeEnded?: Date;
  isComplete: boolean;
}
