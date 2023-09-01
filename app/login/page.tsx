"use client";

import { useAuth } from "@/hooks/firebase/auth";
import { useUser } from "reactfire";

export default function SignIn() {
  const { signInGoogle, signOut } = useAuth();
  const { data } = useUser();
  return (
    <>
      <button onClick={() => signInGoogle()}>Sign In</button>
      <button onClick={() => signOut()}>Log out</button>
    </>
  );
}
