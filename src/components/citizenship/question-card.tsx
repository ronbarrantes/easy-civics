"use client";

import { useState } from "react";

import { AlertCircle, ArrowRight, CheckCircle, Info } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useTestStore } from "@/hooks/use-test";
import { AnsweredQuestion } from "@/lib/types";
import { cn } from "@/lib/utils";

interface QuestionCardProps {
  onAnswerAction: (answers: Set<string>) => void;
  showFeedback?: boolean;
  isCorrect?: boolean;
  userAnsweredQuestion?: AnsweredQuestion;
}

// TODO: all answers should be capitalize on the first letter, do this with css

export function QuestionCard({
  onAnswerAction,
  userAnsweredQuestion,
  showFeedback = false,
}: QuestionCardProps) {
  const {
    selectedAnswers,
    questions,
    userAnswers,
    currentQuestionIndex,
    toggleAnswer,
    singleChoiceAnswer,
  } = useTestStore();
  const [error, setError] = useState<string>("");

  const question = questions[currentQuestionIndex];
  const isLast = questions.length === userAnswers.length - 1;

  const isCorrect = userAnsweredQuestion?.isCorrect;

  const handleCheckboxChange = (value: string) => {
    if (question.expectedNumAnswers < selectedAnswers.size)
      setError(
        `Please select only ${question.expectedNumAnswers} answer${
          question.expectedNumAnswers > 1 ? "s" : ""
        }`
      );

    if (question.expectedNumAnswers > 1) {
      setError("");
      toggleAnswer(value);
    } else {
      setError("");
      singleChoiceAnswer(value);
    }
    setError("");
  };

  const handleSubmit = () => {
    if (
      selectedAnswers &&
      selectedAnswers.size !== question.expectedNumAnswers
    ) {
      setError(
        `Please select exactly ${question.expectedNumAnswers} answer${question.expectedNumAnswers > 1 ? "s" : ""}`
      );
      return;
    }

    onAnswerAction(selectedAnswers);
  };

  return (
    <Card className="mx-auto w-full max-w-lg">
      <CardHeader>
        <CardTitle className="text-xl leading-tight">
          {question.prompt}
        </CardTitle>
        <CardDescription>
          {/* Category: {question.category} */}
          {question.expectedNumAnswers > 1 && (
            <div className="text-primary mt-2 flex items-center gap-2">
              <Info className="h-4 w-4" />
              <span>Select {question.expectedNumAnswers} answers</span>
            </div>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          {question.answers.map((answer) => {
            const isOptionCorrect = answer.isCorrect;
            const isOptionSelected = userAnsweredQuestion?.userAnswers.has(
              answer.id
            );

            let optionClassName =
              "border-2 px-4 py-0 rounded-md transition-all";

            if (
              // isSubmitted &&
              showFeedback
            ) {
              if (isOptionCorrect) {
                optionClassName = cn(
                  optionClassName,
                  "border-green-500 bg-green-50 dark:bg-green-900/20"
                );
              } else if (isOptionSelected) {
                optionClassName = cn(
                  optionClassName,
                  "border-red-500 bg-red-50 dark:bg-red-900/20"
                );
              }
            } else if (isOptionSelected) {
              optionClassName = cn(optionClassName, "border-primary");
            } else {
              optionClassName = cn(
                optionClassName,
                "border-muted hover:border-muted-foreground/50"
              );
            }

            return (
              <div key={answer.id} className={optionClassName}>
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id={answer.id}
                    checked={selectedAnswers.has(answer.id)}
                    onCheckedChange={() => handleCheckboxChange(answer.id)}
                    disabled={
                      // isSubmitted &&
                      showFeedback
                    }
                  />
                  <Label
                    htmlFor={answer.id}
                    className="flex-1 cursor-pointer px-0 py-4"
                  >
                    {answer.text}
                  </Label>
                  {
                    // isSubmitted &&
                    showFeedback && isOptionCorrect && (
                      <CheckCircle className="h-5 w-5 flex-shrink-0 text-green-500" />
                    )
                  }
                  {
                    // isSubmitted &&
                    showFeedback && isOptionSelected && !isOptionCorrect && (
                      <AlertCircle className="h-5 w-5 flex-shrink-0 text-red-500" />
                    )
                  }
                </div>
              </div>
            );
          })}
        </div>

        {error && <p className="text-destructive text-sm">{error}</p>}

        {showFeedback && (
          // && isSubmitted
          <div
            className={cn(
              "mt-4 rounded-md p-4",
              isCorrect
                ? "bg-green-50 text-green-900 dark:bg-green-900/20 dark:text-green-50"
                : "bg-red-50 text-red-900 dark:bg-red-900/20 dark:text-red-50"
            )}
          >
            <p className="mb-2 font-medium">
              {isCorrect
                ? "Correct answer!"
                : `Incorrect. The correct answers are: ${question.answers
                    .filter((answer) => answer.isCorrect)
                    .map((answer) => answer.text)
                    .join(", ")}`}
            </p>
            {question.explanation && (
              <p className="text-sm">{question.explanation}</p>
            )}
          </div>
        )}

        {
          // !isSubmitted &&
          !showFeedback && (
            <Button
              onClick={handleSubmit}
              className="w-full"
              disabled={selectedAnswers.size !== question.expectedNumAnswers}
            >
              {isLast ? (
                "See results"
              ) : userAnswers.length === 0 ? (
                "Submit Answer"
              ) : (
                <>
                  Next Question
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          )
        }
      </CardContent>
    </Card>
  );
}
