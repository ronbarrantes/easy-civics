import { Suspense } from "react";

import { cookies } from "next/headers";

import TestClientPage from "@/components/citizenship/test-client";
import { getRandomQuestions } from "@/lib/questions";
import { Language } from "@/lib/types";
import { LANGUAGE_COOKIE, NUMBER_OF_QUESTIONS } from "@/utils/constants";

export default async function TestPage() {
  const cookieStore = await cookies();
  const language: Language =
    cookieStore.get(LANGUAGE_COOKIE)?.value === "es" ? "es" : "en";

  const questions = getRandomQuestions(language, NUMBER_OF_QUESTIONS);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TestClientPage questions={questions} />
    </Suspense>
  );
}
