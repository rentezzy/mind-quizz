"use client";
import { DataTable } from "@/components/common/DataTable";
import { QuestionCreateModal } from "@/components/common/QuestionModal";
import { Button } from "@/components/ui/button";
import { useQuestionsGet } from "@/hooks/firebase/question";
import { columns } from "./columns";

const Questions = () => {
  const { data } = useQuestionsGet();
  return (
    <div className="container space-y-2 mt-2">
      <div className="flex justify-between">
        <div></div>
        <QuestionCreateModal>
          <Button>Create new question</Button>
        </QuestionCreateModal>
      </div>
      <div>
        <DataTable columns={columns} data={data || []} />
      </div>
    </div>
  );
};

export default Questions;
