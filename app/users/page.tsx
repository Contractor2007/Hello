'use client';

import Link from "next/link";
import React, { useEffect, useState } from "react";

type UsersType = {
  _id: string;
  username: string;
  email: string;
  bio?: string;
  location?: string;
  interests?: string[];
  createdAt: string;
  updatedAt: string;
};

const Page = () => {
  const [users, setUsers] = useState<UsersType[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/users");
        const data = await res.json();
        if (data.success) {
          setUsers(data.users);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("Error fetching users:", err);
        setError(true);
      }
    };

    fetchUsers();
  }, []);

  if (error) return <div className="flex items-center justify-center h-screen">Failed to load users.</div>;
  if (!users) return <div className="flex items-center justify-center h-screen">Loading...</div>;

  return (
    <div className="relative h-screen w-full flex flex-col">

      {/* Scrollable Content Area */}
      <div className="flex-1 pt-16 pb-16 overflow-y-auto scroll-hidden">
        <div className="flex flex-col p-4 max-w-xl mx-auto">
          <div className="mb-6">
            <h4 className="text-lg font-semibold">User Directory</h4>
            <p className="text-gray-600">Browse all registered users</p>
          </div>

          <div className="space-y-2">
            {users.map((user, index) => (
              <Link
                href={`/users/${user._id}`}
                key={user._id || index}
                className="block p-3 hover:bg-gray-100 rounded transition-colors"
              >
                <span className="font-medium">
                  {user.username || `User ${index + 1}`}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Optional: hide scrollbars */}
      <style jsx global>{`
        .scroll-hidden {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .scroll-hidden::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default Page;
