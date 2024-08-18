import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { signout } from "@/app/actions/auth.action";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import useGetUser from "@/hooks/useGetUser";
import { getUserProfile } from "@/app/actions/user.action";
export function DashboardDropdownMenu() {
  const [imgUrl, setImg] = useState<string | null>(null);
  const userId = useGetUser();
  useEffect(() => {
    async function profile_img() {
      if (!userId) {
        console.log("User Id Not set");
        return;
      }
      const url = await getUserProfile(userId);
      setImg(url.imgUrl);
      console.log(url);
    }
    profile_img();
  }, [userId]);
  return userId ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage src={imgUrl || undefined} alt="@shadcn" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-32">
        <Link href={`/dashboard/user/${userId}`}>
          <DropdownMenuItem>Dashboard</DropdownMenuItem>
        </Link>
        <Link href={"/authenticate/signin"} onClick={() => signout()}>
          <DropdownMenuItem>Logout</DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <>
      <Link href={"/authenticate/signin"}>
        <Button>Login</Button>
      </Link>
      <Link href={"/authenticate/signup"}>
        <Button variant={"outline"}>Sign Up</Button>
      </Link>
    </>
  );
}
