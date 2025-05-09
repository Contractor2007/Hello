// app/users/[id]/UserDetails.tsx
'use client'

import { useEffect, useState } from 'react';
import Header from '@/components/auth/Header';
import Footer from '@/components/auth/Footer';

type UsersDataType = {
  _id: string;
  username: string;
  email: string;
  bio?: string;
  location?: string;
  interests?: string[];
  createdAt: string;
  updatedAt: string;
};

export default function UserDetails({ userId }: { userId: string }) {
  const [userData, setUserData] = useState<UsersDataType | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/users/${userId}`);
        const data = await res.json();
        if (data.success) {
          setUserData(data.user);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("Error:", err);
        setError(true);
      }
    };

    fetchUser();
  }, [userId]);

  if (error || !userData) {
    return <div className="flex items-center justify-center h-screen">Failed to load user.</div>;
  }

  return (
    <div className="relative min-h-screen w-full flex flex-col">
      <div className="fixed top-0 left-0 right-0 z-10">
        <Header />
      </div>
      <div className="flex-1 pt-16 pb-16 overflow-y-auto px-4 max-w-2xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">{userData.username}</h1>
          <p className="text-gray-600 text-sm">
            Member since {new Date(userData.createdAt).toLocaleDateString()}
          </p>
        </div>
        <div className="space-y-4 rounded-lg p-4 bg-white">
          <p><strong>Email:</strong> {userData.email}</p>
          {userData.bio && <p><strong>Bio:</strong> {userData.bio}</p>}
          {userData.location && <p><strong>Location:</strong> {userData.location}</p>}
          {userData.interests?.length > 0 && (
            <p><strong>Interests:</strong> {userData.interests.join(', ')}</p>
          )}
          <p className="text-xs text-gray-500">
            Last updated: {new Date(userData.updatedAt).toLocaleString()}
          </p>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 z-10">
        <Footer />
      </div>
    </div>
  );
}
