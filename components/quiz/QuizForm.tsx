"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { columns } from "@/app/(dashboard)/questions/columns";
import { Input } from "@/components/ui/input";
import { useQuestionsGet } from "@/hooks/firebase/question";
import { useQuizCreate } from "@/hooks/firebase/quiz";
import { Question } from "@/types/question";
import { yupResolver } from "@hookform/resolvers/yup";
import { ColumnDef } from "@tanstack/react-table";

import { useEffect, useState } from "react";
import { DefaultValues, useForm } from "react-hook-form";
import * as yup from "yup";
import { DataTable } from "../common/DataTable";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { DateTimePicker } from "../ui/date-time-picker";
import { Textarea } from "../ui/textarea";

type QuizForm = yup.InferType<typeof formSchema>;
const formSchema = yup.object({
  title: yup.string().required().max(100).min(3).label("Title"),
  description: yup.string().required().max(100).min(3).label("Description"),
  startAt: yup.date().required().label("Start time"),
  endAt: yup.date().required().label("End time"),
  questions: yup
    .array<string[]>()
    .min(1)
    .max(100)
    .required()
    .label("Questions"),
});
const defaultValues: DefaultValues<QuizForm> = {
  title: "",
  description: "",
  startAt: new Date(),
  endAt: new Date(),
  questions: [],
};

export const QuestionForm = () => {
  const form = useForm<QuizForm>({
    resolver: yupResolver(formSchema),
    defaultValues,
    mode: "onChange",
  });
  const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([]);

  const createQuiz = useQuizCreate();

  const startDate = form.watch("startAt");

  const points = selectedQuestions.reduce(
    (acc, question) => acc + question.points,
    0
  );
  useEffect(() => {
    form.setValue(
      "questions",
      selectedQuestions.map((q) => q.id)
    );
  }, [selectedQuestions, form]);
  const onSubmit = form.handleSubmit((values) => {
    createQuiz({ ...values, points });
    form.reset();
  });

  return (
    <div className="container">
      <Form {...form}>
        <form onSubmit={onSubmit} className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Title..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-between gap-[20px] min-h-[150px]">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="grow h-[100%]">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Description..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <FormField
                rules={{
                  min: Date.now(),
                  validate: (value) => "Start time must be in future.",
                  required: true,
                }}
                control={form.control}
                name="startAt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start time</FormLabel>
                    <FormControl>
                      <DateTimePicker
                        date={field.value || new Date()}
                        setDate={field.onChange}
                        disabled={(date) => date < new Date()}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="endAt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End time</FormLabel>
                    <FormControl>
                      <DateTimePicker
                        date={field.value || new Date()}
                        setDate={field.onChange}
                        disabled={(date) => date <= startDate}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <FormField
            control={form.control}
            name="questions"
            render={({ field }) => (
              <FormItem>
                <div className="flex justify-between">
                  <FormLabel>Questions</FormLabel>
                  <FormMessage />
                </div>
                <FormControl>
                  <QuestionTable onSelect={setSelectedQuestions} />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit" className="w-[100%]">
            Create!
          </Button>
        </form>
      </Form>
    </div>
  );
};

const questionColumns: ColumnDef<Question>[] = [
  {
    id: "select",
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
  ...columns,
];

const QuestionTable = ({
  onSelect,
}: {
  onSelect: (data: Question[]) => void;
}) => {
  const { data } = useQuestionsGet();
  return (
    <DataTable
      columns={questionColumns}
      data={data || []}
      pages={5}
      onSelect={onSelect}
    />
  );
};
