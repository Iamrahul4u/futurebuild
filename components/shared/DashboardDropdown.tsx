import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { clientCheckUser, getUserId, signout } from "@/app/actions/auth.action";
import React, { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import prisma from "@/prisma";
import { getUser } from "@/app/[...authenticate]/lucia";
import { User } from "@prisma/client";
import { UserOptionalDefaults } from "@/prisma/generated/zod";
import useGetUser from "@/hooks/useGetUser";
export function DashboardDropdownMenu() {
  const user = useGetUser();

  return (
    user && (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-32">
          <DropdownMenuGroup className="gap-2">
            <DropdownMenuItem>
              <Link href={"/dashboard/user"}>Dashboard</Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuItem>
            <Link href={"/authenticate/signin"} onClick={() => signout()}>
              Logout
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  );
}
