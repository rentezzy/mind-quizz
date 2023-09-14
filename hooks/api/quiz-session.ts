import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useGetQuizSession = (withNav: boolean) => {
  const router = useRouter();
  return useMutation({
    mutationFn: async (code: string) => {
      const res = await fetch(`api/quiz-session?code=${code}`);
      if (res.status === 400) {
        throw new Error("Wrong code!");
      }
      return await res.json();
    },
    onSuccess: (data, code) => withNav && router.push(`/quiz/${code}`),
  });
};
