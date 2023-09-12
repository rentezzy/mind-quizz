import { createId } from "@/lib/createId";
import { customInitApp } from "@/lib/firebase-admin-config";
import { Quiz, QuizSession } from "@/types/quiz";
import { firestore } from "firebase-admin";
import { DateTime } from "luxon";
import { NextRequest, NextResponse } from "next/server";
customInitApp();

let quizzes: Quiz[] = [];
let quizzesSession: QuizSession[] = [];

firestore()
  .collection("mindquiz-quizzes")
  .onSnapshot((docs) => {
    const total: Quiz[] = [];
    docs.forEach((doc) => {
      total.push({ ...doc.data(), id: doc.id } as Quiz);
    });
    quizzes = [...total];
  });

firestore()
  .collection("mindquiz-quiz-sessions")
  .onSnapshot((docs) => {
    const total: QuizSession[] = [];
    docs.forEach((doc) => {
      total.push({ ...doc.data(), id: doc.id } as QuizSession);
    });
    quizzesSession = [...total];
  });

export async function POST(request: NextRequest) {
  for (let quiz of quizzes) {
    const startDate = DateTime.fromSeconds(
      (quiz.startAt as unknown as { _seconds: number })["_seconds"]
    );
    const endDate = DateTime.fromSeconds(
      (quiz.endAt as unknown as { _seconds: number })["_seconds"]
    );
    if (startDate.hasSame(DateTime.now(), "minute")) {
      sessionChange(quiz.id, true);
      continue;
    }

    if (endDate.hasSame(DateTime.now(), "minute")) {
      sessionChange(quiz.id, false);
      continue;
    }
  }
  return NextResponse.json({}, { status: 200 });
}

const sessionChange = async (id: string, active: boolean) => {
  const doc = quizzesSession.find((item) => item.id === id);
  if (!doc || doc.active === active) return;
  if (active === true) {
    const code = createId();
    await firestore().collection("mindquiz-quiz-sessions").doc(id).set(
      {
        active,
        code,
      },
      { merge: true }
    );
  } else {
    await firestore().collection("mindquiz-quiz-sessions").doc(id).set(
      {
        active,
        code: null,
      },
      { merge: true }
    );
  }
};
