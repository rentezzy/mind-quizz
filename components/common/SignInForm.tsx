"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/firebase/auth";
import { SEmail, SPassword } from "@/lib/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { Chrome } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useUser } from "reactfire";
import * as yup from "yup";

const formSchema = yup.object({
  email: SEmail,
  password: SPassword,
});

export const SignInModal = ({ children }: { children: React.ReactNode }) => {
  const { data } = useUser();
  return data ? (
    <Link href="/overview">{children}</Link>
  ) : (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <SignInForm />
    </Dialog>
  );
};
const SignInForm = () => {
  const { signInGoogle } = useAuth();
  const form = useForm<yup.InferType<typeof formSchema>>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = form.handleSubmit((values) => {
    // console.log(values);
  });
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="font-sans text-[30px]">Sign in!</DialogTitle>
        <DialogDescription className="font-sans text-[16px]">
          You must be logged in to access this content.
        </DialogDescription>
      </DialogHeader>
      <div>
        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="password" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-[100%]">
              Log in
            </Button>
          </form>
        </Form>
      </div>
      <div className="flex w-[100%] items-center gap-[20px]">
        <Separator className="basis-1/2 shrink" />
        <p>or</p>
        <Separator className="basis-1/2 shrink" />
      </div>
      <div className="flex gap-[20px] justify-center">
        <Chrome
          size={36}
          absoluteStrokeWidth
          color="hsl(var(--foreground))"
          onClick={() => signInGoogle()}
          className="cursor-pointer"
        />
      </div>
      <DialogFooter className="text-[12px]">
        Still don&apos;t have an account? Sign-up&nbsp;
        <Link
          href="/login"
          className="text-secondary hover:text-primary-darker hover:underline"
        >
          here!
        </Link>
      </DialogFooter>
    </DialogContent>
  );
};
