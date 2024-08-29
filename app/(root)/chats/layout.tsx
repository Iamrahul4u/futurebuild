import ChatList from "@/components/chats/ChatList";

export const metadata = {
  title: "Chats",
};
export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="relative flex h-[95vh] w-full overflow-hidden bg-background">
      <ChatList />
      {children}
    </main>
  );
}
