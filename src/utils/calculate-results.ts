import { Answer, TestResults, TestState } from "@/lib/types";
import { PASS_THRESHOLD } from "./constants";

const getCurrNumAnswers = (
  question: TestState["questions"][0],
  userAnswersSet: Set<string>
) => question.answers.filter((answer) => userAnswersSet.has(answer.id));

const getCorrectNumAnswers = (
  question: TestState["questions"][0],
  userAnswers: Answer[]
) =>
  question.answers.filter(
    (answer) =>
      answer.isCorrect &&
      userAnswers.some((userAnswer) => userAnswer.id === answer.id)
  );

export const calculateResults = ({
  questions: qt,
  userAnswers: uA,
  timeStarted: tS,
  timeEnded: tE,
}: Omit<TestState, "currentQuestionIndex" | "isComplete">): TestResults => {
  const userAnswersSet = new Set(
    uA.flatMap((userAnswer) => Array.from(userAnswer))
  );
  const correctQuestions = qt.filter((question) => {
    const expectedNumAnswers = question.expectedNumAnswers;

    const userAnswers = getCurrNumAnswers(question, userAnswersSet);

    const correctNumAnswers = getCorrectNumAnswers(question, userAnswers);

    return correctNumAnswers.length >= expectedNumAnswers;
  });

  const questionsWithAnswers = qt.map((question, idx) => {
    const userAnswers = getCurrNumAnswers(question, userAnswersSet);

    const correctNumAnswers = getCorrectNumAnswers(question, userAnswers);
    const isCorrect = correctNumAnswers.length >= question.expectedNumAnswers;

    return {
      question,
      userAnswers: uA[idx],
      isCorrect,
    };
  });

  return {
    totalQuestions: qt.length,
    correctAnswers: correctQuestions.length,
    incorrectAnswers: qt.length - correctQuestions.length,
    passThreshold: PASS_THRESHOLD,
    passed: correctQuestions.length >= PASS_THRESHOLD,
    timeStarted: tS,
    timeEnded: tE || new Date(),
    questionsWithAnswers,
  };
};
