import Footer from "@/components/auth/Footer";
import Header from "@/components/auth/Header";
import connectDB from "@/lib/db";
import Post from "@/lib/model/Post";
import { PostType } from "@/lib/types/Post"; 
import React from "react";

const Page = async () => {
  try {
    await connectDB();

    // ✅ Fetch and reverse posts to show latest first
    const posts = (await Post.find().lean()).reverse() as unknown as PostType[];

    return (
      <div className="relative h-screen w-full flex flex-col">
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
              <h4 className="text-lg font-semibold">Recent Posts</h4>
              <p className="text-gray-600">See what&apos;s on the minds of others</p>
            </div>

            {/* ✅ Mapping posts from latest to oldest */}
            <div className="space-y-4">
              {posts.map((post, index) => (
                <div
                  key={post._id?.toString() || index}
                  className="p-4 border border-gray-300 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer"
                >
                  <h4 className="text-lg font-semibold">{post.username || `User ${index + 1}`}</h4>
                  <p className="text-gray-600 text-sm mb-1">
                    <span className="font-medium">Thought:</span> {post.thought || "No thought provided"}
                  </p>
                  <p className="text-gray-600 text-sm mb-1">
                    <span className="font-medium">Feeling:</span> {post.feeling || "No feeling provided"}
                  </p>
                  <p className="text-gray-600 text-sm mb-1">
                    <span className="font-medium">Post Content:</span> {post.content || "No content"}
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
    console.error("❌ Error loading posts:", error);
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <p className="text-red-600">Failed to load posts.</p>
      </div>
    );
  }
};

export default Page;
