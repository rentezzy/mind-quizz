"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useGetQuestion } from "@/hooks/api/question";
import { Question } from "@/types/question";
import { useState } from "react";

export const QuizQuestion = ({
  quid,
  isEnded,
  addAnswer,
}: {
  quid: string | null;
  addAnswer: (answer: string) => void;
  isEnded?: boolean;
}) => {
  const { data } = useGetQuestion(quid);
  if (!data)
    return (
      <p className="h-screen flex justify-center items-center bg-secondary">
        Loading...
      </p>
    );
  return (
    <div className="bg-secondary">
      <h2 className="h-[20vh] flex items-center justify-center text-white text-[38px]">
        {data.question.text}
      </h2>
      <div className="h-[80vh]">
        <QuestionType addAnswer={addAnswer} question={data.question} />
      </div>
    </div>
  );
};
const QuestionType = ({
  question,
  addAnswer,
}: {
  question: Question;
  addAnswer: (answer: string) => void;
}) => {
  switch (question.type) {
    case "one": {
      return (
        <div className="grid grid-cols-2 grid-rows-2 h-full gap-2 p-2">
          {question.variants.map((variant, index) => (
            <Button
              key={index}
              onClick={() => addAnswer(variant)}
              className="h-full w-full"
            >
              {variant}
            </Button>
          ))}
        </div>
      );
    }
    case "text": {
      return (
        <div className="h-full bg-primary flex items-center">
          <QuestionText addAnswer={addAnswer} />
        </div>
      );
    }
  }
};
const QuestionText = ({
  addAnswer,
}: {
  addAnswer: (answer: string) => void;
}) => {
  const [answer, setAnswer] = useState("");
  return (
    <div className="container space-y-2">
      <div className="w-full">
        <Label htmlFor="text_input" className="text-white">Answer:</Label>
        <Input
          id="text_input"
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Type answer here!"
        ></Input>
      </div>
      <Button
        onClick={() => addAnswer(answer)}
        variant="secondary"
        className="w-full"
      >
        Answer!
      </Button>
    </div>
  );
};
