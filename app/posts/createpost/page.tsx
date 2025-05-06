'use client';

import Footer from "@/components/auth/Footer";
import Header from "@/components/auth/Header";
import { Smile, MessageSquare, Type } from "lucide-react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const CreatePostPage = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    username: "",
    thought: "",
    feeling: "",
    content: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setFormData({ username: "", thought: "", feeling: "", content: "" });
        router.push("/posts"); // Redirect to /posts
      } else {
        const error = await res.json();
        alert(error.error || "Failed to share post.");
      }
    } catch (err: any) {
      alert("An error occurred: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative h-screen w-full flex flex-col">
      <div className="fixed top-0 left-0 right-0 z-10 h-16">
        <Header />
      </div>

      <div className="flex-1 pt-16 pb-16 overflow-y-auto" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
        <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800">Create Your Post</h2>
              <p className="text-gray-500 mt-2">Share your thoughts with the community</p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <input
                type="text"
                name="username"
                placeholder="Your username"
                value={formData.username}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <MessageSquare className="h-4 w-4 text-blue-500" />
                  Thought
                </label>
                <input
                  type="text"
                  name="thought"
                  placeholder="What's on your mind?"
                  value={formData.thought}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <Smile className="h-4 w-4 text-yellow-500" />
                  Feeling
                </label>
                <input
                  type="text"
                  name="feeling"
                  placeholder="How are you feeling?"
                  value={formData.feeling}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <Type className="h-4 w-4 text-green-500" />
                  Post Content
                </label>
                <textarea
                  name="content"
                  rows={4}
                  placeholder="Share a quote, motivation, or anything..."
                  value={formData.content}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
              >
                {loading ? "Sharing..." : "Share Post"}
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-10 h-16">
        <Footer />
      </div>

      <style jsx global>{`
        ::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default CreatePostPage;
