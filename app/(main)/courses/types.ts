export type Course = {
  id: string;
  title: string;
  imageSrc: string;
};

export type Props = {
  courses: Course[];
  activeCourseId?: string;
};
