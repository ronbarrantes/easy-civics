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
import { Question } from "@/lib/types";
import { cn } from "@/lib/utils";

interface QuestionCardProps {
  question: Question;
  onAnswer: (answers: string[]) => void;
  showFeedback?: boolean;
  userAnswers?: string[];
  isLast?: boolean;
}

export function QuestionCard({
  question,
  onAnswer,
  showFeedback = false,
  userAnswers = [],
  isLast = false,
}: QuestionCardProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>(userAnswers);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(
    userAnswers.length > 0
  );
  const [error, setError] = useState<string>("");

  const isCorrect =
    showFeedback &&
    selectedAnswers.length === question.correctAnswers.length &&
    selectedAnswers.every((answer) =>
      question.correctAnswers.includes(answer)
    ) &&
    question.correctAnswers.every((answer) => selectedAnswers.includes(answer));

  const handleCheckboxChange = (checked: boolean, value: string) => {
    setSelectedAnswers((prev) => {
      if (checked) {
        if (prev.length >= question.expectedNumAnswers) {
          setError(
            `Please select only ${question.expectedNumAnswers} answer${question.expectedNumAnswers > 1 ? "s" : ""}`
          );
          return prev;
        }
        setError("");
        return [...prev, value];
      } else {
        setError("");
        return prev.filter((a) => a !== value);
      }
    });
  };

  const handleSubmit = () => {
    if (selectedAnswers.length !== question.expectedNumAnswers) {
      setError(
        `Please select exactly ${question.expectedNumAnswers} answer${question.expectedNumAnswers > 1 ? "s" : ""}`
      );
      return;
    }

    onAnswer(selectedAnswers);
    setIsSubmitted(true);
  };

  return (
    <Card className="mx-auto w-full max-w-lg">
      <CardHeader>
        <CardTitle className="text-xl leading-tight">
          {question.question}
        </CardTitle>
        <CardDescription>
          Category: {question.category}
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
          {question.options.map((option) => {
            const isOptionCorrect = question.correctAnswers.includes(option);
            const isOptionSelected = selectedAnswers.includes(option);

            let optionClassName = "border-2 p-4 rounded-md transition-all";

            if (isSubmitted && showFeedback) {
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
              <div key={option} className={optionClassName}>
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id={`option-${question.id}-${option.replace(/\s+/g, "-").toLowerCase()}`}
                    checked={selectedAnswers.includes(option)}
                    onCheckedChange={(checked) =>
                      handleCheckboxChange(checked as boolean, option)
                    }
                    disabled={isSubmitted && showFeedback}
                  />
                  <Label
                    htmlFor={`option-${question.id}-${option.replace(/\s+/g, "-").toLowerCase()}`}
                    className="flex-1 cursor-pointer"
                  >
                    {option}
                  </Label>
                  {isSubmitted && showFeedback && isOptionCorrect && (
                    <CheckCircle className="h-5 w-5 flex-shrink-0 text-green-500" />
                  )}
                  {isSubmitted &&
                    showFeedback &&
                    isOptionSelected &&
                    !isOptionCorrect && (
                      <AlertCircle className="h-5 w-5 flex-shrink-0 text-red-500" />
                    )}
                </div>
              </div>
            );
          })}
        </div>

        {error && <p className="text-destructive text-sm">{error}</p>}

        {showFeedback && isSubmitted && (
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
                : `Incorrect. The correct answers are: ${question.correctAnswers.join(", ")}`}
            </p>
            {question.explanation && (
              <p className="text-sm">{question.explanation}</p>
            )}
          </div>
        )}

        {!isSubmitted && (
          <Button
            onClick={handleSubmit}
            className="w-full"
            disabled={selectedAnswers.length !== question.expectedNumAnswers}
          >
            Submit Answer
          </Button>
        )}

        {isSubmitted && !showFeedback && (
          <Button onClick={() => onAnswer(selectedAnswers)} className="w-full">
            {isLast ? "See Results" : "Next Question"}{" "}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
