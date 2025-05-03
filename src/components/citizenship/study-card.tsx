"use client";

import { useState } from "react";

import { ArrowLeftRight, ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Question } from "@/lib/types";
import { cn } from "@/lib/utils";

interface StudyCardProps {
  questions: Question[];
  initialIndex?: number;
}

/**
 * Displays a flashcard interface for studying a list of questions, allowing users to flip between questions and answers and navigate through the set.
 *
 * Renders a card with a 3D flip animation to toggle between the question and answer sides. Users can move to the next or previous card, and the component tracks the current card index and answer visibility. Returns null if there are no questions or the current index is invalid.
 *
 * @param questions - The array of questions to display as flashcards.
 * @param initialIndex - (Optional) The starting index for the flashcard set.
 *
 * @returns The study card UI for the current question, or null if no valid question is available.
 */
export function StudyCard({ questions, initialIndex = 0 }: StudyCardProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [showAnswer, setShowAnswer] = useState(false);
  const currentQuestion = questions[currentIndex];

  const goToNextCard = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowAnswer(false);
    }
  };

  const goToPreviousCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setShowAnswer(false);
    }
  };

  const toggleAnswer = () => {
    setShowAnswer(!showAnswer);
  };

  if (!currentQuestion) return null;

  return (
    <div className="mx-auto w-full max-w-md">
      <div className="mb-4 text-center text-sm">
        Card {currentIndex + 1} of {questions.length}
      </div>
      <Card className="perspective-1000 my-6 h-80 w-full transition-transform duration-500">
        <div
          className={cn(
            "transform-style-3d relative h-full w-full transition-transform duration-500",
            showAnswer ? "rotate-y-180" : ""
          )}
        >
          <div className="absolute flex h-full w-full flex-col backface-hidden">
            <CardHeader className="flex flex-grow items-center justify-center p-6 text-center">
              <h2 className="text-xl leading-relaxed font-semibold">
                {
                  //TODO: fix this:
                  //  currentQuestion.question
                }
              </h2>
            </CardHeader>
            <CardFooter className="border-t p-4">
              <Button onClick={toggleAnswer} className="w-full">
                <ArrowLeftRight className="mr-2 h-4 w-4" /> Show Answer
              </Button>
            </CardFooter>
          </div>

          <div className="absolute flex h-full w-full rotate-y-180 flex-col backface-hidden">
            <CardHeader className="flex flex-grow items-center justify-center p-6 text-center">
              <div className="space-y-4">
                <h3 className="text-primary text-lg font-medium">Answer:</h3>
                <p className="text-xl font-semibold">
                  {
                    //TODO: fix this:
                    //currentQuestion.correctAnswers.join(", ")
                  }
                </p>
                {currentQuestion.explanation && (
                  <div className="text-muted-foreground mt-4 border-t pt-4 text-sm">
                    {currentQuestion.explanation}
                  </div>
                )}
              </div>
            </CardHeader>
            <CardFooter className="border-t p-4">
              <Button onClick={toggleAnswer} className="w-full">
                <ArrowLeftRight className="mr-2 h-4 w-4" /> Show Question
              </Button>
            </CardFooter>
          </div>
        </div>
      </Card>

      <CardContent className="flex justify-between pt-4">
        <Button
          variant="outline"
          onClick={goToPreviousCard}
          disabled={currentIndex === 0}
        >
          <ChevronLeft className="mr-2 h-4 w-4" /> Previous
        </Button>
        <Button
          variant="outline"
          onClick={goToNextCard}
          disabled={currentIndex === questions.length - 1}
        >
          Next <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </div>
  );
}
