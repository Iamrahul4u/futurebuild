"use client";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery, useMutation } from "convex/react";
import { User } from "lucia";
import { useEffect, useState, useRef, useLayoutEffect } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Send } from "lucide-react";
import { convertTimestampToTime, pushNotification } from "@/_utils/utils";
import { getUserChatRoomsDetails } from "@/app/actions/user.action";
import Image from "next/image";
import AvatarComponent from "../shared/AvatarComponent";
import ProfileDropdown from "./ProfileDropdown";
// For demo purposes. In a real app, you'd have real user data.

interface selectedUserInterface {
  firstName: string;
  secondName: string | null;
  media: { url: string }[] | [];
  id: string;
}
export default function ChatWindow({
  chatRoomId,
  user,
}: {
  chatRoomId: Id<"chatRooms">;
  user: User;
}) {
  const [newMessageText, setNewMessageText] = useState("");
  const [selectedUser, setSelectedUser] = useState<selectedUserInterface>();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const messages = useQuery(api.message.queryMessages, {
    chatRoomId: chatRoomId,
  });
  const sendMessage = useMutation(api.message.insertMessage);
  const chatRoom = useQuery(api.chatRoom.queryChatRoom, {
    chatRoomId: chatRoomId,
  });

  useEffect(() => {
    async function fetchUserDetails() {
      if (chatRoom) {
        const userSelected: string =
          user.id === chatRoom.sender ? chatRoom.receiver : chatRoom.sender;
        const userDetails = await getUserChatRoomsDetails({
          userId: [userSelected],
        });
        setSelectedUser(userDetails[0]);
      }
    }
    fetchUserDetails();
  }, [chatRoom]);

  function scrollToBottom() {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }
  useLayoutEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex h-[90vh] w-full flex-col bg-background">
      <header className="flex items-center justify-between border-b p-4">
        <div className="flex items-center gap-2">
          <AvatarComponent url={selectedUser?.media[0]?.url ?? ""} />
          <h1 className="mb-0 text-2xl font-bold">
            {selectedUser?.firstName} {selectedUser?.secondName}
          </h1>
        </div>
        <ProfileDropdown jobId={chatRoom?.jobId ?? ""} />
      </header>
      <div className="h-full overflow-y-scroll p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages?.map((message) => (
            <div
              key={message._id}
              className={`flex ${
                message.senderId === user.id ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[70%] rounded-lg px-3 py-4 ${
                  message.senderId === user.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary"
                }`}
              >
                <span className="flex flex-wrap justify-end gap-2 transition-all duration-300">
                  <p className="mb-0 text-sm">{message.body}</p>
                  <p className="mb-0 place-self-end text-xs">
                    {convertTimestampToTime(message._creationTime)}
                  </p>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          if (newMessageText.trim()) {
            await sendMessage({
              senderId: user.id,
              chatRoomId: chatRoomId,
              text: newMessageText,
            });
            setNewMessageText("");
            scrollToBottom();
          }
        }}
        className="flex gap-2 border-t p-4"
      >
        <Input
          value={newMessageText}
          onChange={(e) => setNewMessageText(e.target.value)}
          placeholder="Type a message..."
          className="flex-grow"
        />
        <Button type="submit" disabled={!newMessageText.trim()}>
          <Send className="mr-2 h-4 w-4" />
          Send
        </Button>
      </form>
    </div>
  );
}
