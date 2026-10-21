import { Question } from "@/lib/types";
import {
  MAX_NUMBER_OF_ANSWERS,
  MIN_NUMBER_OF_INCORRECT_ANSWERS,
} from "@/utils/constants";
import { randomizeArray } from "@/utils/randomize-array";

const getQuestionReady = (question: Question): Question => {
  const correctAnswers: Question["answers"] = [];
  const incorrectAnswers: Question["answers"] = [];

  // Split answers into correct and incorrect
  question.answers.forEach((answer) => {
    if (answer.isCorrect) correctAnswers.push(answer);
    else incorrectAnswers.push(answer);
  });

  const correctAnswerCount = question.expectedNumAnswers;
  // "Name five" style questions would otherwise leave no wrong options
  const incorrectAnswerCount = Math.min(
    Math.max(
      MAX_NUMBER_OF_ANSWERS - correctAnswerCount,
      MIN_NUMBER_OF_INCORRECT_ANSWERS
    ),
    incorrectAnswers.length
  );

  // Randomize correct and incorrect answers
  const selectedCorrectAnswers = randomizeArray(correctAnswers).slice(
    0,
    correctAnswerCount
  );
  const selectedIncorrectAnswers = randomizeArray(incorrectAnswers).slice(
    0,
    incorrectAnswerCount
  );

  // Combine and shuffle the final answers
  const answersToRandomize = [
    ...selectedCorrectAnswers,
    ...selectedIncorrectAnswers,
  ];

  return { ...question, answers: randomizeArray(answersToRandomize) };
};

export const filterAndRandomizeAnswers = (questions: Question[]): Question[] =>
  questions.map((question) => getQuestionReady(question));
