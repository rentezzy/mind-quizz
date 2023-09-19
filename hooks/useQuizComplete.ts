import { useQuizStore } from "@/app/quiz/store";
import { useGetQuizSession } from "./api/quiz-session";
import { useEffect, useState } from "react";
import { DateTime } from "luxon";
import { redirect, useRouter } from "next/navigation";

export const useQuizComplete = () => {
  const { code, username, setCode, setUsername } = useQuizStore();
  const router = useRouter();
  const [startAt, setStartAt] = useState(DateTime.now());
  const [endAt, setEndAt] = useState<DateTime | null>(null);
  const [isEnded, setIsEnded] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const { data } = useGetQuizSession();
  const [currentQuestion, setCurrentQuestion] = useState<string | null>(null);
  useEffect(() => {
    if (!data || "message" in data || currentQuestion !== null) return;
    setCurrentQuestion(data.quiz.questions[0]);
  }, [data]);
  useEffect(() => {
    if (!data || "message" in data) return;
    const isEndedTemp =
      data.quiz.questions.length === Object.keys(answers).length;
    if (isEndedTemp === true && endAt === null) {
      setIsEnded(isEndedTemp);
      setEndAt(DateTime.now());
    }
  }, [data, answers, isEnded, endAt]);
  useEffect(() => {
    if (!data || "message" in data || !isEnded) return;
    const quiz = data.quiz.id;
    const quizAnswer = {
      username,
      answers,
      startAt,
      endAt,
    };
    const postFinish = async () => {
      await fetch(`/api/quiz?quiz=${quiz}`, {
        method: "POST",
        body: JSON.stringify(quizAnswer),
      });
      setCode(null);
      setUsername(null);
      router.replace("/quiz");
    };
    postFinish();
  }, [
    isEnded,
    data,
    answers,
    endAt,
    router,
    setCode,
    setUsername,
    startAt,
    username,
  ]);
  if (!data || "message" in data) return;

  const addAnswer = (answer: string) => {
    if (!currentQuestion) return;
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion]: answer,
    }));
    if (isEnded) {
      if (currentQuestion !== null) setCurrentQuestion(null);
    } else {
      const nextQuestion =
        data.quiz.questions[data.quiz.questions.indexOf(currentQuestion) + 1];
      if (nextQuestion !== currentQuestion) setCurrentQuestion(nextQuestion);
    }
  };
  const finish = {
    username,
    answers,
    startAt,
    endAt,
    isEnded,
    currentQuestion,
  };
  return { addAnswer, isEnded, currentQuestion };
};
