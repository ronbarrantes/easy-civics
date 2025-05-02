"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { Clock, Flag } from "lucide-react";

import { ProgressBar } from "@/components/citizenship/progress-bar";
import { QuestionCard } from "@/components/citizenship/question-card";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TestStore, useTestStore } from "@/hooks/use-test";
import { Question, TestResults, TestState } from "@/lib/types";

type NewTestState = Omit<
  TestState,
  "questions" | "userAnswers" | "isComplete" | "currentQuestionIndex"
>;

export default function TestClientPage({
  questions: questionsData,
}: {
  questions: Question[];
}) {
  // ZUSTAND STATE
  const {
    questions,
    userAnswers,
    currentQuestionIndex,
    isStarted,
    increaseQuestionIndex,
    setQuestions,
    setUserAnswer,
    startTest,
    stopTest,
  } = useTestStore();

  const router = useRouter();
  const [testState, setTestState] = useState<NewTestState>({
    timeStarted: new Date(),
  });

  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    setQuestions(questionsData);
  }, [questionsData, setQuestions]);

  const isCompleted = userAnswers.length >= questions.length;

  console.log(
    "IS COMPLETED --->>",
    isCompleted,
    userAnswers.length,
    questions.length
  );

  // Timer effect for the test
  useEffect(() => {
    if (!isStarted || isCompleted) return;

    const timer = setInterval(() => {
      setTimeElapsed(
        Math.floor(
          (new Date().getTime() - testState.timeStarted.getTime()) / 1000
        )
      );
    }, 1000);

    return () => clearInterval(timer);
  }, [isStarted, testState.timeStarted, isCompleted]);

  const handleStartTest = () => {
    startTest();
    setTestState({
      ...testState,
      timeStarted: new Date(),
    });
  };

  const handleAnswer = (answer: Set<string>) => {
    if (!isCompleted) {
      // Move to next question
      setUserAnswer(answer);
      increaseQuestionIndex();
    } else {
      // Test complete
      setUserAnswer(answer);
      const timeEnded = new Date();

      // Calculate results
      const results: TestResults = calculateResults({
        ...testState,
        questions,
        userAnswers,
        timeEnded,
      });

      stopTest();

      // Save results to local storage for results page
      localStorage.setItem("testResults", JSON.stringify(results));

      // Navigate to results page
      router.push("/test/results");
    }
  };

  // Format time in MM:SS
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  if (!isStarted) {
    return (
      <div className="container mx-auto max-w-3xl px-4 py-12">
        <Card className="mb-8">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl md:text-3xl">
              U.S. Citizenship Test Practice
            </CardTitle>
            <CardDescription>
              Test your knowledge of U.S. history and government
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-accent rounded-lg p-4">
              <h3 className="mb-2 text-lg font-semibold">Test Information</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>
                    This practice test contains 10 questions from the official
                    USCIS test.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>
                    You need to answer 6 out of 10 questions correctly to pass.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>
                    Take your time - there is no time limit for the real test.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>
                    Answer each question before moving to the next one.
                  </span>
                </li>
              </ul>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleStartTest} className="w-full" size="lg">
              <Flag className="mr-2 h-5 w-5" />
              Start Practice Test
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  const currentQuestion = questionsData[currentQuestionIndex];

  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Practice Test</h1>
        <div className="flex items-center">
          <Clock className="mr-2 h-5 w-5" />
          <span className="font-mono">{formatTime(timeElapsed)}</span>
        </div>
      </div>

      <ProgressBar
        currentQuestion={userAnswers.length + 1}
        totalQuestions={questions.length}
      />

      {userAnswers.length + 1 && (
        <QuestionCard
          question={currentQuestion}
          onAnswer={handleAnswer}
          isLast={questions.length === userAnswers.length - 1}
          // userAnswers={userAnswers}
        />
      )}
      <div>IS COMPLETED {`${isCompleted}`}</div>
    </div>
  );
}

// function calculateResults(
//   testState: NewTestState & {
//     questions: TestStore["questions"];
//     userAnswers: TestStore["userAnswers"];
//   }
// ): TestResults {
//   const correctAnswers = testState.questions.reduce((count, question) => {
//     const expectedNumAnswers = question.expectedNumAnswers;
//     const userAnswers = testState.userAnswers.filter(
//       (answer) => answer.questionId === question.id
//     );

//     const correctNumAnswers = question.answers.filter((answer) =>
//       userAnswers.some((userAnswer) => userAnswer.id === answer.id)
//     );

//     return count + (correctNumAnswers.length >= expectedNumAnswers ? 1 : 0);
//   }, 0);

//   const incorrectAnswers = testState.questions.length - correctAnswers;
//   const passThreshold = 6; // 6 out of 10 is passing
//   const passed = correctAnswers >= passThreshold;

//   const questionsWithAnswers = testState.questions.map((question, index) => ({
//     question,
//     userAnswer: testState.userAnswers[index],
//     isCorrect: correctAnswers >= question.expectedNumAnswers,
//   }));

//   return {
//     totalQuestions: testState.questions.length,
//     correctAnswers,
//     incorrectAnswers,
//     passThreshold,
//     passed,
//     questionsWithAnswers,
//     timeStarted: testState.timeStarted,
//     timeEnded: testState.timeEnded || new Date(),
//   };
// }

function calculateResults(
  testState: NewTestState & {
    questions: TestStore["questions"];
    userAnswers: TestStore["userAnswers"];
  }
): TestResults {
  const correctAnswers = testState.questions.reduce((count, question) => {
    const expectedNumAnswers = question.expectedNumAnswers;
    const userAnswers = testState.userAnswers.filter(
      (answer) => answer.questionId === question.id
    );

    const correctNumAnswers = question.answers.filter(
      (answer) =>
        answer.isCorrect &&
        userAnswers.some((userAnswer) => userAnswer.id === answer.id)
    );

    return count + (correctNumAnswers.length >= expectedNumAnswers ? 1 : 0);
  }, 0);

  const incorrectAnswers = testState.questions.length - correctAnswers;
  const passThreshold = 6; // 6 out of 10 is passing
  const passed = correctAnswers >= passThreshold;

  const questionsWithAnswers = testState.questions.map((question) => {
    const userAnswers = testState.userAnswers.filter(
      (answer) => answer.questionId === question.id
    );

    const correctNumAnswers = question.answers.filter(
      (answer) =>
        answer.isCorrect &&
        userAnswers.some((userAnswer) => userAnswer.id === answer.id)
    );

    const isCorrect = correctNumAnswers.length >= question.expectedNumAnswers;

    return {
      question,
      userAnswers,
      isCorrect,
    };
  });

  return {
    totalQuestions: testState.questions.length,
    correctAnswers,
    incorrectAnswers,
    passThreshold,
    passed,
    questionsWithAnswers,
    timeStarted: testState.timeStarted,
    timeEnded: testState.timeEnded || new Date(),
  };
}
