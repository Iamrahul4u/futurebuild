"use client";
import { Card, CardTitle } from "@/components/ui/card";

import prisma from "@/prisma";
import { redirect } from "next/navigation";
import { DialogCloseButton } from "@/components/shared/DialogCloseButton";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import useGetUser from "@/hooks/useGetUser";
import { deleteUser } from "@/app/actions/prisma.action";
import { toast } from "sonner";
import { signout } from "@/app/actions/auth.action";
import Link from "next/link";
export default function Page({ params }: { params: { userId: string } }) {
  const user = useGetUser();
  async function deleteAcccount(id: string) {
    const deletedUser = await deleteUser(user || params.userId[0]);
    if ("error" in deletedUser) {
      toast.error("Can't Complete Your Request");
    } else {
      toast.success("User Deleted Successfully");
      signout();
    }
  }
  return (
    <div>
      <CardTitle>Settings</CardTitle>
      <div className="flex flex-col gap-2">
        <Card className="p-4">
          <CardTitle>Edit Your Profile</CardTitle>
          <Link href={"/dashboard/edit"}>
            <Button>Edit Profile</Button>
          </Link>
        </Card>
        <Card className="p-4">
          <CardTitle>Delete Your Profile</CardTitle>
          <DialogCloseButton
            onClickFn={deleteAcccount}
            userId={params.userId}
            buttonText="Delete"
            description="Are You Sure You Want To Delete Your Account?"
            title="Delete Account"
            buttonVariant={"destructive"}
          />
        </Card>
      </div>
    </div>
  );
}
