import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import dbConnect from "@/lib/db";
import Message from "@/lib/model/Message";
import Chat from "@/lib/model/Chat";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { chatId } = req.query;

  if (req.method === "GET") {
    try {
      const messages = await Message.find({ chat: chatId })
        .populate("sender", "username profilePicture")
        .sort({ createdAt: 1 });

      return res.status(200).json(messages);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Failed to fetch messages" });
    }
  }

  if (req.method === "POST") {
    try {
      const { content, senderId } = req.body;

      // Create new message
      const newMessage = new Message({
        chat: chatId,
        sender: senderId,
        content,
      });

      await newMessage.save();

      // Update chat's last message
      await Chat.findByIdAndUpdate(chatId, {
        lastMessage: newMessage._id,
      });

      // Populate sender info before returning
      const populatedMessage = await Message.populate(newMessage, {
        path: "sender",
        select: "username profilePicture",
      });

      return res.status(201).json(populatedMessage);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Failed to send message" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}