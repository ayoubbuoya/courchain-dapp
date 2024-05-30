"use cleint";

import { Course, FullCourse } from "@/lib/types";
import { create as createStore } from "zustand";

// store to share public courses
export const useCoursesStore = createStore<{
  allFullCourses: FullCourse[];
  setALLFullCourses: (allFullCourses: FullCourse[]) => void;
  allCourses: Course[];
  setAllCourses: (allCourses: Course[]) => void;
}>((set) => ({
  allFullCourses: [],
  setALLFullCourses: (allFullCourses) => set({ allFullCourses }),
  allCourses: [],
  setAllCourses: (allCourses) => set({ allCourses }),
}));
