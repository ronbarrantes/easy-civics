import { api } from "@/trpc/server";
import { tryCatch } from "@/utils/try-catch";

const Dashboard = async () => {
  const { data: ytData, error: ytError } = await tryCatch(
    api.youtube.getYoutubeData()
  );

  if (ytError) console.log("THERE WAS AN ERROR", ytError);

  // const { data: fbData, error: fbError } = await tryCatch(
  //   api.facebook.getYoutubeAnalytics()
  // );

  // if (fbError) console.log("THERE WAS AN ERROR", fbError);

  console.log("DATA --->>>", ytData);
  // console.log("FB DATA --->>>", fbData);
  return (
    <>
      <div>Dashboard</div>
    </>
  );
};

export default Dashboard;
