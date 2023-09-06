import { assignTypes } from "@/lib/typeAssign";
import { Quiz } from "@/types/quiz";
import { addDoc, collection, query, where } from "firebase/firestore";
import { useCallback, useMemo } from "react";
import { useFirestore, useFirestoreCollectionData, useUser } from "reactfire";

const COLLECTION = "mindquiz-quizzes";

export const useQuizCreate = () => {
  const firestore = useFirestore();
  const { data: user } = useUser();
  return useCallback(
    (quiz: Omit<Quiz, "author" | "id">) =>
      addDoc(collection(firestore, COLLECTION), {
        ...quiz,
        author: user!.uid,
      } as Quiz),
    [firestore, user]
  );
};
export const useQuestionsGet = () => {
  const firestore = useFirestore();
  const { data: user } = useUser();
  const quizQuery = useMemo(
    () =>
      query<Quiz>(
        collection(firestore, COLLECTION).withConverter(assignTypes<Quiz>()),
        where("author", "==", user ? user.uid : "_")
      ),
    [firestore, user]
  );

  return useFirestoreCollectionData<Quiz>(quizQuery, {
    idField: "id",
  });
};
