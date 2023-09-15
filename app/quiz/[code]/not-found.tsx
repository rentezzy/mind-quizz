import { Button } from "@/components/ui/button";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="bg-secondary h-screen w-screen flex items-center justify-center">
      <div className="space-y-5">
        <h1 className="text-[32px] text-primary font-dela">
          This quiz doesn&apos;t exist yet!
        </h1>
        <Button
          variant="default"
          className="w-full"
          asChild
        >
          <Link href="/quiz">Start another quiz</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
