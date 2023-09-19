import { firestore } from "firebase-admin";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const questionID = searchParams.get("question") || "";

  const question = (
    await firestore().collection("mindquiz-questions").doc(questionID).get()
  ).data();

  if (!question)
    return NextResponse.json({ message: "No such question!" }, { status: 400 });

  return NextResponse.json({ question }, { status: 200 });
}
