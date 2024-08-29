import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const messageSchema = defineTable({
  body: v.string(),
  senderId: v.string(),
  read: v.boolean(),
  chatRoomId: v.id("chatRooms"),
});
const chatRoomSchema = defineTable({
  sender: v.string(),
  receiver: v.string(),
  jobId: v.string(),
});

export default defineSchema({
  messages: messageSchema.index("by_chatRoomId", ["chatRoomId"]),
  chatRooms: chatRoomSchema.index("by_sender", ["sender"]),
});
