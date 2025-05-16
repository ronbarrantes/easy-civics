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
import { InitialScreen } from "./test-client-initial-screen";

export default function TestClientPage({
  questions: questionsData,
}: {
  questions: Question[];
}) {
  const router = useRouter();
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
    return <InitialScreen startTest={startTest} />;
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

      {userAnswers.length + 1 && <QuestionCard onAnswerAction={handleAnswer} />}
    </div>
  );
}
