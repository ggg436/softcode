import { redirect } from "next/navigation";

import { getUserProgress } from "@/actions/user-progress";
import { getCourseById } from "@/lib/data";

const LessonPage = async () => {
  const userProgress = await getUserProgress();

  if (!userProgress || !userProgress.activeCourseId) {
    redirect("/courses");
  }

  const course = getCourseById(userProgress.activeCourseId);
  if (!course || !course.units.length || !course.units[0].lessons.length) {
    redirect("/courses");
  }

  const firstLessonId = course.units[0].lessons[0].id;
  redirect(`/lesson/${firstLessonId}`);
};

export default LessonPage;
