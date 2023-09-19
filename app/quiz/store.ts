import { create } from "zustand";

interface QuizState {
  code: string | null;
  username: string | null;
  setCode: (code: string | null) => void;
  setUsername: (un: string | null) => void;
}

export const useQuizStore = create<QuizState>()((set) => ({
  code: null,
  username: null,
  setCode: (code) => set(() => ({ code: code })),
  setUsername: (un) => set(() => ({ username: un })),
}));
