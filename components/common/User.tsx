"use client";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useUser } from "reactfire";

export const User = ({ uid }: { uid: string }) => {
  return <div>User</div>;
};
export const MyUser = () => {
  const { data } = useUser();
  return (
    <div className="flex items-center gap-[20px]">
      <Avatar>
        <AvatarImage src={data?.photoURL || undefined} alt="" />
        <AvatarFallback>
          {!data
            ? "User"
            : data.displayName
            ? `${data.displayName[0]}${data.displayName[1]}`.toUpperCase()
            : "User"}
        </AvatarFallback>
      </Avatar>
      <h4 className="font-sans font-normal">{data?.displayName || "User"}</h4>
    </div>
  );
};
