"use client";

import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { MessagesSquareIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export default function CreateChat({
  applicant,
  currentUser,
}: {
  applicant: any;
  currentUser: { id: string };
}) {
  const [chatRoom, setChatRoom] = useState<string>();
  const createChat = useMutation(api.chatRoom.insertChatRoom);
  const router = useRouter();
  async function handleChat(userId: string, jobId: string) {
    const chatRoomId = await createChat({
      sender: currentUser.id,
      receiver: applicant.userId,
      jobId: applicant.jobId,
    });
    router.push(`/chats/${chatRoomId}`);
  }
  return (
    <Button
      variant="outline"
      className="text-muted-foreground"
      onClick={() => {
        handleChat(applicant.userId, applicant.jobId);
      }}
    >
      <MessagesSquareIcon />
    </Button>
  );
}
