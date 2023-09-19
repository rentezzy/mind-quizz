import { Question } from "./question";
import { Quiz, QuizSession } from "./quiz";

export type QuizSessionResponse = {
  quiz: Quiz;
  session: QuizSession;
};
export type QuestionResponse = {
  question: Question;
};
