import { QuizForm } from "@/components/quiz/QuizForm";

const Quizzes = () => {
  // fetch(`${process.env.NEXT_PUBLIC_BASE_URL}api/quiz-session`, { method: "POST" });

  return (
    <div>
      <QuizForm />
    </div>
  );
};

export default Quizzes;
