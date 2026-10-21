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

export type TextSize = "large" | "larger";

export type Theme = "light" | "dark";
