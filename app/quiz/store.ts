import { create } from "zustand";

interface QuizState {
  code: string | null;
  username: string | null;
  setCode: (code: string) => void;
  setUsername: (un: string) => void;
}

export const useQuizStore = create<QuizState>()((set) => ({
  code: null,
  username: null,
  setCode: (code: string) => set(() => ({ code: code })),
  setUsername: (un: string) => set(() => ({ username: un })),
}));
