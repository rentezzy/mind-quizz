import { assignTypes } from "@/lib/typeAssign";
import { Quiz, QuizSession } from "@/types/quiz";
import {
  addDoc,
  collection,
  doc,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { useCallback, useMemo } from "react";
import { useFirestore, useFirestoreCollectionData, useUser } from "reactfire";

const COLLECTION = "mindquiz-quizzes";
const SESSION_COLLECTION = "mindquiz-quiz-sessions";

export const useQuizCreate = () => {
  const firestore = useFirestore();
  const { data: user } = useUser();
  return useCallback(
    (quiz: Omit<Quiz, "author" | "id">) => {
      addDoc(collection(firestore, COLLECTION), {
        ...quiz,
        author: user!.uid,
      }).then((data) => {
        setDoc(doc(firestore, SESSION_COLLECTION, data.id), {
          code: null,
          active: false,
          answers: {},
        });
      });
    },
    [firestore, user]
  );
};
export const useQuizGet = () => {
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
