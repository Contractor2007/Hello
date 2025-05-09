import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";
import connectDB from "@/lib/db";
import User from "@/lib/model/User";

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "username" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          // Ensure the DB connection is made
          await connectDB();
          
          if (!credentials?.username || !credentials?.password) {
            throw new Error("Missing credentials");
          }

          const user = await User.findOne({ username: credentials.username });

          if (!user) {
            throw new Error("No user found with that username");
          }

          // Compare the password
          const isValid = await user.comparePassword(credentials.password);

          if (!isValid) {
            throw new Error("Incorrect password");
          }

          // If the user is found and password is valid, return user data
          return {
            id: user._id.toString(),
            name: user.username,
            email: user.email,
          };
        } catch (error) {
          console.error("Authentication error:", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: "/login", // Redirect to your login page on sign-in
    error: "/login",  // Redirect to your login page on error
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;  // Add user id to the JWT token
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;  // Add the user id to the session
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET, // Secret for JWT encryption
  debug: process.env.NODE_ENV === "development", // Enable debug logging in dev mode
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
