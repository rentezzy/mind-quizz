import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { LogOutButton } from "./LogOut";
import { Navigation } from "./Navigation";
import { MyUser } from "./User";
const links = [
  { href: "/overview", name: "Dashboard" },
  { href: "/", name: "" },
  { href: "/quizzes", name: "Quizzes" },
  { href: "/questions", name: "Questions" },
];
export const Sidebar = () => {
  return (
    <Sheet>
      <SheetTrigger className="fixed top-[10px] left-[10px]">
        <Menu color="hsl(var(--primary))" size="28px" />
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col">
        <SheetHeader>
          <SheetTitle>
            <MyUser />
          </SheetTitle>
        </SheetHeader>
        <SheetDescription className="flex gap-[10px] flex-col pl-[15px] mt-[20px] grow">
          <Navigation navLinks={links} />
        </SheetDescription>
        <SheetFooter>
          <LogOutButton />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
