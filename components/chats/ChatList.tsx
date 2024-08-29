"use client";
import { Suspense, useEffect, useState } from "react";
import { Menu, Send, X, Users, MessageSquare } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRouter } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import useGetUser from "@/hooks/useGetUser";
import { getUserId } from "@/app/actions/auth.action";
import { error } from "console";
import SimplePageLoader from "../loaders/SimplePageLoader";
import { getUserChatRoomsDetails } from "@/app/actions/user.action";

const users = [
  {
    id: 1,
    name: "Alice Johnson",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 2,
    name: "Bob Smith",
    avatar: "/placeholder.svg?height=32&width=32",
  },
];

export default function ChatList() {
  const [showUserList, setShowUserList] = useState(false);
  const [showChatWindow, setShowChatWindow] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [currentUser, setCurrentUser] = useState<string>("");
  const [userDetails, setUserDetails] = useState<any>(null);
  const chatRooms = useQuery(api.chatRoom.queryChatRooms, {
    userId: currentUser,
  });
  useEffect(() => {
    async function getChatRooms() {
      setPending(true);
      const user = await getUserId();
      if ("error" in user) {
        console.error(user.error);
      } else {
        setCurrentUser(user.user.id);
        const userDetails = await getUserChatRoomsDetails({
          userId:
            chatRooms?.map((room) =>
              room.sender !== user.user.id ? room.sender : room.receiver,
            ) || [],
        });
        const userDetailsWithChatRooms = userDetails.map((user) => {
          const chatRoom = chatRooms?.find(
            (room) => room.sender === user.id || room.receiver === user.id,
          );
          return { ...user, ...chatRoom };
        });
        setUserDetails(userDetailsWithChatRooms);
        setPending(false);
      }
    }
    getChatRooms();
  }, [chatRooms]);
  const toggleUserList = () => setShowUserList(!showUserList);
  const toggleChatWindow = () => setShowChatWindow(!showChatWindow);

  const selectUser = (user: any) => {
    setSelectedUser(user);
    setShowChatWindow(true);
    if (window.innerWidth < 768) {
      setShowUserList(false);
    }
  };
  if (pending) {
    return (
      <div className="flex h-full w-64 flex-col items-center justify-center duration-700 ease-in-out">
        <h1 className="text-2xl font-bold">Loading Chats</h1>
        <SimplePageLoader />
      </div>
    );
  }
  return (
    <div
      className={`${showUserList ? "block" : "hidden"} w-full border-r bg-muted/50 duration-700 ease-in-out md:block md:w-64`}
    >
      <div className="flex items-center justify-between border-b p-4">
        <h2 className="text-lg font-semibold">Chats</h2>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={toggleUserList}
        >
          <X className="h-6 w-6" />
        </Button>
      </div>
      <ScrollArea className="h-[calc(100vh-65px)]">
        {userDetails?.map((user: any) => (
          <div
            key={user.id}
            className="flex cursor-pointer items-center gap-3 p-3 hover:bg-muted/80"
            onClick={() => {
              selectUser(user);
              router.push(`/chats/${user._id}`);
            }}
          >
            <Avatar>
              <AvatarImage
                src={user?.media[0]?.url ?? ""}
                alt={user.firstName}
              />
              <AvatarFallback>
                {user.firstName[0] + user.secondName[0]}
              </AvatarFallback>
            </Avatar>
            <span>{user.firstName + " " + user.secondName}</span>
          </div>
        ))}
      </ScrollArea>
    </div>
  );
}
