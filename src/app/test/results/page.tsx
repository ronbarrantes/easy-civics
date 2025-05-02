"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { Home } from "lucide-react";

import { ResultsSummary } from "@/components/citizenship/results-summary";
import { Button } from "@/components/ui/button";
import { TestResults } from "@/lib/types";

export default function ResultsPage() {
  const router = useRouter();
  const [results, setResults] = useState<TestResults | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const storedResults = localStorage.getItem("testResults");
      if (storedResults) {
        const parsedResults = JSON.parse(storedResults);
        setResults(parsedResults);
      } else {
        // No results found, redirect to test page
        router.push("/test");
      }
    } catch (error) {
      console.error("Error loading test results:", error);
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  if (isLoading) {
    return (
      <div className="container mx-auto max-w-md px-4 py-12 text-center">
        <p>Loading your results...</p>
      </div>
    );
  }

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
