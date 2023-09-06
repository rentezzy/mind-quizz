import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Question, QuestionTypesVocab } from "@/types/question";
import { Check, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { Separator } from "../ui/separator";

export const QuestionInfo = ({ question }: { question: Question }) => {
  return (
    <Dialog>
      <DialogTrigger>
        <MoreHorizontal color="hsl(var(--foreground))" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{question.title}</DialogTitle>
        </DialogHeader>
        <DialogDescription className="space-y-2">
          <div className="flex justify-between">
            <h3 className="text-[19px]">
              {QuestionTypesVocab[question.type]} question.
            </h3>
            <h4>
              {question.points} point{question.points > 1 ? "s" : ""}
            </h4>
          </div>
          <div className="flex justify-between">
            <p className="text-[17px]">{question.text}</p>
            <div className="flex gap-[4px] items-center border rounded-sm p-[2px]">
              <Pencil
                color="hsl(var(--muted-foreground))"
                size="20px"
                className="cursor-pointer"
              />
              <Separator orientation="vertical" />
              <Trash2
                color="hsl(var(--destructive))"
                size="20px"
                className="cursor-pointer"
              />
            </div>
          </div>
        </DialogDescription>
        <QuestionAdditionalInfo question={question} />
      </DialogContent>
    </Dialog>
  );
};
const QuestionAdditionalInfo = ({ question }: { question: Question }) => {
  switch (question.type) {
    case "one":
      return (
        <ul className="space-y-2">
          {question.variants.map((variant) => (
            <li
              key={variant}
              className={`border rounded-lg p-2 flex gap-1 items-center ${
                variant === question.answer
                  ? "border-secondary"
                  : "border-primary"
              }`}
            >
              {variant === question.answer ? (
                <Check color="hsl(var(--secondary))" />
              ) : (
                ""
              )}
              {variant}
            </li>
          ))}
        </ul>
      );

    case "text":
      return (
        <div className="border rounded-lg p-2 flex gap-1 items-center border-secondary">
          {question.answer}
        </div>
      );
  }
};
