import { redirect } from "next/navigation";

import { getUserProgress } from "@/actions/user-progress";

import { Quiz } from "../quiz";

type Props = {
  params: {
    lessonId: string;
  };
};

const LessonIdPage = async ({
  params,
}: Props) => {
  const userProgress = await getUserProgress();

  if (!userProgress) {
    redirect("/learn");
  }

  return (
    <Quiz 
      initialPercentage={0}
      initialHearts={5}
      initialLessonId={params.lessonId}
      initialLessonChallenges={[]}
      userSubscription={null}
    />
  );
};

export default LessonIdPage;
