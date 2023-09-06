import { assignTypes } from "@/lib/typeAssign";
import { Question } from "@/types/question";
import { addDoc, collection, query, where } from "firebase/firestore";
import { useCallback, useMemo } from "react";
import { useFirestore, useFirestoreCollectionData, useUser } from "reactfire";

const COLLECTION = "mindquiz-questions";

export const useQuestionCreate = () => {
  const firestore = useFirestore();
  const { data: user } = useUser();
  return useCallback(
    (question: Omit<Question, "author" | "id">) =>
      addDoc(collection(firestore, COLLECTION), {
        ...question,
        author: user!.uid,
      } as Question),
    [firestore, user]
  );
};
export const useQuestionsGet = () => {
  const firestore = useFirestore();
  const { data: user } = useUser();
  const animalsQuery = useMemo(
    () =>
      query<Question>(
        collection(firestore, COLLECTION).withConverter(
          assignTypes<Question>()
        ),
        where("author", "==", user ? user.uid : "_")
      ),
    [firestore, user]
  );

  return useFirestoreCollectionData<Question>(animalsQuery, {
    idField: "id",
  });
};
