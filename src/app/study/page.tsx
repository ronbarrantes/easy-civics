import { CategoryCard } from "@/components/citizenship/category-card";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllCategories, getQuestionsByCategory, getRandomQuestions } from "@/lib/sample-questions";
import { BookOpen, ChevronRight } from "lucide-react";
import Link from "next/link";

/**
 * Renders the study materials page for citizenship test preparation.
 *
 * Displays a header, quick navigation links, a grid of category cards with question counts, and a section with study tips and test day advice.
 */
export default function StudyPage() {
  const categories = getAllCategories();

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8 md:py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-4">Study Materials</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Review questions and answers by category or practice with flashcards to prepare for your citizenship test.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Card className="col-span-full md:col-span-1 md:row-span-2 bg-accent/50">
          <CardHeader>
            <CardTitle className="text-xl">Quick Links</CardTitle>
            <CardDescription>Fast access to study resources</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Link href="/study/flashcards" className="flex items-center justify-between p-3 bg-background rounded-md hover:bg-accent transition-colors group">
              <div className="flex items-center">
                <BookOpen className="h-5 w-5 mr-3 text-primary" />
                <span>All Flashcards</span>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link href="/test" className="flex items-center justify-between p-3 bg-background rounded-md hover:bg-accent transition-colors group">
              <div className="flex items-center">
                <BookOpen className="h-5 w-5 mr-3 text-primary" />
                <span>Take Full Test</span>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link href="/test/practice" className="flex items-center justify-between p-3 bg-background rounded-md hover:bg-accent transition-colors group">
              <div className="flex items-center">
                <BookOpen className="h-5 w-5 mr-3 text-primary" />
                <span>Practice Tests</span>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
            </Link>
          </CardContent>
        </Card>
        
        {categories.map((category) => (
          <CategoryCard 
            key={category} 
            category={category} 
            questionCount={getQuestionsByCategory(category).length}
          />
        ))}
      </div>
      
      <div className="bg-muted rounded-lg p-6 md:p-8">
        <h2 className="text-xl font-semibold mb-4">Study Tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <h3 className="font-medium">Effective Study Techniques</h3>
            <ul className="space-y-1 text-sm text-muted-foreground list-disc pl-5">
              <li>Study in short, focused sessions of 20-30 minutes</li>
              <li>Review a few questions each day rather than cramming</li>
              <li>Say answers out loud to improve recall</li>
              <li>Connect facts to stories or images for better memory</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h3 className="font-medium">Test Day Preparation</h3>
            <ul className="space-y-1 text-sm text-muted-foreground list-disc pl-5">
              <li>Get a good night's sleep before your test</li>
              <li>Listen carefully to each question</li>
              <li>Speak clearly and confidently</li>
              <li>It's okay to ask the officer to repeat a question</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}