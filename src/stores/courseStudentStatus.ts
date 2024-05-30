import { create as createStore } from "zustand";
import { FullCourse } from "@/lib/types";

export const useCourseStudentStatusStore = createStore<{
  isCarted: boolean;
  isEnrolled: boolean;
  isCompleted: boolean;
  setIsCarted: (isCarted: boolean) => void;
  setIsEnrolled: (isEnrolled: boolean) => void;
  setIsCompleted: (isCompleted: boolean) => void;
  course: FullCourse | null;
  setCourse: (course: FullCourse | null) => void;
}>((set) => ({
  isCarted: false,
  isEnrolled: false,
  isCompleted: false,
  setIsCarted: (isCarted) => set({ isCarted }),
  setIsEnrolled: (isEnrolled) => set({ isEnrolled }),
  setIsCompleted: (isCompleted) => set({ isCompleted }),
  course: null,
  setCourse: (course) => set({ course }),
}));
