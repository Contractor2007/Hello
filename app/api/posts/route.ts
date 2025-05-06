import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Post from "@/lib/model/Post";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { username, thought, feeling, content } = await req.json();

    if (!username || !content) {
      return NextResponse.json({ error: "Username and content are required" }, { status: 400 });
    }

    const newPost = new Post({ username, thought, feeling, content });
    await newPost.save();

    return NextResponse.json({ message: "Post created successfully" }, { status: 201 });
  } catch (error) {
    console.error("Post creation error:", error);
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}
