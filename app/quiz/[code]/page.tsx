"use client";

import { useGetQuizSession } from "@/hooks/api/quiz-session";
import { useQuizStore } from "../store";
import { notFound } from "next/navigation";

const QuizStart = ({ params }: { params: { code: string } }) => {
  const { username, code, setCode } = useQuizStore();
  const { isError } = useGetQuizSession();
  if (!username || isError) {
    notFound();
  }
  return (
    <div>
      <p>{params.code}</p>
      <p>{username || "placeholder"}</p>
      <p>{code}</p>
    </div>
  );
};

export default QuizStart;
