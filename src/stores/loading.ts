import { create as createStore } from "zustand";

export const useLoadingStore = createStore<{
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}>((set) => ({
  isLoading: true,
  setIsLoading: (isLoading) => set({ isLoading }),
}));
