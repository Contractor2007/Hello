import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/lib/model/schema";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { studentname, password } = await req.json();

    // Debug log to check received data
    console.log("Login attempt for:", studentname);

    // Check if user exists
    const user = await User.findOne({ studentname });
    if (!user) {
      console.error("User not found:", studentname); // Log studentname
      return NextResponse.json({ error: "Student does not exist" }, { status: 401 });
    }

    console.log("User found:", user);

    // Compare the provided password with the stored password
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      console.error("Invalid password for student:", studentname); // Log studentname
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    console.log("Password matched for user:", user.studentname);

    // Generate JWT token
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET not defined in environment");
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Set token cookie and return response
    const response = NextResponse.json({ message: "Login successful" }, { status: 200 });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 86400, // 1 day
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Failed to login" }, { status: 500 });
  }
}
