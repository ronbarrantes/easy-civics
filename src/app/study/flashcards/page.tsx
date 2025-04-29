"use client";

import { Button } from "@/components/ui/button";
import { StudyCard } from "@/components/citizenship/study-card";
import { getRandomQuestions } from "@/lib/sample-questions";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Category, Question } from "@/lib/types";
import { getAllCategories, getQuestionsByCategory } from "@/lib/sample-questions";
import { RotateCcw } from "lucide-react";

export default function FlashcardsPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | "all">("all");
  
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
    <div className="container max-w-4xl mx-auto px-4 py-8 md:py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Flashcards</h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Study with flashcards to memorize important citizenship test information.
        </p>
      </div>
      
      <Tabs defaultValue="study" className="mb-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
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
            <div className="text-center py-8">
              <p>No questions available for the selected category.</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="settings" className="mt-0">
          <div className="bg-card border rounded-lg p-6">
            <h2 className="text-lg font-medium mb-4">Flashcard Settings</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium mb-2">Category</h3>
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
                <p className="text-xs text-muted-foreground mt-1">
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