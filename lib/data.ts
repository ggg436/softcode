import courses from '@/data/courses.json';
import challenges from '@/data/challenges.json';

export const getCourses = () => {
  return courses.courses;
};

export const getCourseById = (courseId: string) => {
  return courses.courses.find(course => course.id === courseId);
};

export const getUnitsForCourse = (courseId: string) => {
  const course = getCourseById(courseId);
  return course?.units || [];
};

export const getLessonsForUnit = (courseId: string, unitId: string) => {
  const units = getUnitsForCourse(courseId);
  const unit = units.find(unit => unit.id === unitId);
  return unit?.lessons || [];
};

export const getChallengesForLesson = (lessonId: string) => {
  const lessonChallenges = challenges.challenges.filter(challenge => challenge.lessonId === lessonId);
  return lessonChallenges.map(challenge => ({
    id: challenge.id,
    lessonId: challenge.lessonId,
    type: challenge.type,
    question: challenge.question,
    completed: false,
    // Normalize options to challengeOptions expected by the lesson UI
    challengeOptions: (challenge.options || []).map((opt: any) => ({
      id: opt.id,
      challengeId: challenge.id,
      text: opt.text,
      correct: !!opt.correct,
      imageSrc: opt.imageSrc ?? null,
      audioSrc: opt.audioSrc ?? null,
    })),
  }));
};
