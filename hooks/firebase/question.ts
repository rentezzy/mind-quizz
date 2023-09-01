import { assignTypes } from "@/lib/typeAssign";
import { Question } from "@/types/question";
import { addDoc, collection, query, where } from "firebase/firestore";
import { useCallback } from "react";
import { useFirestore, useFirestoreCollectionData, useUser } from "reactfire";

const COLLECTION = "mindquiz-questions";

export const useQuestionCreate = () => {
  const firestore = useFirestore();
  const { data: user } = useUser();
  return useCallback(
    (question: Omit<Question, "author">) =>
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
  const animalsQuery = query<Question>(
    collection(firestore, COLLECTION).withConverter(assignTypes<Question>()),
    where("author", "==", user?.uid)
  );

  return useFirestoreCollectionData<Question>(animalsQuery, {
    idField: "id",
  });
};
