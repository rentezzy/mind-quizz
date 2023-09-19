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
  startAt: null,
  endAt: null,
  setCode: (code: string | null) => set(() => ({ code: code })),
  setUsername: (un: string | null) => set(() => ({ username: un })),
}));
