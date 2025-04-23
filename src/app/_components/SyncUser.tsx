"use server";
import { auth } from "@clerk/nextjs/server";

import { api } from "@/trpc/server";
import { tryCatch } from "@/utils/try-catch";

export const SyncUser = async () => {
  const { userId, sessionClaims } = await auth();

  if (userId && !sessionClaims?.metadata?.onboardingComplete) {
    const { data, error } = await tryCatch(
      api.users.syncUser({ clerkUserId: userId })
    );

    if (error) return <div>User not yet onboarded</div>;
    if (data) console.info("User synced");
  }

  return null;
};
