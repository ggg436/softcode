export type Course = {
  id: string;
  title: string;
  imageSrc: string;
  units: Unit[];
};

export type Unit = {
  id: string;
  title: string;
  order: number;
  description?: string;
  lessons: Lesson[];
};

export type Lesson = {
  id: string;
  title: string;
  order: number;
  completed: boolean;
  percentage: number;
};
