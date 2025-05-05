import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { AnswerRow, QuestionRow } from "@/server/db/schema";
import { filterAndRandomizeAnswers } from "@/utils/filterAndRandomizeAnswers";
import { pickUniqueRandomNumbers } from "@/utils/random-numbers";
import { tryCatch } from "@/utils/try-catch";

export const qaRouter = createTRPCRouter({
  get10: publicProcedure.query(async ({ ctx }) => {
    // TODO:: I need to be able to pass an array with unavailable questions
    // some questions are either state specifi or time specific, and
    // I am not sure how to handle this without doing a ton of work
    // the quesitons can be added to the constants
    const randomNumbers = pickUniqueRandomNumbers(10, 1, 100);
    const { data: queshData, error: queshError } = await tryCatch(
      ctx.db.query.question.findMany({
        limit: 10,
        where: (quesh, { inArray, eq, and }) =>
          and(
            eq(quesh.language, "es"),
            inArray(quesh.questionNumber, randomNumbers)
          ),
        columns: {
          id: true,
          prompt: true,
          questionNumber: true,
          expectedNumAnswers: true,
          explanation: true,
        },
        with: {
          answers: true,
        },
      })
    );

    if (queshError) {
      return { error: queshError, data: null };
    }

    if (!queshData) {
      return { error: "No data found", data: null };
    }

    console.log(
      "answers",
      queshData[0]?.expectedNumAnswers,
      queshData[0].answers
    );
    return { data: filterAndRandomizeAnswers(queshData), error: null };
  }),
});

export type QuestionWithAnswers = Pick<
  QuestionRow,
  "id" | "prompt" | "questionNumber" | "expectedNumAnswers" | "explanation"
> & {
  answers: AnswerRow[];
};

// export type QuestionWithAnswers = Exclude<
//   inferProcedureOutput<(typeof qaRouter)["get10"]>["data"],
//   null
// >[0];

// export type QuestionWithAnswers = <
//   inferProcedureOutput<(typeof qaRouter)["get10"]>
