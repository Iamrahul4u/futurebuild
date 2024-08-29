import { MessagesSquare } from "lucide-react";

export default async function Page() {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-4">
      <MessagesSquare className="h-16 w-16" />
      <h1 className="text-center text-2xl font-bold">No Chats Selected</h1>
    </div>
  );
}
