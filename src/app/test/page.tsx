import { Suspense } from "react";

import TestClientPage from "@/components/citizenship/test-client";
import { InitialScreen } from "@/components/citizenship/test-client-initial-screen";
import { api } from "@/trpc/server";

export default async function TestPage() {
  const { data: questionsData, error: questionsError } =
    await api.questionAnswer.get10();

  if (questionsError) console.error("THERE HAS BEEN AN ERROR", questionsError);

  if (!questionsData) {
    return <div>There was an error loading the questions</div>;
  }

  return (
    <Suspense fallback={<InitialScreen disabled />}>
      <TestClientPage questions={questionsData} />
    </Suspense>
  );
}
