import {
  onAuthStateChanged,
  signInWithPopup,
  signOut as signOutFB,
} from "firebase/auth";
import { auth, provider } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export const useAuth = () => {
  const router = useRouter();

  onAuthStateChanged(auth, async (userCred) => {
    if (!userCred) {
      return;
    }
    const { isLogged } = await fetch("/api/login", {
      method: "GET",
    }).then((data) => data.json());

    if (isLogged) return;
    fetch("/api/login", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${await userCred.getIdToken()}`,
      },
    }).then((response) => {
      if (response.status === 200) {
        router.push("/overview");
      }
    });
  });

  async function signOut() {
    await signOutFB(auth);

    const response = await fetch(`/api/login`, {
      method: "DELETE",
    });

    if (response.status === 200) {
      router.replace("/");
    }
  }

  async function signInGoogle() {
    const user = await signInWithPopup(auth, provider);
    fetch("/api/login", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${await user.user.getIdToken()}`,
      },
    }).then((response) => {
      if (response.status === 200) {
        router.push("/overview");
      }
    });
  }

  return { signOut, signInGoogle };
};
