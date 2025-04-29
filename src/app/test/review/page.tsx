"use client";

import { useEffect, useState } from "react";
import { TestResults } from "@/lib/types";
import { useRouter } from "next/navigation";
import { QuestionCard } from "@/components/citizenship/question-card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Home } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ReviewPage() {
  const router = useRouter();
  const [results, setResults] = useState<TestResults | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filter, setFilter] = useState<'all' | 'correct' | 'incorrect'>('all');
  
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
  
  if (isLoading || !results) {
    return (
      <div className="container max-w-md mx-auto px-4 py-12 text-center">
        {isLoading ? <p>Loading...</p> : <p>No results found. Please take a test first.</p>}
      </div>
    );
  }
  
  const filteredQuestions = results.questionsWithAnswers.filter(q => {
    if (filter === 'all') return true;
    if (filter === 'correct') return q.isCorrect;
    if (filter === 'incorrect') return !q.isCorrect;
    return true;
  });
  
  if (filteredQuestions.length === 0) {
    return (
      <div className="container max-w-md mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">No {filter} answers found</h1>
        <p className="mb-6">Change the filter to view other questions.</p>
        <div className="flex justify-center mb-8">
          <Select value={filter} onValueChange={(value) => setFilter(value as any)}>
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
    <div className="container max-w-3xl mx-auto px-4 py-8 md:py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Review Answers</h1>
        <Select value={filter} onValueChange={(value) => {
          setFilter(value as any);
          setCurrentIndex(0);
        }}>
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
      
      <div className="flex justify-between text-sm mb-4">
        <span>Question {currentIndex + 1} of {filteredQuestions.length}</span>
        <span className={currentQuestion.isCorrect ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}>
          {currentQuestion.isCorrect ? "Correct" : "Incorrect"}
        </span>
      </div>
      
      <QuestionCard 
        question={currentQuestion.question}
        onAnswer={() => {}}
        showFeedback={true}
        userAnswer={currentQuestion.userAnswer}
      />
      
      <div className="flex justify-between mt-8">
        <Button
          variant="outline"
          onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
          disabled={currentIndex === 0}
        >
          <ChevronLeft className="mr-2 h-4 w-4" /> Previous
        </Button>
        
        <Button
          variant="outline"
          onClick={() => router.push("/")}
        >
          <Home className="mr-2 h-4 w-4" /> Home
        </Button>
        
        <Button
          variant="outline"
          onClick={() => setCurrentIndex(prev => Math.min(filteredQuestions.length - 1, prev + 1))}
          disabled={currentIndex === filteredQuestions.length - 1}
        >
          Next <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}