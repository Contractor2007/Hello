import Footer from "@/components/auth/Footer";
import Header from "@/components/auth/Header";
import connectDB from "@/lib/db";
import User from "@/lib/model/schema";
import { UserType } from "@/lib/types/User"; // Import UserType
import React from "react";

const Page = async () => {
  try {
    await connectDB(); // Connect to MongoDB
    const users = await User.find().lean() as unknown as UserType[]; // Cast to unknown, then to UserType[]

    return (
      <div className="relative h-screen w-full flex flex-col">
        {/* Fixed Header */}
        <div className="fixed top-0 left-0 right-0 z-10">
          <Header />
        </div>

        {/* Scrollable Content Area */}
        <div
          className="flex-1 pt-16 pb-16 overflow-y-auto"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <div className="flex flex-col p-4">
            <div className="mb-6">
              <h4 className="text-lg font-semibold">Username of signed in user</h4>
              <p className="text-gray-600">Description of signed in user</p>
            </div>

            <div className="space-y-4">
              {users.map((user, index) => (
                <div
                  key={user._id?.toString() || index}
                  className="p-4 border border-gray-300 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer"
                >
                  <h4 className="text-lg font-semibold">{user.username || `User ${index + 1}`}</h4>
                  <p className="text-gray-600 text-sm mb-1">
                    <span className="font-medium">Email:</span> {user.email || "N/A"}
                  </p>
                  <p className="text-gray-600 text-sm mb-1">
                    <span className="font-medium">Bio:</span> {user.bio || "No bio"}
                  </p>
                  <p className="text-gray-600 text-sm mb-1">
                    <span className="font-medium">Location:</span> {user.location || "Unknown"}
                  </p>
                  <p className="text-gray-600 text-sm">
                    <span className="font-medium">Interests:</span>{" "}
                    {user.interests?.length ? user.interests.join(", ") : "None listed"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Fixed Footer */}
        <div className="fixed bottom-0 left-0 right-0 z-10">
          <Footer />
        </div>
      </div>
    );
  } catch (error) {
    console.error("❌ Error loading users:", error);
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <p className="text-red-600">Failed to load users.</p>
      </div>
    );
  }
};

export default Page;
