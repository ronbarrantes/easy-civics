import { QuestionWithAnswers } from "@/server/api/routers/qa-router";
import { pickUniqueRandomNumbers } from "./random-numbers";
import { randomizeArray } from "./randomize-array";

const MAX_NUMBER_OF_ANSWERS = 5;

const getQuestionReady = (
  question: QuestionWithAnswers
): QuestionWithAnswers => {
  // TODO:I need to get the answers and the expected number of answers
  // according to how many expected answers, I need to have at most that many correct
  // answers and the rest being incorrect answers
  // (maybe minus all the correct answers to add to no more than 5 answers total)
  //
  // filter the correct and incorrect answers
  //
  const correctAnswers: QuestionWithAnswers["answers"] = [];
  const incorrectAnswers: QuestionWithAnswers["answers"] = [];
  const answersToRandomize: QuestionWithAnswers["answers"] = [];

  /// split the answers into correct and incorrect
  question.answers.forEach((answer) => {
    if (answer.isCorrect) correctAnswers.push(answer);
    else incorrectAnswers.push(answer);
    //
    const correctAnswerCount = question.expectedNumAnswers;
    const incorrectAnswerCount = MAX_NUMBER_OF_ANSWERS - correctAnswerCount;

    const rndCorrectIdx = pickUniqueRandomNumbers(
      correctAnswerCount,
      0,
      correctAnswers.length
    );

    const rndIncorrectIdx = pickUniqueRandomNumbers(
      incorrectAnswerCount,
      0,
      incorrectAnswers.length
    );

    rndCorrectIdx.forEach((idx) =>
      answersToRandomize.push(correctAnswers[idx])
    );

    rndIncorrectIdx.forEach((idx) =>
      answersToRandomize.push(incorrectAnswers[idx])
    );
  });

  return { ...question, answers: randomizeArray(answersToRandomize) };
};

export const filterAndRandomizeAnswers = (
  questions: QuestionWithAnswers[]
): QuestionWithAnswers[] =>
  questions.map((question) => getQuestionReady(question));
