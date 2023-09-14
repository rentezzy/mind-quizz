import { useEffect, useState } from "react";
import { useUser } from "reactfire";
export const useUsernameField = () => {
  const { data: user } = useUser();
  const [username, setUsername] = useState("");
  useEffect(() => {
    if (!user) return;
    setUsername(user.displayName || "");
  }, [user]);

  return { username, setUsername, isAuth: !!user };
};
