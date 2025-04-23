import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { decrypt, encrypt } from "@/lib/encryption";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { tryCatch } from "@/utils/try-catch";

export const qaRouter = createTRPCRouter({
  handleRedirect: publicProcedure
    .input(z.object({ code: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { sessionClaims } = await auth();

      const userId = sessionClaims?.metadata?.userId;

      if (!userId) {
        return {
          data: null,
          error: new Error("User not authenticated"),
        };
      }

      const accessTokenUrl = getFacebookAccessToken(input.code);

      const { data: tokenRes, error: tokenError } = await tryCatch(
        fetch(accessTokenUrl).then(async (res) => {
          if (!res.ok) {
            const err = await res.json();
            throw new Error(
              `Failed to fetch access token: ${err.error || res.statusText}`
            );
          }
          return res.json();
        })
      );

      if (tokenError || !tokenRes?.access_token) {
        return {
          data: null,
          error: new Error("Failed to exchange code for tokens"),
        };
      }

      const { data: profile, error: profileError } = await tryCatch(
        fetch(
          "https://graph.facebook.com/me?fields=id,name,email&access_token=" +
            tokenRes.access_token
        ).then(async (res) => {
          if (!res.ok) {
            return res.json().then((err) => {
              throw new Error(
                `Failed to fetch user profile: ${err.error || res.statusText}`
              );
            });
          }
          return res.json();
        })
      );

      if (profileError || !profile?.id || !profile?.name) {
        return {
          data: null,
          error: new Error("Failed to fetch Facebook user profile"),
        };
      }

      const accountId = profile.id;
      const accountUserName =
        profile.email ?? profile.name ?? "unknown_facebook_user";
      const platform = "facebook";

      // Save social account to the database
      const { data: accountData, error: accountError } = await tryCatch(
        ctx.db
          .insert(social_account)
          .values({
            userId,
            accountId,
            accountUserName,
            platform,
          })
          .onConflictDoUpdate({
            target: [social_account.accountId],
            set: { accountUserName },
          })
          .returning()
      );

      if (accountError) {
        return {
          data: null,
          error: new Error("Failed to save social account"),
        };
      }
      const account = accountData[0];

      if (!account) {
        return {
          data: null,
          error: new Error("Failed to save social account"),
        };
      }

      // Save OAuth token to the database
      const { error: tokenInsertError } = await tryCatch(
        ctx.db
          .insert(oauth_token)
          .values({
            userId,
            socialAccountId: account.id,
            accessToken: encrypt(tokenRes.access_token!),
            refreshToken: tokenRes.refresh_token
              ? encrypt(tokenRes.refresh_token)
              : null,
            expiresAt: tokenRes.expiry_date
              ? new Date(tokenRes.expiry_date)
              : null,
            scope: tokenRes.scope || "",
          })
          .onConflictDoUpdate({
            target: [oauth_token.userId, oauth_token.socialAccountId],
            set: {
              accessToken: encrypt(tokenRes.access_token!),
              refreshToken: tokenRes.refresh_token
                ? encrypt(tokenRes.refresh_token)
                : null,
              expiresAt: tokenRes.expiry_date
                ? new Date(tokenRes.expiry_date)
                : null,
              scope: tokenRes.scope || "",
            },
          })
      );

      if (tokenInsertError) {
        return {
          data: null,
          error: new Error("Failed to save OAuth token"),
        };
      }

      return {
        data: { accountId, accountUserName, platform },
        error: null,
      };
    }),

  getYoutubeAnalytics: publicProcedure.query(async ({ ctx }) => {
    const { sessionClaims } = await auth();
    const userId = sessionClaims?.metadata?.userId;
    if (!userId) {
      return {
        data: null,
        error: new Error("User not authenticated"),
      };
    }

    const { data: tokenData, error: tokenError } = await tryCatch(
      ctx.db.query.oauth_token.findFirst({
        where: eq(oauth_token.userId, userId),
      })
    );

    if (tokenError)
      return {
        data: null,
        error: tokenError,
      };

    if (!tokenData?.accessToken)
      return {
        data: null,
        error: new Error("Cannot get access token"),
      };

    const decryptedToken = decrypt(tokenData?.accessToken);

    const analyticsUrl = `https://graph.facebook.com/v12.0/me/insights?access_token=${decryptedToken}`;
    const { data: analyticsData, error: analyticsError } = await tryCatch(
      fetch(analyticsUrl).then(async (res) => {
        if (!res.ok) {
          const err = await res.json();
          throw new Error(
            `Failed to fetch analytics data: ${err.error || res.statusText}`
          );
        }
        return res.json();
      })
    );
    if (analyticsError) {
      return {
        data: null,
        error: new Error("Failed to fetch analytics data"),
      };
    }
    if (!analyticsData) {
      return {
        data: null,
        error: new Error("No analytics data found"),
      };
    }

    return { data: analyticsData, error: null };
  }),
});
