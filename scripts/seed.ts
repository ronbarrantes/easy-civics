import fs from "fs/promises";
import path from "path";

import { db } from "@/server/db";
import { answer, question } from "@/server/db/schema";

const seedsDir = path.resolve(__dirname, "../docs/jsons/");

type QuestionSeed = {
  questionNumber: number;
  prompt: string;
  expectedNumAnswers: number;
  language: string;
  explanation?: string;
  answers: Array<string>;
};

async function loadJson<T>(filename: string): Promise<T> {
  const filePath = path.join(seedsDir, filename);
  const raw = await fs.readFile(filePath, "utf-8");
  return JSON.parse(raw);
}

async function seed() {
  const questions: QuestionSeed[] = await loadJson("civics_questions_es.json");

  for (const q of questions) {
    console.log({ q });
    const [createdQuestion] = await db
      .insert(question)
      .values({
        questionNumber: q.questionNumber,
        prompt: q.prompt,
        expectedNumAnswers: q.expectedNumAnswers,
        language: q.language,
        explanation: q.explanation,
      })
      .returning();

    if (createdQuestion) {
      await db.insert(answer).values(
        q.answers.map((text) => ({
          questionId: createdQuestion.id,
          text,
          language: q.language,
        }))
      );
    }
  }

  // const tags: TagSeed[] = await loadJson("tags.json");
  // for (const t of tags) {
  //   await db.insert(tag).values({
  //     name: t.name,
  //     description: t.description,
  //     language: t.language ?? "en",
  //   }).onConflictDoNothing(); // optional: prevent duplicate insertions
  // }

  console.log("✅ Seeded questions and tags");
}

seed();
