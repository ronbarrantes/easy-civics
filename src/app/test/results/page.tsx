"use client";

import { useRouter } from "next/navigation";

import { Home } from "lucide-react";

import { ResultsSummary } from "@/components/citizenship/results-summary";
import { Button } from "@/components/ui/button";
import { useIsComplete, useTestStore } from "@/hooks/use-test";
import { calculateResults } from "@/utils/calculate-results";

export default function ResultsPage() {
  const router = useRouter();
  const { timeEnded, timeStarted, questions, userAnswers } = useTestStore();

  const results = calculateResults({
    timeEnded,
    timeStarted,
    questions,
    userAnswers,
  });

  const isComplete = useIsComplete();
  console.log("ISCOMPLETE", isComplete);

  // TODO: add a check for when a test hasn't beend done
  // maybe if all the answers have not been completed
  // or checkf for "is complete"
  if (!results) {
    return (
      <div className="container mx-auto max-w-md px-4 py-12 text-center">
        <h1 className="mb-4 text-2xl font-bold">No Results Found</h1>
        <p className="mb-6">
          {`It looks like you haven't taken a test yet or your results have
          expired.`}
        </p>
        <Button onClick={() => router.push("/test")}>Take a Test</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8 md:py-12">
      <div className="mb-8 text-center">
        <h1 className="mb-4 text-3xl font-bold">Your Test Results</h1>
        <p className="text-muted-foreground mx-auto max-w-xl">
          Review your performance and see where you can improve.
        </p>
      </div>

      <ResultsSummary results={results} />

      <div className="mt-12 flex justify-center">
        <Button variant="outline" onClick={() => router.push("/")}>
          <Home className="mr-2 h-4 w-4" /> Return to Home
        </Button>
      </div>
    </div>
  );
}
