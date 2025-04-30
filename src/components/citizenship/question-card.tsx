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
import { Question, UserAnswer } from "@/lib/types";
import { cn } from "@/lib/utils";

interface QuestionCardProps {
  question: Question;
  onAnswer: (answers: UserAnswer) => void;
  showFeedback?: boolean;
  userAnswers: UserAnswer["userAnswersId"];
  isLast?: boolean;
}

export function QuestionCard({
  question,
  onAnswer,
  showFeedback = false,
  userAnswers = new Set<string>(),
  // isLast = false,
}: QuestionCardProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<Set<string>>(
    new Set(userAnswers)
  );
  const [isSubmitted, setIsSubmitted] = useState<boolean>(userAnswers.size > 0);
  const [error, setError] = useState<string>("");

  // const isCorrect =
  //   showFeedback &&
  //   selectedAnswers.length === question.correctAnswers.length &&
  //   selectedAnswers.every((answer) =>
  //     question.correctAnswers.includes(answer)
  //   ) &&
  //   question.correctAnswers.every((answer) => selectedAnswers.includes(answer));

  const handleCheckboxChange = (checked: boolean, value: string) => {
    setSelectedAnswers((prev) => {
      const updatedAnswers = new Set(prev);

      if (checked) {
        if (updatedAnswers.size >= question.expectedNumAnswers) {
          setError(
            `Please select only ${question.expectedNumAnswers} answer${
              question.expectedNumAnswers > 1 ? "s" : ""
            }`
          );
          return prev; // Do not add more answers if the limit is reached
        }
        setError("");
        updatedAnswers.add(value); // Add the selected answer
      } else {
        setError("");
        updatedAnswers.delete(value); // Remove the unselected answer
      }

      return updatedAnswers;
    });
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

    const userAnswer: UserAnswer = {
      questionId: question.id,
      userAnswersId: selectedAnswers,
    };

    onAnswer(userAnswer);
    setIsSubmitted(true);
  };

  return (
    <Card className="mx-auto w-full max-w-lg">
      <CardHeader>
        <CardTitle className="text-xl leading-tight">
          {question.prompt}
        </CardTitle>
        <CardDescription>
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
          {question.answers.map((option) => {
            const isOptionSelected = selectedAnswers.has(option.id);

            let optionClassName = "border-2 p-4 rounded-md transition-all";

            if (isSubmitted && showFeedback) {
              const isOptionCorrect = option.isCorrect;
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
              <div key={option.id} className={optionClassName}>
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id={option.id}
                    checked={isOptionSelected}
                    onCheckedChange={(checked) =>
                      handleCheckboxChange(checked as boolean, option.id)
                    }
                    disabled={isSubmitted && showFeedback}
                  />
                  <Label htmlFor={option.id} className="flex-1 cursor-pointer">
                    {option.text}
                  </Label>
                </div>
              </div>
            );
          })}
        </div>

        {error && <p className="text-destructive text-sm">{error}</p>}

        {!isSubmitted && (
          <Button onClick={handleSubmit} className="w-full">
            Submit Answer
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
