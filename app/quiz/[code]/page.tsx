"use client";

import { useGetQuestion } from "@/hooks/api/question";
import { useGetQuizSession } from "@/hooks/api/quiz-session";
import { useQuizComplete } from "@/hooks/useQuizComplete";
import { notFound } from "next/navigation";
import { useQuizStore } from "../store";
import { QuizQuestion } from "./QuizQuestion";

const QuizStart = ({ params }: { params: { code: string } }) => {
  const { username } = useQuizStore();
  const { isError } = useGetQuizSession();
  const quiz = useQuizComplete();
  const { data } = useGetQuestion(quiz?.currentQuestion || null);
  if (!username || isError) {
    notFound();
  }
  if (!quiz) return <p>loading</p>;
  return (
    <div>
      <QuizQuestion
        quid={quiz.currentQuestion}
        addAnswer={quiz.addAnswer}
        isEnded={quiz.isEnded}
      />
    </div>
  );
};

export default QuizStart;
