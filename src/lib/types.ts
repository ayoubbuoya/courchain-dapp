export interface User {
  account_id: string;
  name: string;
  username: string;
  email: string;
  phone: string;
  role: string;
  password: string;
  by_google: boolean;
  bio: string;
  skills: string[];
  certifications: string[];
  education: string[];
  picture: string;
  created_at: number;
  updated_at: number;
}

export interface Course {
  id: number;
  title: string;
  description: string;
  level: string;
  duration: string;
  status: string;
  requirements: string[];
  objectives: string[];
  category: string;
  tags: string[];
  picture: string;
  with_ai: boolean;
  price: bigint;
  progress?: number;
  mentor_id: string;
  modules_ids: number[];
  created_at: number;
  updated_at: number;
}

export interface Module {
  id: number;
  title: string;
  description: string;
  status: string;
  order: number;
  with_ai: boolean;
  created_at: number;
  updated_at: number;
  course_id: number;
  lessons_ids: number[];
  quizz_id: number;
}

export interface Lesson {
  id: number;
  title: string;
  description: string;
  video_url: string;
  article: string;
  order: number;
  with_ai: boolean;
  module_id: number;
  created_at: number;
  updated_at: number;
}

export interface FullLesson {
  id: number;
  title: string;
  description: string;
  video_url: string;
  article: string;
  order: number;
  with_ai: boolean;
  created_at: number;
  updated_at: number;
}

export interface FullModule {
  id: number;
  title: string;
  description: string;
  status: string;
  order: number;
  with_ai: boolean;
  created_at: number;
  updated_at: number;
  lessons: FullLesson[];
  quizz: Quizz | null;
}

export interface Quizz {
  id?: number;
  title: string;
  questions: Question[];
  created_at?: number;
  updated_at?: number;
}

export interface Question {
  text: string;
  answers: Answer[];
}
export interface Answer {
  text: string;
  is_correct: boolean;
}

export interface FullCourse {
  id: number;
  title: string;
  description: string;
  level: string;
  duration: string;
  status: string;
  requirements: string[];
  objectives: string[];
  category: string;
  tags: string[];
  picture: string;
  with_ai: boolean;
  price: bigint;
  mentor: User;
  modules: FullModule[];
  created_at: number;
  updated_at: number;
}

export interface Enrollment {
  id: number;
  course_id: number;
  student_id: string;
  status: string;
  progress: number;
  carted_at: number;
  enrolled_at: number | null;
  completed_at: number | null;
  course_review: number | null;
  updated_at: number;
}

export interface ModuleProgress {
  id: number;
  module_id: number;
  student_id: string;
  status: string;
  is_enrolled: boolean;
  progress: number;
  completed_at: number | null;
}

export interface LessonProgress {
  id: number;
  lesson_id: number;
  student_id: string;
  status: string;
  is_enrolled: boolean;
  completed_at: number | null;
}

export interface FullEnrollment {
  id: number;
  course: Course;
  student: User;
  modules: FullModuleProgress[];
  status: string;
  progress: number;
  carted_at: number;
  enrolled_at: number | null;
  completed_at: number | null;
  course_review: number | null;
  updated_at: number;
}

export interface FullModuleProgress {
  id: number;
  module: FullModule;
  student: User;
  lessons: FullLessonProgress[];
  quizz: FullQuizzProgress | null;
  status: string;
  is_enrolled: boolean;
  progress: number;
  completed_at: number | null;
}

export interface FullLessonProgress {
  id: number;
  lesson: FullLesson;
  student: User;
  status: string;
  is_enrolled: boolean;
  completed_at: number | null;
}

export interface FullQuizzProgress {
  id: number;
  quizz: Quizz;
  student: User;
  status: string;
  try_count: number;
  is_enrolled: boolean;
  is_submitted: boolean;
  is_correct: boolean;
  completed_at: number | null;
}
