import { SignInModal } from "@/components/common/SignInForm";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import mainImage from "@/public/main_image.svg";
import man1 from "@/public/avatars/man1.jpg";
import woman1 from "@/public/avatars/woman1.png";
import woman2 from "@/public/avatars/woman2.jpg";
import graphic from "@/public/graphic.svg";
import star from "@/public/star.svg";
import { Instagram, Twitch, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <main className="bg-primary-darker">
        <section className="container h-screen max-h-[800px] flex flex-col items-center justify-center gap-[30px]">
          <Image src={mainImage} alt="logo" className="w-[200px] h-[200px]" />
          <h1 className="text-background text-center font-dela text-[60px]">
            Unleash Your Brain
            <br />
            Power!
          </h1>
          <article className="flex gap-[20px]">
            <SignInModal>
              <Button variant="default" className="rounded-full text-[20px]">
                Create Quiz
              </Button>
            </SignInModal>
            <Button
              variant="secondary"
              className="rounded-full text-[20px]"
              asChild
            >
              <Link href="/quiz">Take Quiz</Link>
            </Button>
          </article>
        </section>
      </main>
      <section className="container py-[100px] flex flex-col gap-[40px] ">
        <h2 className="font-dela text-primary text-[48px]">
          Welcome to Mind Quiz Mania!
        </h2>
        <p className="max-w-[600px] leading-6 text-[20px]">
          Embark on a thrilling adventure into the world of digital quizzing.
          Put your knowledge to the test while exploring mind-bending games.
          Let&apos;s elevate your brainpower together!
        </p>
        <article className="flex gap-[40px] sm:gap-[120px] flex-wrap">
          <div>
            <h4 className="font-dela text-primary text-[32px]">100</h4>
            <p className="text-[16px]">Quiz types</p>
          </div>
          <div>
            <h4 className="font-dela text-primary text-[32px]">5000</h4>
            <p className="text-[16px]">Active users</p>
          </div>
          <div>
            <h4 className="font-dela text-primary text-[32px]">345</h4>
            <p className="text-[16px]">New Quizzes</p>
          </div>
        </article>
      </section>
      <section className="container py-[100px]">
        <div className="rounded-[120px] grid gap-[5px] grid-rows-4 md:grid-rows-3 lg:grid-rows-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <div className="bg-secondary h-[320px] md:col-span-2 rounded-t-[120px] lg:rounded-tr-[0px] flex justify-center items-center">
            <div>
              <h5 className="text-[80px] font-dela text-center">4.7</h5>
              <p className="text-[20px] text-center">Average Rating</p>
            </div>
          </div>
          <div className="bg-secondary h-[320px] lg:rounded-tr-[120px] flex justify-center items-center">
            <Image className="w-[37%]" src={star} alt="star" />
          </div>
          <div className="bg-secondary h-[320px] lg:rounded-bl-[120px] flex justify-center items-center">
            <Image className="w-[37%]" src={graphic} alt="graphic" />
          </div>
          <div className="bg-secondary h-[320px] md:col-span-2 rounded-b-[120px] lg:rounded-bl-[0px] flex justify-center items-center">
            <div>
              <h5 className="text-[80px] font-dela text-center">90%</h5>
              <p className="text-[20px] text-center">Success Rate</p>
            </div>
          </div>
        </div>
      </section>
      <section className="container py-[100px] flex gap-[20px] flex-wrap md:flex-nowrap">
        <Card className="h-[400px] p-[40px] flex flex-col gap-[40px] rounded-[20px] border-none basis-1/3 md:basis-1/3 shrink">
          <CardHeader className="p-0">
            <CardTitle>
              <Avatar className="w-[50px] h-[50px]">
                <AvatarImage src={woman1.src} />
                <AvatarFallback>SC</AvatarFallback>
              </Avatar>
            </CardTitle>
          </CardHeader>
          <CardContent className="grow p-0">
            <p className="text-[20px] font-medium">
              Mind Quiz is a game-changer! I&apos;ve learned so much while
              having fun.
            </p>
          </CardContent>
          <CardFooter className="p-0">
            <p>Samantha Carter</p>
          </CardFooter>
        </Card>
        <Card className="h-[400px] p-[40px] flex flex-col gap-[40px] rounded-[20px] border-none basis-1/2 md:basis-1/3 shrink">
          <CardHeader className="p-0">
            <CardTitle>
              <Avatar className="w-[50px] h-[50px]">
                <AvatarImage src={man1.src} />
                <AvatarFallback>MD</AvatarFallback>
              </Avatar>
            </CardTitle>
          </CardHeader>
          <CardContent className="grow p-0">
            <p className="text-[20px] font-medium">
              I&apos;m addicted to these quizzes! Can&apos;t wait for more.
            </p>
          </CardContent>
          <CardFooter className="p-0">
            <p>Michael Davis</p>
          </CardFooter>
        </Card>
        <Card className="h-[400px] p-[40px] flex flex-col gap-[40px] rounded-[20px] border-none basis-1/2 md:basis-1/3 shrink">
          <CardHeader className="p-0">
            <CardTitle>
              <Avatar className="w-[50px] h-[50px]">
                <AvatarImage src={woman2.src} />
                <AvatarFallback>EJ</AvatarFallback>
              </Avatar>
            </CardTitle>
          </CardHeader>
          <CardContent className="grow p-0">
            <p className="text-[20px] font-medium">
              The perfect platform for educators and students alike.
            </p>
          </CardContent>
          <CardFooter className="p-0">
            <p>Emma Johnson</p>
          </CardFooter>
        </Card>
      </section>
      <section className="container py-[100px] flex gap-[60px] flex-col">
        <h2 className="font-dela text-[48px] text-secondary-darker">
          Let&apos;s Tackle Some Questions!
        </h2>
        <div className="flex w-[100%]">
          <div className="basis-1/2">
            <h4 className="text-secondary-darker text-[20px] font-medium mb-[10px]">
              How do I create my own quiz?
            </h4>
            <p>
              Signup, choose the quiz format and unleash your creativity.
              It&apos;s that easy!
            </p>
          </div>
          <div className="basis-1/2">
            <h4 className="text-secondary-darker text-[20px] font-medium mb-[10px]">
              How can I pass the quizz?
            </h4>
            <p>
              To take the quizz, you do not need to signup, just get the code
              from the organizer and enter it on the test page.
            </p>
          </div>
        </div>
      </section>
      <section className="container py-[100px] flex gap-[20px] flex-col items-center">
        <h2 className="font-dela text-[38px] text-primary">Join now!</h2>
        <p className="max-w-[420px] text-center text-medium text-primary">
          Why wait? Embark on this epic quiz adventure with us today! Unleash
          your learning potential.
        </p>
        <div>
          <Button className="mr-[10px] bg-primary-darker rounded-[8px]" asChild>
            <Link href="/login">Sign up</Link>
          </Button>
          <Button className="rounded-[8px]">Learn more</Button>
        </div>
      </section>
      <Separator />
      <footer className="container py-[100px] flex gap-[30px] flex-col items-center">
        <div className="flex gap-[20px]">
          <Twitter color="hsl(var(--foreground))" />
          <Instagram color="hsl(var(--foreground))" />
          <Twitch color="hsl(var(--foreground))" />
        </div>
        <h6 className="font-medium">
          ©2023 Mind Quiz Mania. All rights reserved.
        </h6>
      </footer>
    </>
  );
}
