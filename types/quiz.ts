export type Quiz = {
  title: string;
  description: string;
  startAt: Date;
  endAt: Date;
  questions: string[];
  author: string;
  id: string;
  points: number;
};
export type QuizSession = {
  id: string;
  active: boolean;
  answers: QuizSessionAnswer[];
} & (QuizSessionActive | QuizSessionDisabled);

type QuizSessionActive = {
  active: true;
  code: string;
};
type QuizSessionDisabled = {
  active: false;
  code: null;
};
type QuizSessionAnswer = { name: string; answers: Record<string, string> };
