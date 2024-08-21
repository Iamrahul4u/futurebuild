import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const AvatarComponent = ({ url }: { url: string | undefined }) => {
  return (
    <Avatar>
      <AvatarImage src={url || undefined} alt="@profileImg" />
      <AvatarFallback>U</AvatarFallback>
    </Avatar>
  );
};

export default AvatarComponent;
