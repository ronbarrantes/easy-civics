import { api, HydrateClient } from "@/trpc/server";
import { ChangeLanguage } from "./_components/ChangeLanguage";

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
      <ChangeLanguage />
      <Questions />
      <div></div>
    </HydrateClient>
  );
}
