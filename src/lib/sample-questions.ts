import { Category, Question } from "./types";

export const sampleQuestions: Question[] = [];

export const getQuestionsByCategory = (category: Category): Question[] => {
  return sampleQuestions.filter((q) => q.prompt === category);
};

export const getAllCategories = (): Category[] => {
  return Array.from(new Set(sampleQuestions.map((q) => q.category)));
};

export const getRandomQuestions = (count: number = 10): Question[] => {
  const shuffled = [...sampleQuestions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};
