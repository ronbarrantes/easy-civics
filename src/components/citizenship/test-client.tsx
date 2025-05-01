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
import { useTestStore } from "@/hooks/use-test";
import { TestResults, TestState, UserAnswer } from "@/lib/types";

export default function TestClientPage({
  questions: questionsData,
}: {
  questions: TestState["questions"];
}) {
  const { questions, setQuestions } = useTestStore();

  const router = useRouter();
  const [testState, setTestState] = useState<Omit<TestState, "questions">>({
    // questions,
    currentQuestionIndex: 0,
    userAnswers: [],
    timeStarted: new Date(),
    isComplete: false,
  });
  const [isStarted, setIsStarted] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    setQuestions(questionsData);
  }, [questionsData, setQuestions]);

  console.log("questions", questions);

  // Timer effect for the test
  useEffect(() => {
    if (!isStarted || testState.isComplete) return;

    const timer = setInterval(() => {
      setTimeElapsed(
        Math.floor(
          (new Date().getTime() - testState.timeStarted.getTime()) / 1000
        )
      );
    }, 1000);

    return () => clearInterval(timer);
  }, [isStarted, testState.timeStarted, testState.isComplete]);

  const handleStartTest = () => {
    setIsStarted(true);
    setTestState({
      ...testState,
      timeStarted: new Date(),
    });
  };

  const handleAnswer = (answer: UserAnswer) => {
    const newUserAnswers = [...testState.userAnswers];

    newUserAnswers[testState.currentQuestionIndex] = answer;

    if (testState.currentQuestionIndex < testState.questions.length - 1) {
      // Move to next question
      setTestState({
        ...testState,
        userAnswers: newUserAnswers,
        currentQuestionIndex: testState.currentQuestionIndex + 1,
      });
    } else {
      // Test complete
      const timeEnded = new Date();

      // Calculate results
      const results: TestResults = calculateResults({
        ...testState,
        userAnswers: newUserAnswers,
        timeEnded,
        isComplete: true,
      });

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
        <button onClick={() => increase(1)}>increase</button>
      </div>
    );
  }

  const currentQuestion = testState.questions[testState.currentQuestionIndex];

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
        currentQuestion={testState.currentQuestionIndex + 1}
        totalQuestions={testState.questions.length}
      />

      {currentQuestion && (
        <QuestionCard
          question={currentQuestion}
          onAnswer={handleAnswer}
          isLast={
            testState.currentQuestionIndex === testState.questions.length - 1
          }
        />
      )}
    </div>
  );
}

function calculateResults(testState: TestState): TestResults {
  const correctAnswers = testState.questions.reduce(
    (count, question, index) => {
      return testState.userAnswers[index] === question.correctAnswer
        ? count + 1
        : count;
    },
    0
  );

  const incorrectAnswers = testState.questions.length - correctAnswers;
  const passThreshold = 6; // 6 out of 10 is passing
  const passed = correctAnswers >= passThreshold;

  const questionsWithAnswers = testState.questions.map((question, index) => ({
    question,
    userAnswer: testState.userAnswers[index],
    isCorrect: testState.userAnswers[index] === question.correctAnswer,
  }));

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
