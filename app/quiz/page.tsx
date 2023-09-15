"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useStartQuizSession } from "@/hooks/api/quiz-session";
import { useCodeField } from "@/hooks/useCodeField";
import { useUsernameField } from "@/hooks/useUsernameField";

const QuizComplete = () => {
  const { username, setUsername, isAuth } = useUsernameField();
  const { code, setCode } = useCodeField();
  const { isError, mutate } = useStartQuizSession();

  return (
    <div className="bg-primary h-screen flex items-center justify-center">
      <div className="max-w-[600px] flex flex-col gap-5">
        <h1 className="font-dela text-[48px] text-secondary">
          Take part in the quiz!
        </h1>
        <div className="flex gap-5 items-center justify-start">
          <label
            className="text-white text-[32px] flex-shrink-0"
            htmlFor="code"
          >
            Quiz code:
          </label>
          <Input
            className="ring-offset-secondary text-secondary text-[32px]"
            maxLength={12}
            value={code}
            onChange={setCode}
            id="code"
          />
        </div>
        {!isAuth && (
          <div className="flex gap-5 items-center justify-start">
            <label
              className="text-white text-[32px] flex-shrink-0"
              htmlFor="username"
            >
              Your name:
            </label>
            <Input
              className="ring-offset-secondary text-secondary text-[32px]"
              maxLength={40}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              id="username"
            />
          </div>
        )}
        <div>
          {isError ? (
            <p className="text-[16px] text-center text-secondary mb-3">
              Wrong code!
            </p>
          ) : (
            ""
          )}
          <Button
            variant="secondary"
            className="text-white w-full"
            onClick={() => {
              mutate({ code, username });
            }}
          >
            Start quiz!
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuizComplete;
