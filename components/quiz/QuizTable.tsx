"use client";

import { useQuizGet } from "@/hooks/firebase/quiz";
import { Quiz } from "@/types/quiz";
import { ColumnDef } from "@tanstack/react-table";
import { Timestamp } from "firebase/firestore";
import { DateTime } from "luxon";
import { DataTable } from "../common/DataTable";

export const columns: ColumnDef<Quiz>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "points",
    header: "Points",
  },
  {
    accessorKey: "startAt",
    header: "Start Time",
    cell: ({ row }) => {
      const time: Timestamp = row.getValue("startAt");

      return (
        <div>{DateTime.fromSeconds(time.seconds).toFormat("d LLL H:mm")}</div>
      );
    },
  },
  {
    accessorKey: "endAt",
    header: "End Time",
    cell: ({ row }) => {
      const startTime: Timestamp = row.getValue("startAt");
      const endTime: Timestamp = row.getValue("endAt");

      return (
        <div>
          {startTime.isEqual(endTime)
            ? "-"
            : DateTime.fromSeconds(endTime.seconds).toFormat("d LLL H:mm")}
        </div>
      );
    },
  },
];

export const QuizTable = () => {
  const { data, status } = useQuizGet();
  return (
    <DataTable
      columns={columns}
      data={data || []}
      isLoading={status === "loading"}
    />
  );
};
