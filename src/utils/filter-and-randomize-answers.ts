import { QuestionWithAnswers } from "@/server/api/routers/qa-router";
import { MAX_NUMBER_OF_ANSWERS } from "@/utils/constants";
import { randomizeArray } from "@/utils/randomize-array";

const getQuestionReady = (
  question: QuestionWithAnswers
): QuestionWithAnswers => {
  const correctAnswers: QuestionWithAnswers["answers"] = [];
  const incorrectAnswers: QuestionWithAnswers["answers"] = [];

  // Split answers into correct and incorrect
  question.answers.forEach((answer) => {
    if (answer.isCorrect) correctAnswers.push(answer);
    else incorrectAnswers.push(answer);
  });

  const correctAnswerCount = question.expectedNumAnswers;
  const incorrectAnswerCount = Math.min(
    MAX_NUMBER_OF_ANSWERS - correctAnswerCount,
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

export const filterAndRandomizeAnswers = (
  questions: QuestionWithAnswers[]
): QuestionWithAnswers[] =>
  questions.map((question) => getQuestionReady(question));
