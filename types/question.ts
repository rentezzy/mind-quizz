export type Question = QuestionOneOfFour | QuestionText;
export type QuestionBase = {
  title: string;
  type: keyof typeof QuestionTypesVocab;
  text: string;
  author: string;
  points: number;
  id: string;
};
export type QuestionText = {
  type: "text";
  answer: string;
} & QuestionBase;
export type QuestionOneOfFour = {
  type: "one";
  variants: [string, string, string, string];
  answer: string;
} & QuestionBase;

export type QuestionOneOfFourAnswer = {
  text: string;
  id: number;
};
export const QuestionTypesVocab = {
  one: "One of Four",
  text: "Text",
};
