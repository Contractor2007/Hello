import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import dbConnect from "../../../lib/db";
import User from "@/lib/model/User";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (req.method === "GET") {
    try {
      // Get all users except the current user
      const users = await User.find(
        { _id: { $ne: session.user.id } },
        { password: 0 }
      ).sort({ username: 1 });

      return res.status(200).json(users);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Failed to fetch users" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}