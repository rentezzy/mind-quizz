"use client";

import { QuestionInfo } from "@/components/question/QuestionInfo";
import { Question, QuestionTypesVocab } from "@/types/question";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Question>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "points",
    header: "Points",
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const type: "one" | "text" = row.getValue("type");

      return <div>{QuestionTypesVocab[type]}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const question = row.original;

      return <QuestionInfo question={question} />;
    },
  },
];
