import { getUser } from "@/app/[...authenticate]/lucia";
import ChatWindow from "@/components/chats/ChatWindow";
import { Id } from "@/convex/_generated/dataModel";
import { User } from "lucia";
import { redirect } from "next/navigation";
export default async function Page({
  params,
}: {
  params: { chatId: string[] };
}) {
  const user = await getUser();
  if (!user) {
    redirect("/signin");
  }

  return (
    <ChatWindow
      chatRoomId={params.chatId[0] as Id<"chatRooms">}
      user={user as User}
    />
  );
}
