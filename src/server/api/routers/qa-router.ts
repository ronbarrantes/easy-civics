import { inferProcedureOutput } from "@trpc/server";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { pickUniqueRandomNumbers } from "@/utils/random-numbers";
import { tryCatch } from "@/utils/try-catch";

export const qaRouter = createTRPCRouter({
  get10: publicProcedure.query(async ({ ctx }) => {
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

    console.log("queshData", queshData);

    if (queshError) {
      return { error: queshError, data: null };
    }

    if (!queshData) {
      return { error: "No data found", data: null };
    }

    return { data: queshData, error: null };
  }),
});

export type QuestionWithAnswers = Exclude<
  inferProcedureOutput<(typeof qaRouter)["get10"]>["data"],
  null
>[0];

// export type QuestionWithAnswers = <
//   inferProcedureOutput<(typeof qaRouter)["get10"]>
