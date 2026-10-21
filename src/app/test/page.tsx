import type { Metadata } from "next";

import { PracticeTest } from "@/components/test/practice-test";
import { getLanguage } from "@/lib/language";
import { getAllQuestions } from "@/lib/questions";

export const metadata: Metadata = { title: "Practice test | Easy Civics" };

export default async function TestPage() {
  const language = await getLanguage();

  return (
    <PracticeTest
      // Restart the test when the language changes
      key={language}
      language={language}
      questions={getAllQuestions(language)}
    />
  );
}
