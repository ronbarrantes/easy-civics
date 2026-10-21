import type { Metadata } from "next";

import { StudyDeck, StudyList } from "@/components/study/study-deck";
import { getLanguage } from "@/lib/language";
import { getAllQuestions } from "@/lib/questions";

export const metadata: Metadata = { title: "Study | Easy Civics" };

const LISTS: StudyList[] = ["all", "learning", "senior"];

export default async function StudyPage({
  searchParams,
}: {
  searchParams: Promise<{ list?: string }>;
}) {
  const language = await getLanguage();
  const { list } = await searchParams;
  const initialList = LISTS.find((l) => l === list) ?? "all";

  return (
    <StudyDeck
      key={`${language}-${initialList}`}
      language={language}
      questions={getAllQuestions(language)}
      initialList={initialList}
    />
  );
}
