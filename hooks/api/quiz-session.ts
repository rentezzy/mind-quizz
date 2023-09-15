import { useQuizStore } from "@/app/quiz/store";
import { QuizSessionResponse } from "@/types/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useStartQuizSession = () => {
  const setCode = useQuizStore((state) => state.setCode);
  const setUsername = useQuizStore((state) => state.setUsername);
  const router = useRouter();
  return useMutation({
    mutationFn: async ({
      code,
      username,
    }: {
      code: string;
      username: string;
    }) => {
      const res = await fetch(`api/quiz-session?code=${code}`);
      if (res.status === 400) {
        throw new Error("Wrong code!");
      }
      return await res.json();
    },
    onSuccess: (data, vars) => {
      router.push(`/quiz/${vars.code}`);
      setCode(vars.code);
      setUsername(vars.username);
    },
  });
};
export const useGetQuizSession = () => {
  const code = useQuizStore((state) => state.code);
  return useQuery({
    queryFn: async () => {
      if (!code) {
        throw new Error("No code provided!");
      }
      const res = await fetch(`api/quiz-session?code=${code}`);
      if (res.status === 400) {
        throw new Error("Wrong code!");
      }
      return (await res.json()) as Promise<QuizSessionResponse>;
    },
  });
};
