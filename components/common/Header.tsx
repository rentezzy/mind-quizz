"use client";

import { usePathname } from "next/navigation";

const matcher: Record<string, string> = {
  "/overview": "Dashboard / Info about quizzes",
  "/quizzes": "Quizzes / Manage your quizzes",
  "/questions": "Questions / Manage your questions",
};

export const Header = () => {
  const path = usePathname();
  return (
    <header className="h-[50px] border-b border-primary">
      <div className="container grid items-center h-[100%]">
        <h2 className="text-[20px] text-secondary-darker">{matcher[path]}</h2>
      </div>
    </header>
  );
};
