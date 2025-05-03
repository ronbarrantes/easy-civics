import Link from "next/link";

import {
  // BookOpen,
  // CheckCircle,
  Flag,
  // GraduationCap,
  // ListChecks,
} from "lucide-react";

// import { CategoryCard } from "@/components/citizenship/category-card";
import { Button } from "@/components/ui/button";
import {} from // Card,
// CardContent,
// CardDescription,
// CardHeader,
// CardTitle,
"@/components/ui/card";
import {} from // getAllCategories,
// getQuestionsByCategory,
"@/lib/sample-questions";
import {} from // api,
// HydrateClient,
"@/trpc/server";

// import { useTranslation } from "@/app/i18n/client";

export default async function Home() {
  // const categories = getAllCategories();

  return (
    <>
      <section className="relative mb-16 p-6 text-center">
        <div className="bg-primary/5 absolute inset-0 -z-10 rounded-3xl" />
        <div className="mb-4 flex justify-center">
          <div className="bg-primary/10 rounded-full p-3">
            <Flag className="text-primary h-12 w-12" />
          </div>
        </div>
        <h1 className="gradient-text mb-4 text-4xl font-bold md:text-5xl">
          U.S. Citizenship Test Practice
        </h1>
        <p className="text-muted-foreground mx-auto mb-8 max-w-2xl text-xl">
          Prepare for your citizenship interview with our practice tests and
          study materials.
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Button asChild size="lg" className="text-base">
            <Link href="/test">Take Full Test</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="text-base">
            <Link href="/study">Study Mode</Link>
          </Button>
        </div>
      </section>

      {/* <section className="mb-16">
          <h2 className="gradient-text mb-6 text-center text-2xl font-bold">
            Study By Category
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <CategoryCard
                key={category}
                category={category}
                questionCount={getQuestionsByCategory(category).length}
              />
            ))}
          </div>
        </section> */}

      {/* <section className="mb-16">
          <h2 className="gradient-text mb-8 text-center text-2xl font-bold">
            How It Works
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <Card className="hover-card-effect">
              <CardHeader className="pb-2 text-center">
                <div className="bg-primary/10 mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full">
                  <BookOpen className="text-primary h-6 w-6" />
                </div>
                <CardTitle>Study</CardTitle>
                <CardDescription>
                  Review citizenship questions and answers
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-2 text-center">
                <p className="text-muted-foreground">
                  Access all 100 official USCIS questions and their answers with
                  detailed explanations.
                </p>
              </CardContent>
            </Card>

            <Card className="hover-card-effect">
              <CardHeader className="pb-2 text-center">
                <div className="bg-primary/10 mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full">
                  <ListChecks className="text-primary h-6 w-6" />
                </div>
                <CardTitle>Practice</CardTitle>
                <CardDescription>Take timed practice tests</CardDescription>
              </CardHeader>
              <CardContent className="pt-2 text-center">
                <p className="text-muted-foreground">
                  Test your knowledge with randomly selected questions in a
                  format similar to the actual test.
                </p>
              </CardContent>
            </Card>

            <Card className="hover-card-effect">
              <CardHeader className="pb-2 text-center">
                <div className="bg-primary/10 mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full">
                  <GraduationCap className="text-primary h-6 w-6" />
                </div>
                <CardTitle>Master</CardTitle>
                <CardDescription>Track your progress</CardDescription>
              </CardHeader>
              <CardContent className="pt-2 text-center">
                <p className="text-muted-foreground">
                  Review your results, focus on areas that need improvement, and
                  build confidence for the real test.
                </p>
              </CardContent>
            </Card>
          </div>
        </section> */}

      {/* <section>
          <div className="bg-primary/5 mx-auto max-w-3xl rounded-lg p-8 text-center md:p-10">
            <h2 className="gradient-text mb-4 text-2xl font-bold">
              Ready to Become a U.S. Citizen?
            </h2>
            <p className="mb-8 text-lg">
              Start practicing today and gain the confidence you need to pass
              your citizenship test.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90"
            >
              <Link href="/test">
                <CheckCircle className="mr-2 h-5 w-5" />
                Start Your Test Now
              </Link>
            </Button>
          </div>
        </section> */}
    </>
  );
}
