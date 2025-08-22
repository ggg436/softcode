type Course = {
  id: string;
  title: string;
  imageSrc: string;
};

type Props = {
  courses: Course[];
  activeCourseId?: string;
};
