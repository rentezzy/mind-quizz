import { Button } from "@/components/ui/button";
import Link from "next/link";
const Page = () => {
  return (
    <div className="container">
      <h1 className="font-dela text-[36px] text-primary">
        Dashboard still in development!
      </h1>
      <p className="font-dela text-[24px] text-secondary">But now you can:</p>
      <ul className="p-2 font-dela text-[16px] text-secondary-darker">
        <li>
          <Button variant="link" asChild>
            <Link href="/questions">Create questions</Link>
          </Button>
        </li>
        <li>
          <Button variant="link" asChild>
            <Link href="/questions">Create quizzes</Link>
          </Button>
        </li>
        <li>
          <Button variant="link" asChild>
            <Link href="/questions">Complete quizzes</Link>
          </Button>
        </li>
      </ul>
    </div>
  );
};

export default Page;
