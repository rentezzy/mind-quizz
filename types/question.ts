export type Question = QuestionOneOfFour | QuestionText;
export type QuestionBase = {
  title: string;
  type: "one" | "text";
  text: string;
  author: string;
  points: number;
};
export type QuestionText = {
  type: "text";
  answer: string;
} & QuestionBase;
export type QuestionOneOfFour = {
  type: "one";
  variants: [
    OneOfFourAnswer,
    OneOfFourAnswer,
    OneOfFourAnswer,
    OneOfFourAnswer
  ];
  answer: OneOfFourAnswer;
} & QuestionBase;

type OneOfFourAnswer = {
  text: string;
  id: number;
};
