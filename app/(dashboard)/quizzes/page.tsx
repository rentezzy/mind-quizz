import { QuizForm } from "@/components/quiz/QuizForm";
import { QuizTable } from "@/components/quiz/QuizTable";
import { Separator } from "@/components/ui/separator";

const Quizzes = () => {
  return (
    <div className="container space-y-4">
      <h3 className="font-dela text-primary text-[24px] text-center">
        Create quiz
      </h3>
      <QuizForm />
      <Separator />
      <h3 className="font-dela text-primary text-[24px] text-center">
        Your quizzess
      </h3>
      <QuizTable />
    </div>
  );
};

export default Quizzes;
