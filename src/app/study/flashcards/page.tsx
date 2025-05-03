"use client";

import { useEffect, useState } from "react";

import { RotateCcw } from "lucide-react";

import { StudyCard } from "@/components/citizenship/study-card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getRandomQuestions } from "@/lib/sample-questions";
import {
  getAllCategories,
  getQuestionsByCategory,
} from "@/lib/sample-questions";
import { Category, Question } from "@/lib/types";

/**
 * Renders a flashcard study interface with category filtering and question shuffling.
 *
 * Displays a set of flashcards for citizenship test preparation, allowing users to filter questions by category, shuffle questions, and switch between study and settings modes. Initializes with 10 random questions and loads all available categories on mount.
 */
export default function FlashcardsPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | "all">(
    "all"
  );

  useEffect(() => {
    // Get all categories
    const allCategories = getAllCategories();
    setCategories(allCategories);

    // Set initial questions
    setQuestions(getRandomQuestions(10));
  }, []);

  const handleCategoryChange = (category: string) => {
    if (category === "all") {
      setQuestions(getRandomQuestions(10));
    } else {
      setQuestions(getQuestionsByCategory(category as Category));
    }
    setSelectedCategory(category as Category | "all");
  };

  const shuffleQuestions = () => {
    if (selectedCategory === "all") {
      setQuestions(getRandomQuestions(10));
    } else {
      const categoryQuestions = getQuestionsByCategory(selectedCategory);
      setQuestions([...categoryQuestions].sort(() => 0.5 - Math.random()));
    }
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8 md:py-12">
      <div className="mb-8 text-center">
        <h1 className="mb-4 text-3xl font-bold">Flashcards</h1>
        <p className="text-muted-foreground mx-auto max-w-xl">
          Study with flashcards to memorize important citizenship test
          information.
        </p>
      </div>

      <Tabs defaultValue="study" className="mb-8">
        <div className="mb-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <TabsList>
            <TabsTrigger value="study">Study Mode</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-2">
            <Select
              value={selectedCategory.toString()}
              onValueChange={handleCategoryChange}
            >
              <SelectTrigger className="w-40 sm:w-48">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button variant="outline" size="icon" onClick={shuffleQuestions}>
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <TabsContent value="study" className="mt-0">
          {questions.length > 0 ? (
            <StudyCard questions={questions} />
          ) : (
            <div className="py-8 text-center">
              <p>No questions available for the selected category.</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="settings" className="mt-0">
          <div className="bg-card rounded-lg border p-6">
            <h2 className="mb-4 text-lg font-medium">Flashcard Settings</h2>

            <div className="space-y-6">
              <div>
                <h3 className="mb-2 text-sm font-medium">Category</h3>
                <Select
                  value={selectedCategory.toString()}
                  onValueChange={handleCategoryChange}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-muted-foreground mt-1 text-xs">
                  Select a specific category to focus your study
                </p>
              </div>

              <div>
                <Button onClick={shuffleQuestions} className="w-full">
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Shuffle Questions
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

