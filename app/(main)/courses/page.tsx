import { getUserProgress } from "@/actions/user-progress";
import { getCourses } from "@/lib/data";
import { List } from "./list";

const CoursesPage = async () => {
  const userProgress = await getUserProgress();
  const courses = getCourses();

  return (
    <div className="h-full max-w-[912px] mx-auto">
      <List 
        courses={courses}
        activeCourseId={userProgress?.activeCourseId}
      />
    </div>
  );
};

export default CoursesPage;
