import { Button } from "@/components/ui/button";
import { useGetQuestion } from "@/hooks/api/question";
import { Question } from "@/types/question";

export const QuizQuestion = ({
  quid,
  isEnded,
  addAnswer,
}: {
  quid: string | null;
  addAnswer: (answer: string) => void;
  isEnded?: boolean;
}) => {
  const { data } = useGetQuestion(quid);
  if (!data) return <p>Loading...</p>;
  return (
    <div>
      <h2>{data.question.text}</h2>
      <QuestionType addAnswer={addAnswer} question={data.question} />
    </div>
  );
};
const QuestionType = ({
  question,
  addAnswer,
}: {
  question: Question;
  addAnswer: (answer: string) => void;
}) => {
  switch (question.type) {
    case "one": {
      return (
        <div>
          {question.variants.map((variant, index) => (
            <Button key={index} onClick={() => addAnswer(variant)}>
              {variant}
            </Button>
          ))}
        </div>
      );
    }
    case "text": {
      return <div></div>;
    }
  }
};
