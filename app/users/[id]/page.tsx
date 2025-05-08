import connectDB from '@/lib/db';
import User from '@/lib/model/schema';
import Header from '@/components/auth/Header';
import Footer from '@/components/auth/Footer';
import React from 'react';

export default async function UserDetailsPage({ params }) {
  await connectDB();

  const user = await User.findById(params.id).select('-password').lean();

  if (!user) {
    return <div className="text-center text-red-500 mt-20">User not found.</div>;
  }

  const userData = {
    ...user,
    _id: user._id.toString(),
    createdAt: user.createdAt?.toString(),
    updatedAt: user.updatedAt?.toString(),
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-10">
        <Header />
      </div>

      {/* Scrollable Content Area */}
      <div className="flex-1 pt-16 pb-16 overflow-y-auto px-4 max-w-2xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">{userData.username}</h1>
          <p className="text-gray-600 text-sm">Member since {new Date(userData.createdAt).toLocaleDateString()}</p>
        </div>

        <div className="space-y-4 rounded-lg p-4 bg-white ">
          {userData.email && (
            <p className="text-gray-700">
              <span className="font-semibold">Email:</span> {userData.email}
            </p>
          )}

          {userData.description && (
            <p className="text-gray-700">
              <span className="font-semibold">Description:</span> {userData.description}
            </p>
          )}

          {userData.bio && (
            <p className="text-gray-700">
              <span className="font-semibold">Bio:</span> {userData.bio}
            </p>
          )}

          {userData.location && (
            <p className="text-gray-700">
              <span className="font-semibold">Location:</span> {userData.location}
            </p>
          )}

          {userData.interests?.length > 0 && (
            <div className="text-gray-700">
              <span className="font-semibold">Interests:</span>{' '}
              <span>{userData.interests.join(', ')}</span>
            </div>
          )}

          <p className="text-gray-500 text-xs mt-2">
            <span className="font-semibold">Last Updated:</span>{' '}
            {new Date(userData.updatedAt).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="fixed bottom-0 left-0 right-0 z-10">
        <Footer />
      </div>
    </div>
  );
}
