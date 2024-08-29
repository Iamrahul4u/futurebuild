import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

const insertMessage = mutation({
  args: {
    text: v.string(),
    chatRoomId: v.id("chatRooms"),
    senderId: v.string(),
  },
  handler: async (ctx, args) => {
    const newMessage = await ctx.db.insert("messages", {
      body: args.text,
      chatRoomId: args.chatRoomId,
      senderId: args.senderId,
      read: false,
    });
    return newMessage;
  },
});

const queryMessages = query({
  args: { chatRoomId: v.id("chatRooms") },
  handler: async (ctx, args) => {
    const messages = await ctx.db
      .query("messages")
      .withIndex("by_chatRoomId", (q) => q.eq("chatRoomId", args.chatRoomId))
      .collect();
    return messages;
  },
});

export { insertMessage, queryMessages };
