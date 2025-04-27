import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { pickUniqueRandomNumbers } from "@/utils/randomNumbers";
import { tryCatch } from "@/utils/try-catch";

export const qaRouter = createTRPCRouter({
  get10: publicProcedure.query(async ({ ctx }) => {
    const randomNumbers = pickUniqueRandomNumbers(10, 1, 100);
    const { data: queshData, error: queshError } = await tryCatch(
      ctx.db.query.question.findMany({
        limit: 10,
        where: (quesh, { inArray, eq, and }) =>
          and(
            eq(quesh.language, "en"),
            inArray(quesh.questionNumber, randomNumbers)
          ),
        columns: {
          id: true,
          prompt: true,
          questionNumber: true,
        },
        with: {
          answers: true,
        },
      })

      // ctx.db.execute(
      //   sql`
      //   SELECT q.*, a.*
      //   FROM (
      //     SELECT *
      //     FROM ${question}
      //     WHERE language = 'en'
      //     AND questionNumber IN (${sql.join(randomNumbers, sql`, `)})
      //   ) AS q
      //   LEFT JOIN ${answer} AS a ON q.id = a.question_id
      //   ORDER BY q.id;
      // `
      // )
    );

    // const

    // const { data: ansData, error: ansError } = await tryCatch(
    //   ctx.db.query.answer.findMany({
    //     // limit: 10,
    //     where: (ans, { inArray, eq, and }) =>
    //       and(
    //         // eq(quesh.language, "en"),
    //         // inArray(quesh.questionNumber, randomNumbers)
    //       ),

    //   })
    // )

    // const { data, error } = await tryCatch(ctx.db.query.question.findFirst());
    if (queshError) {
      return { error: queshError, data: null };
    }
    return { data: queshData, error: null };
  }),
});
