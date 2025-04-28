import { SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";

import { api, HydrateClient } from "@/trpc/server";

const Questions = async () => {
  const questions = await api.questionAnswer.get10();
  console.log("THE QUESTIONS --->>", questions);
  if (!questions.data) return null;
  return (
    <div>
      <ul>
        {questions.data.map((item) => (
          <li key={item.id}>{item.prompt}</li>
        ))}
      </ul>
    </div>
  );
};

export default function Home() {
  // TODO: remove the todos once I have some real data to add here
  // in the mean time this is just a reminder of what needs to happen
  // api.questionAnswer.get10.prefetch();

  return (
    <HydrateClient>
      <SignedOut>
        <SignInButton />
        <SignUpButton />
      </SignedOut>
      <SignedIn>
        <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
          <p>everything that happens here is for a signed in user :) </p>
        </div>
      </SignedIn>
      <Questions />
    </HydrateClient>
  );
}
