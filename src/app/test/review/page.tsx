"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { ChevronLeft, ChevronRight, Home } from "lucide-react";

import { QuestionCard } from "@/components/citizenship/question-card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useIsComplete, useTestStore } from "@/hooks/use-test";
import { calculateResults } from "@/utils/calculate-results";

type SelectValueType = "all" | "correct" | "incorrect";

export default function ReviewPage() {
  const router = useRouter();
  const [filter, setFilter] = useState<"all" | "correct" | "incorrect">("all");

  const {
    timeEnded,
    timeStarted,
    questions,
    userAnswers,
    currentQuestionIndex: currentIndex,
    increaseQuestionIndex,
    decreaseQuestionIndex,
    resetQuestionIndex,
  } = useTestStore();

  const results = calculateResults({
    timeEnded,
    timeStarted,
    questions,
    userAnswers,
  });

  const isComplete = useIsComplete();
  console.log("ISCOMPLETE", isComplete);

  if (!isComplete) {
    return (
      <div className="container mx-auto max-w-md px-4 py-12 text-center">
        <p>No results found. Please take a test first.</p>
      </div>
    );
  }

  const filteredQuestions = results.questionsWithAnswers.filter((q) => {
    if (filter === "all") return true;
    if (filter === "correct") return q.isCorrect;
    if (filter === "incorrect") return !q.isCorrect;
    return true;
  });

  console.log("FILTERED QUESTIONS", filteredQuestions);

  if (filteredQuestions.length === 0) {
    return (
      <div className="container mx-auto max-w-md px-4 py-12 text-center">
        <h1 className="mb-4 text-2xl font-bold">No {filter} answers found</h1>
        <p className="mb-6">Change the filter to view other questions.</p>
        <div className="mb-8 flex justify-center">
          <Select
            value={filter}
            onValueChange={(value) => setFilter(value as SelectValueType)}
          >
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter answers" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Questions</SelectItem>
              <SelectItem value="correct">Correct Only</SelectItem>
              <SelectItem value="incorrect">Incorrect Only</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button variant="outline" onClick={() => router.push("/")}>
          <Home className="mr-2 h-4 w-4" /> Return to Home
        </Button>
      </div>
    );
  }

  const currentQuestion = filteredQuestions[currentIndex];

  return (
    <div className="container mx-auto max-w-3xl px-4 py-8 md:py-12">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Review Answers</h1>
        <Select
          value={filter}
          onValueChange={(value) => {
            setFilter(value as SelectValueType);
            resetQuestionIndex();
          }}
        >
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Filter answers" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Questions</SelectItem>
            <SelectItem value="correct">Correct Only</SelectItem>
            <SelectItem value="incorrect">Incorrect Only</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="mb-4 flex justify-between text-sm">
        <span>
          Question {currentIndex + 1} of {filteredQuestions.length}
        </span>
        <span
          className={
            currentQuestion.isCorrect
              ? "text-green-600 dark:text-green-400"
              : "text-red-600 dark:text-red-400"
          }
        >
          {currentQuestion.isCorrect ? "Correct" : "Incorrect"}
        </span>
      </div>

      <QuestionCard onAnswerAction={() => {}} showFeedback={true} />

      <div className="mt-8 flex justify-between">
        <Button
          variant="outline"
          // work here
          onClick={() => decreaseQuestionIndex()}
          disabled={currentIndex === 0}
        >
          <ChevronLeft className="mr-2 h-4 w-4" /> Previous
        </Button>

        <Button variant="outline" onClick={() => router.push("/")}>
          <Home className="mr-2 h-4 w-4" /> Home
        </Button>

        <Button
          variant="outline"
          onClick={() => increaseQuestionIndex()}
          disabled={currentIndex === filteredQuestions.length - 1}
        >
          Next <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
