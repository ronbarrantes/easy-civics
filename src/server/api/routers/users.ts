import { clerkClient } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { user } from "@/server/db/schema";
import { tryCatch } from "@/utils/try-catch";

export const userRouter = createTRPCRouter({
  all: publicProcedure.query(async ({ ctx }) => {
    const { data, error } = await tryCatch(ctx.db.query.user.findMany());
    if (error) {
      return { message: "Error fetching users", error };
    }
    return { data, error: null };
  }),

  findUser: publicProcedure
    .input(z.object({ clerkUserId: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
      if (!input) {
        return {
          message: "No User Id inputed",
          error: new Error("No User Id inputed"),
        };
      }
      const { data, error } = await tryCatch(
        ctx.db.query.user.findFirst({
          where: eq(user.clerkUserId, input.clerkUserId),
        })
      );
      if (error) {
        return { message: "Error fetching user", error };
      }
      if (!data) {
        return {
          message: "User not found",
          error: new Error("User not found"),
        };
      }
      return { data, error: null };
    }),

  // Will sync the user if they have not been added to the database
  syncUser: publicProcedure
    .input(z.object({ clerkUserId: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      const { clerkUserId } = input;

      // Check if the user already exists in the database
      const { data: userData, error: userDataError } = await tryCatch(
        ctx.db.query.user.findFirst({
          where: eq(user.clerkUserId, clerkUserId),
        })
      );

      if (userDataError) {
        return {
          data: null,
          error: new Error(`Database query failed: ${userDataError.message}`),
        };
      }

      let userId = userData?.id;

      // Insert user into the database if not found
      if (!userId) {
        const { data: insertData, error: insertError } = await tryCatch(
          ctx.db
            .insert(user)
            .values({ clerkUserId })
            .returning({ id: user.id, clerkUserId: user.clerkUserId })
        );

        if (insertError) {
          return {
            data: null,
            error: new Error(`Failed to insert user: ${insertError.message}`),
          };
        }

        userId = insertData[0]?.id;
      }

      // Update Clerk user metadata
      const client = await clerkClient();
      const { error: clerkError, data: clerkData } = await tryCatch(
        client.users.updateUser(clerkUserId, {
          publicMetadata: {
            onboardingComplete: true,
            userId,
          },
        })
      );

      if (clerkError) {
        return {
          data: null,
          error: new Error(`Clerk update failed: ${clerkError.message}`),
        };
      }

      return {
        error: null,
        data: {
          id: userId,
          clerkUserId,
          message: `Onboarding complete, ${clerkData?.publicMetadata?.userName || "User"}`,
        },
      };
    }),
});
