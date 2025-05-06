import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/lib/model/schema";

export async function POST(req: Request) {
  try {
    await connectDB();

    const {
      username,
      email,
      password,
      description = "",
      bio = "",
      location = "",
      interests = "",
    } = await req.json();

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return NextResponse.json(
        { error: "Username or email already exists" },
        { status: 409 }
      );
    }

    // Convert interests to array if it's a comma-separated string
    const interestsArray = interests
      ? interests.split(",").map((item: string) => item.trim())
      : [];

    // Create and save the new user
    const newUser = new User({
      username,
      email,
      password,
      description,
      bio,
      location,
      interests: interestsArray,
    });

    await newUser.save();

    return NextResponse.json(
      { message: "Registration successful" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Failed to register" },
      { status: 500 }
    );
  }
}
