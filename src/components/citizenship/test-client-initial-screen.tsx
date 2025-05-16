import { Flag } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const InitialScreen = ({
  startTest,
  disabled = false,
}: {
  startTest?: () => void;
  disabled?: boolean;
}) => {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <Card className="mb-8">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl md:text-3xl">
            U.S. Citizenship Test Practice
          </CardTitle>
          <CardDescription>
            Test your knowledge of U.S. history and government
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-accent rounded-lg p-4">
            <h3 className="mb-2 text-lg font-semibold">Test Information</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>
                  This practice test contains 10 questions from the official
                  USCIS test.
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>
                  You need to answer 6 out of 10 questions correctly to pass.
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>
                  Take your time - there is no time limit for the real test.
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Answer each question before moving to the next one.</span>
              </li>
            </ul>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            onClick={startTest}
            disabled={disabled}
            className="w-full"
            size="lg"
          >
            <Flag className="mr-2 h-5 w-5" />
            {disabled ? "Loading..." : "Start Practice Test"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
