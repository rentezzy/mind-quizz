"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { useQuestionCreate } from "@/hooks/firebase/question";
import { QuestionBase, QuestionOneOfFourAnswer } from "@/types/question";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { Control, useForm } from "react-hook-form";
import * as yup from "yup";

const vocab = ["First", "Second", "Third", "Fourth"];
export const QuestionCreateModal = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <Dialog>
    <DialogTrigger asChild>{children}</DialogTrigger>
    <QuestionForm />
  </Dialog>
);

const formSchema = yup.object({
  title: yup.string().required(),
  type: yup.string<QuestionBase["type"]>().required(),
  text: yup.string().required(),
  points: yup.number().required(),
  answer: yup.string().required(),
  variants: yup.array<QuestionOneOfFourAnswer>(),
});

const QuestionForm = () => {
  const form = useForm<yup.InferType<typeof formSchema>>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      title: "",
      type: "one",
      text: "",
      points: 1,
      variants: ["", "", "", ""],
    },
  });
  const addQuestion = useQuestionCreate();

  const selectedType = form.watch("type");
  useEffect(() => {
    switch (selectedType) {
      case "one": {
        form.register("variants");
        form.setValue("variants", ["", "", "", ""]);
        break;
      }
      case "text": {
        form.unregister("variants");
        break;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedType]);
  const onSubmit = form.handleSubmit((values) => {
    addQuestion(values);
    form.reset();
  });

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="font-sans text-[30px]">
          Create your question!
        </DialogTitle>
        <DialogDescription className="font-sans text-[16px]">
          Here you can create your own question for your quizzes
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={onSubmit} className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Text</FormLabel>
                <FormControl>
                  <Input placeholder="Text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type:</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Theme" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="one">One</SelectItem>
                    <SelectItem value="text">Text</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormOptional control={form.control} state={selectedType} />
          <Button type="submit" className="w-[100%]">
            Create!
          </Button>
        </form>
      </Form>
    </DialogContent>
  );
};

const FormOptional = ({
  control,
  state,
}: {
  control: Control<yup.InferType<typeof formSchema>>;
  state: QuestionBase["type"];
}) => {
  switch (state) {
    case "one": {
      return (
        <FormField
          rules={{ required: true }}
          control={control}
          name="answer"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Write and select answers</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  {[0, 1, 2, 3].map((key) => (
                    <FormField
                      key={key}
                      rules={{ required: true }}
                      control={control}
                      name="variants"
                      render={({ field }) =>
                        field.value ? (
                          <div className="flex gap-[20px] w-[100%] items-center">
                            <RadioGroupItem
                              value={field.value[key]}
                            ></RadioGroupItem>
                            <FormItem className="w-[100%]">
                              <FormControl>
                                <Input
                                  placeholder={vocab[key] + " answer"}
                                  value={field.value[key]}
                                  onChange={(e) => {
                                    const value = field.value
                                      ? [...field.value]
                                      : ["", "", "", ""];
                                    value[key] = e.target.value;
                                    field.onChange(value);
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          </div>
                        ) : (
                          <></>
                        )
                      }
                    />
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      );
    }
    case "text": {
      return (
        <FormField
          rules={{ required: true }}
          control={control}
          name="answer"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Answer:</FormLabel>
              <FormControl>
                <Input value={field.value || ""} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      );
    }
  }
};
