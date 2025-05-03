import Link from "next/link";

import {
  BookOpen,
  ChevronRight,
  GraduationCap,
  LandmarkIcon,
  Vote,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Category } from "@/lib/types";

interface CategoryCardProps {
  category: Category;
  questionCount: number;
}

/**
 * Renders a card displaying a quiz or study category with its name, question count, and a category-specific icon.
 *
 * The card includes a button that navigates to a study page for the selected category.
 *
 * @param category - The name of the category to display.
 * @param questionCount - The number of questions available in the category.
 */
export function CategoryCard({ category, questionCount }: CategoryCardProps) {
  const getCategoryIcon = (category: Category) => {
    switch (category) {
      case "American Government":
        return <LandmarkIcon className="text-chart-1 h-6 w-6" />;
      case "American History":
        return <BookOpen className="text-chart-2 h-6 w-6" />;
      case "Integrated Civics":
        return <GraduationCap className="text-chart-4 h-6 w-6" />;
      case "Rights and Responsibilities":
        return <Vote className="text-chart-5 h-6 w-6" />;
      default:
        return <BookOpen className="text-primary h-6 w-6" />;
    }
  };

  return (
    <Card className="hover-card-effect h-full">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="line-clamp-2 text-lg">{category}</CardTitle>
            <CardDescription className="mt-1">
              {questionCount} questions
            </CardDescription>
          </div>
          <div className="bg-primary/10 rounded-md p-2">
            {getCategoryIcon(category)}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Button asChild variant="outline" className="group w-full">
          <Link href={`/test/category/${encodeURIComponent(category)}`}>
            Study This Category
            <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
