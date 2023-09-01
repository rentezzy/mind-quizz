"use client";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/firebase/auth";
import { LogOut } from "lucide-react";

export const LogOutButton = () => {
  const { signOut } = useAuth();
  return (
    <Button className="w-[100%]" onClick={() => signOut()}>
      Log out
      <LogOut size="20px" className="ml-[10px]" />
    </Button>
  );
};
