import { QuestionResponse } from "@/types/api";
import { useQuery } from "@tanstack/react-query";

export const useGetQuestion = (qid: string | null) => {
  return useQuery({
    queryFn: async () => {
      if (!qid) {
        return null;
      }
      const res = await fetch(`/api/questions?question=${qid}`);
      if (res.status === 400) {
        throw new Error("Wrong question id!");
      }
      return (await res.json()) as Promise<QuestionResponse>;
    },
    queryKey: [qid],
  });
};
