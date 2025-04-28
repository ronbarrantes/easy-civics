import { SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";

export const SignUpBar = async () => {
  return (
    <>
      <SignedOut>
        <SignInButton />
        <SignUpButton />
      </SignedOut>
      <SignedIn>
        <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
          <p>everything that happens here is for a signed in user :)</p>
        </div>
      </SignedIn>
    </>
  );
};
