"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  BarChart3,
  CheckCheck,
  Circle as CircleFilled,
  CircleAlert,
  CircleCheck,
  RotateCcw,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TestResults } from "@/lib/types";

interface ResultsSummaryProps {
  results: TestResults;
}

/**
 * Displays a summary of a user's U.S. Citizenship Practice Test results, including pass/fail status, scores, answer breakdown, and test duration.
 *
 * Provides options to review answers, retake the test, and navigate to study materials or additional practice tests.
 */
export function ResultsSummary({ results }: ResultsSummaryProps) {
  const router = useRouter();
  const passingPercentage =
    (results.passThreshold / results.totalQuestions) * 100;
  const userPercentage =
    (results.correctAnswers / results.totalQuestions) * 100;

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <Card
        className="border-2 shadow-lg transition-all duration-300"
        style={{
          borderColor: results.passed
            ? "hsl(var(--chart-2))"
            : "hsl(var(--chart-3))",
        }}
      >
        <CardHeader className="pb-2 text-center">
          <CardTitle className="text-2xl md:text-3xl">Test Results</CardTitle>
          <CardDescription>U.S. Citizenship Practice Test</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col items-center justify-center py-4">
            <div className="bg-primary/10 mb-4 flex h-24 w-24 items-center justify-center rounded-full">
              {results.passed ? (
                <CheckCheck className="text-chart-2 h-12 w-12" />
              ) : (
                <CircleAlert className="text-chart-3 h-12 w-12" />
              )}
            </div>
            <h3 className="text-2xl font-bold">
              {results.passed
                ? "Congratulations! You Passed"
                : "Not Passed Yet"}
            </h3>
            <p className="text-muted-foreground mt-2 text-center">
              {results.passed
                ? "You've successfully passed the practice test!"
                : "Keep studying and try again. You can do it!"}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 md:gap-6">
            <div className="bg-card rounded-lg border p-4 text-center">
              <p className="text-muted-foreground mb-1 text-sm">Score</p>
              <p className="text-2xl font-bold">
                {results.correctAnswers}/{results.totalQuestions}
              </p>
              <p className="text-sm">{Math.round(userPercentage)}%</p>
            </div>
            <div className="bg-card rounded-lg border p-4 text-center">
              <p className="text-muted-foreground mb-1 text-sm">
                Passing Score
              </p>
              <p className="text-2xl font-bold">
                {results.passThreshold}/{results.totalQuestions}
              </p>
              <p className="text-sm">{Math.round(passingPercentage)}%</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-sm">
                <CircleCheck className="text-chart-2 h-4 w-4" /> Correct Answers
              </span>
              <span className="font-medium">{results.correctAnswers}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-sm">
                <CircleFilled className="text-chart-3 h-4 w-4" /> Incorrect
                Answers
              </span>
              <span className="font-medium">{results.incorrectAnswers}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-sm">
                <BarChart3 className="text-primary h-4 w-4" /> Test Time
              </span>
              <span className="font-medium">
                {results.timeEnded && results.timeStarted
                  ? formatTime(
                      (new Date(results.timeEnded).getTime() -
                        new Date(results.timeStarted).getTime()) /
                        1000
                    )
                  : "N/A"}
              </span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex w-full flex-col justify-around gap-3 p-2 sm:flex-row sm:gap-0">
          <Button
            variant="default"
            className="w-full transition-none sm:w-5/12"
            onClick={() => router.push("/test/review")}
          >
            Review Answer
          </Button>
          <Button
            variant="outline"
            className="w-full transition-none sm:w-5/12"
            onClick={() => router.push("/test")}
          >
            <RotateCcw className="mr-2 h-4 w-4" /> Try Again
          </Button>
        </CardFooter>
      </Card>

      <div className="space-y-4 text-center">
        <h3 className="text-xl font-medium">Continue your journey</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Link href="/study" className="block">
            <Card className="hover:bg-accent/50 h-full transition-colors duration-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Study Materials</CardTitle>
                <CardDescription>Review key citizenship topics</CardDescription>
              </CardHeader>
            </Card>
          </Link>
          <Link href="/test/practice" className="block">
            <Card className="hover:bg-accent/50 h-full transition-colors duration-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Practice Tests</CardTitle>
                <CardDescription>
                  Take more practice tests by category
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}

/**
 * Converts a number of seconds into a formatted string of minutes and seconds.
 *
 * @param seconds - The total time in seconds.
 * @returns The formatted time string in the format "Xm Ys".
 */
function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}m ${remainingSeconds}s`;
}
