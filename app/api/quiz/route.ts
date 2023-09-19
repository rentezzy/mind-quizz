import { firestore } from "firebase-admin";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const quizID = searchParams.get("quiz") || "";
  const body = await request.json();
  const quiz = (
    await firestore().collection("mindquiz-quiz-sessions").doc(quizID).get()
  ).data();
  const prev = quiz ? quiz.answers : [];
  await firestore()
    .collection("mindquiz-quiz-sessions")
    .doc(quizID)
    .set({ answers: [...prev, body] }, { merge: true });
  return NextResponse.json({});
}
