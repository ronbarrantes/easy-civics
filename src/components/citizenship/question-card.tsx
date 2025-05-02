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
import { Question } from "@/lib/types";
import { cn } from "@/lib/utils";

interface QuestionCardProps {
  question: Question;
  onAnswer: (answers: Set<string>) => void;
  showFeedback?: boolean;
  // setSelectedAnswers?: (answers: Set<string>) => void;
  isLast?: boolean;
}

export function QuestionCard({
  question,
  onAnswer,
  showFeedback = false,
  isLast = false,
}: QuestionCardProps) {
  // const [selectedAnswers, setSelectedAnswers] = useState<Set<string>>(
  //   new Set()
  // );
  // const [isSubmitted, setIsSubmitted] = useState<boolean>(userAnswers.size > 0);
  const { selectedAnswers, toggleAnswer, singleChoiceAnswer } = useTestStore();
  const [error, setError] = useState<string>("");

  const correctAnswers = question.answers.filter((a) => a.isCorrect);

  const allCorrectAnswersSelected = correctAnswers.every((a) =>
    selectedAnswers.has(a.id)
  );

  const noIncorrectAnswersSelected = Array.from(selectedAnswers).every((id) =>
    correctAnswers.some((a) => a.id === id)
  );

  const isCorrect =
    showFeedback &&
    selectedAnswers.size === correctAnswers.length &&
    allCorrectAnswersSelected &&
    noIncorrectAnswersSelected;

  const handleCheckboxChange = (checked: boolean, value: string) => {
    // setSelectedAnswers((prev) => {
    //   const updatedAnswers = new Set(prev);

    //   if (checked) {
    //     if (updatedAnswers.size >= question.expectedNumAnswers) {
    //       setError(
    //         `Please select only ${question.expectedNumAnswers} answer${
    //           question.expectedNumAnswers > 1 ? "s" : ""
    //         }`
    //       );
    //       return prev; // Do not add more answers if the limit is reached
    //     }
    //     setError("");
    //     updatedAnswers.add(value); // Add the selected answer
    //   } else {
    //     setError("");
    //     updatedAnswers.delete(value); // Remove the unselected answer
    //   }

    //   return updatedAnswers;
    // });

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

    // const userAnswer: UserAnswer = {
    //   questionId: question.id,
    //   userAnswersId: selectedAnswers,
    // };

    console.log("selectedAnswers ---->>>", selectedAnswers);

    onAnswer(selectedAnswers);
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
            const isOptionSelected = selectedAnswers.has(answer.id);

            let optionClassName = "border-2 p-4 rounded-md transition-all";

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
                <div
                  className="flex items-center space-x-3"
                  // onClick={}
                >
                  <Checkbox
                    id={answer.id}
                    checked={selectedAnswers.has(answer.id)}
                    onCheckedChange={(checked) =>
                      handleCheckboxChange(checked as boolean, answer.id)
                    }
                    disabled={
                      // isSubmitted &&
                      showFeedback
                    }
                  />
                  <Label htmlFor={answer.id} className="flex-1 cursor-pointer">
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
                : `Incorrect. The correct answers are: ${question.answers.filter((answer) => answer.isCorrect).join(", ")}`}
            </p>
            {question.explanation && (
              <p className="text-sm">{question.explanation}</p>
            )}
          </div>
        )}

        {
          // !isSubmitted &&

          <Button
            onClick={handleSubmit}
            className="w-full"
            disabled={selectedAnswers.size !== question.expectedNumAnswers}
          >
            Submit Answer
          </Button>
        }

        {/* {isSubmitted && !showFeedback && (
          <Button onClick={() => onAnswer(selectedAnswers)} className="w-full">
            {isLast ? "See Results" : "Next Question"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        )} */}
      </CardContent>
    </Card>
  );
}
