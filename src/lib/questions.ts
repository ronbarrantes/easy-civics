import questionsEn from "@/data/civics_questions_en.json";
import questionsEs from "@/data/civics_questions_es.json";
import { Language, Question } from "@/lib/types";
import { filterAndRandomizeAnswers } from "@/utils/filter-and-randomize-answers";
import { randomizeArray } from "@/utils/randomize-array";

type QuestionJson = {
  questionNumber: number;
  prompt: string;
  expectedNumAnswers: number;
  language: string;
  explanation?: string;
  incorrectAnswers: string[];
  correctAnswers: string[];
};

const toQuestion = (q: QuestionJson): Question => {
  const id = `${q.language}-${q.questionNumber}`;
  return {
    id,
    questionNumber: q.questionNumber,
    prompt: q.prompt,
    expectedNumAnswers: q.expectedNumAnswers,
    explanation: q.explanation ?? null,
    answers: [
      ...q.correctAnswers.map((text, idx) => ({
        id: `${id}-c${idx}`,
        text,
        isCorrect: true,
      })),
      ...q.incorrectAnswers.map((text, idx) => ({
        id: `${id}-i${idx}`,
        text,
        isCorrect: false,
      })),
    ],
  };
};

const questionsByLanguage: Record<Language, Question[]> = {
  en: (questionsEn as QuestionJson[]).map(toQuestion),
  es: (questionsEs as QuestionJson[]).map(toQuestion),
};

export const getRandomQuestions = (
  language: Language,
  count: number
): Question[] =>
  filterAndRandomizeAnswers(
    randomizeArray(questionsByLanguage[language]).slice(0, count)
  );
