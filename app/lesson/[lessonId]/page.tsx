import { redirect } from "next/navigation";

import { getChallengesForLesson } from "@/lib/data";
import { getUserProgress } from "@/actions/user-progress";
import { getUserSubscription } from "@/actions/user-subscription";

import { Quiz } from "../quiz";

type Props = {
  params: {
    lessonId: string;
  };
};

const LessonIdPage = async ({
  params,
}: Props) => {
  const [
    userProgress,
    userSubscription,
  ] = await Promise.all([
    getUserProgress(),
    getUserSubscription(),
  ]);

  const challenges = getChallengesForLesson(params.lessonId);

  if (!challenges || !userProgress) {
    redirect("/learn");
  }

  const completedChallenges = challenges.filter((challenge) => challenge.completed);
  const initialPercentage = completedChallenges.length / challenges.length * 100;

  return (
    <Quiz
      initialLessonId={params.lessonId}
      initialLessonChallenges={challenges}
      initialHearts={userProgress.hearts}
      initialPercentage={initialPercentage}
      userSubscription={userSubscription || { isActive: false }}
    />
  );
};export default LessonIdPage;
