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
import { Question } from "@/lib/types";
import { formatTime } from "@/utils/time";

export default function TestClientPage({
  questions: questionsData,
}: {
  questions: Question[];
}) {
  const {
    questions,
    userAnswers,
    isStarted,
    timeStarted,
    increaseQuestionIndex,
    setQuestions,
    setUserAnswer,
    startTest,
    stopTest,
  } = useTestStore();

  const router = useRouter();

  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    setQuestions(questionsData);
  }, [questionsData, setQuestions]);

  const isCompleted = userAnswers.length >= questions.length - 1;

  // TIMER effect for the test
  useEffect(() => {
    if (!isStarted || isCompleted) return;

    const timer = setInterval(() => {
      setTimeElapsed(
        Math.floor((new Date().getTime() - timeStarted.getTime()) / 1000)
      );
    }, 1000);

    return () => clearInterval(timer);
  }, [isStarted, isCompleted, timeStarted]);

  const handleAnswer = (answer: Set<string>) => {
    if (!isCompleted) {
      // Move to next question
      setUserAnswer(answer);
      increaseQuestionIndex();
    } else {
      // Test complete
      setUserAnswer(answer);
      stopTest();
      router.push("/test/results");
    }
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
            <Button onClick={startTest} className="w-full" size="lg">
              <Flag className="mr-2 h-5 w-5" />
              Start Practice Test
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

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
        currentQuestion={userAnswers.length}
        totalQuestions={questions.length}
      />

      {userAnswers.length + 1 && <QuestionCard onAnswer={handleAnswer} />}
      <div>IS COMPLETED {`${isCompleted}`}</div>
    </div>
  );
}
