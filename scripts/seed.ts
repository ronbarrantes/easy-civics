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
  incorrectAnswers: Array<string>;
  correctAnswers: Array<string>;
};

async function loadJson<T>(filename: string): Promise<T> {
  const filePath = path.join(seedsDir, filename);
  const raw = await fs.readFile(filePath, "utf-8");
  return JSON.parse(raw) as T;
}

async function seed() {
  try {
    console.log("🚀 Starting seeding...");

    const qEn = await loadJson<QuestionSeed[]>("civics_questions_en.json");
    const qEs = await loadJson<QuestionSeed[]>("civics_questions_es.json");

    const allQuestions = [...qEn, ...qEs];

    const total = allQuestions.length;

    for (let i = 0; i < total; i++) {
      const q = allQuestions[i];

      // Spinner output
      process.stdout.write(`\r🌱 Seeding question ${i + 1}/${total}...`);

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

      if (!createdQuestion) {
        console.warn(
          `\n⚠️ Failed to create question ${q.questionNumber} (${q.language})`
        );
        continue;
      }

      const correctAnswersData = q.correctAnswers.map((text) => ({
        questionId: createdQuestion.id,
        text,
        language: q.language,
        isCorrect: true,
      }));

      const incorrectAnswersData = q.incorrectAnswers.map((text) => ({
        questionId: createdQuestion.id,
        text,
        language: q.language,
        isCorrect: false,
      }));

      await db
        .insert(answer)
        .values([...correctAnswersData, ...incorrectAnswersData]);
    }

    // Done
    process.stdout.write(
      `\r✅ Successfully seeded ${total} questions and answers!\n`
    );
    process.exit(0);
  } catch (error) {
    console.error("\n❌ Seeding failed:", error);
    process.exit(1);
  }
}

seed();
