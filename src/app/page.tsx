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
