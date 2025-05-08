import Footer from "@/components/auth/Footer";
import Header from "@/components/auth/Header";
import NoFetch from "@/components/shared/Error";
import connectDB from "@/lib/db";
import User from "@/lib/model/schema";
import { UserType } from "@/lib/types/User";
import Link from "next/link";
import React from "react";

const Page = async () => {
  try {
    await connectDB();
    const users = await User.find().lean() as unknown as UserType[];

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
              <h4 className="text-lg font-semibold">User Directory</h4>
              <p className="text-gray-600">Browse all registered users</p>
            </div>

            {/* Simple username list */}
            <div className="space-y-2">
              {users.map((user, index) => (
                <Link
                  href={`/users/${user._id}`}
                  key={user._id?.toString() || index}
                  className="block p-3 hover:bg-gray-100 rounded transition-colors"
                >
                  <span className="font-medium">{user.username || `User ${index + 1}`}</span>
                </Link>
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
    return(
      <div className="">
        <Header />
        <NoFetch />
        <Footer />
      </div>
    );
  }
};

export default Page;