import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const insertChatRoom = mutation({
  args: {
    sender: v.string(),
    receiver: v.string(),
    jobId: v.string(),
  },
  handler: async (ctx, args) => {
    // Check if chat room already exists
    const chatRoomExists = await ctx.db
      .query("chatRooms")
      .filter((q) =>
        q.and(
          q.eq(q.field("jobId"), args.jobId),
          q.or(
            q.and(
              q.eq(q.field("sender"), args.sender),
              q.eq(q.field("receiver"), args.receiver),
            ),
            q.and(
              q.eq(q.field("sender"), args.receiver),
              q.eq(q.field("receiver"), args.sender),
            ),
          ),
        ),
      )
      .first();
    if (chatRoomExists) {
      return chatRoomExists._id;
    }

    // Create new chat room
    const newChatRoom = await ctx.db.insert("chatRooms", {
      sender: args.sender,
      receiver: args.receiver,
      jobId: args.jobId,
    });
    return newChatRoom;
  },
});

export const queryChatRooms = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    console.log("userId", args.userId);
    const chatRooms = await ctx.db
      .query("chatRooms")
      .filter((q) =>
        q.or(
          q.eq(q.field("sender"), args.userId),
          q.eq(q.field("receiver"), args.userId),
        ),
      )
      .collect();
    console.log(chatRooms);
    return chatRooms;
  },
});

export const queryChatRoom = query({
  args: { chatRoomId: v.id("chatRooms") },
  handler: async (ctx, args) => {
    const chatRoom = await ctx.db
      .query("chatRooms")
      .filter((q) => q.eq(q.field("_id"), args.chatRoomId))
      .first();
    return chatRoom;
  },
});
