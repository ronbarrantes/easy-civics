import { Button } from "@/components/ui/button";
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
      <Button>click me</Button>
      <Questions />
      <div></div>
    </HydrateClient>
  );
}
