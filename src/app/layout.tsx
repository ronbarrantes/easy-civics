import type { Metadata } from "next";
import { Atkinson_Hyperlegible, Mona_Sans } from "next/font/google";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getLanguage } from "@/lib/language";
import { cn } from "@/lib/utils";
import { TEXT_SIZE_STORAGE_KEY } from "@/utils/constants";

import "./globals.css";

// Designed by the Braille Institute for low-vision readers
const text = Atkinson_Hyperlegible({
  variable: "--font-text",
  weight: ["400", "700"],
  subsets: ["latin", "latin-ext"],
});

const display = Mona_Sans({
  variable: "--font-display-face",
  subsets: ["latin", "latin-ext"],
  axes: ["wdth"],
});

export const metadata: Metadata = {
  title: "Easy Civics: U.S. citizenship test practice",
  description:
    "Practice the 128 questions of the 2025 U.S. citizenship civics test, in English and Spanish.",
};

// Applies the saved text size before the first paint
const textSizeScript = `try{if(localStorage.getItem(${JSON.stringify(
  TEXT_SIZE_STORAGE_KEY
)})==="larger")document.documentElement.dataset.textSize="larger"}catch(e){}`;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const language = await getLanguage();

  return (
    <html
      lang={language}
      suppressHydrationWarning
      className={cn(text.variable, display.variable)}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: textSizeScript }} />
      </head>
      <body className="flex min-h-screen flex-col antialiased">
        <SiteHeader language={language} />
        <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10">
          {children}
        </main>
        <SiteFooter language={language} />
      </body>
    </html>
  );
}
