// components/ChatList.tsx
'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { User, Chat } from '@/types';
import { fetchChats, createChat } from '@/services/api';
import { useState } from 'react';

interface ChatListProps {
  currentUser?: User | null;
}

export default function ChatList({ currentUser }: ChatListProps) {
  const queryClient = useQueryClient();
  const [showUserList, setShowUserList] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch chats with consistent pattern
  const {
    data: chats = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['chats', currentUser?._id],
    queryFn: async () => {
      if (!currentUser?._id) return [];
      const res = await fetch(`/api/chats?userId=${currentUser._id}`);
      if (!res.ok) throw new Error('Failed to fetch chats');
      const data = await res.json();
      return data.map((chat: any) => ({
        ...chat,
        _id: chat._id.toString(),
        participants: chat.participants.map((p: any) => ({
          ...p,
          _id: p._id.toString(),
          createdAt: p.createdAt ? new Date(p.createdAt) : null,
          updatedAt: p.updatedAt ? new Date(p.updatedAt) : null
        })),
        createdAt: chat.createdAt ? new Date(chat.createdAt) : null,
        updatedAt: chat.updatedAt ? new Date(chat.updatedAt) : null
      }));
    },
    enabled: !!currentUser?._id
  });

  // Fetch users with consistent pattern
  const { data: users = [] } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await fetch('/api/users');
      if (!res.ok) throw new Error('Failed to fetch users');
      const data = await res.json();
      return data.map((user: any) => ({
        ...user,
        _id: user._id.toString(),
        createdAt: user.createdAt ? new Date(user.createdAt) : null,
        updatedAt: user.updatedAt ? new Date(user.updatedAt) : null
      }));
    },
    enabled: showUserList && !!currentUser?._id
  });

  // Mutation for creating new chat
  const { mutate: startNewChat } = useMutation({
    mutationFn: async (participantId: string) => {
      const res = await fetch('/api/chats', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          participants: [currentUser?._id, participantId]
        }),
      });
      if (!res.ok) throw new Error('Failed to create chat');
      return res.json();
    },
    onSuccess: (newChat) => {
      queryClient.invalidateQueries({ queryKey: ['chats'] });
      setShowUserList(false);
      // Redirect to the new chat
      window.location.href = `/app/chats/${newChat._id}`;
    }
  });

  const getChatName = (chat: Chat) => {
    if (chat.isGroup) return chat.groupName || 'Group Chat';
    const otherUser = chat.participants.find((p) => p._id !== currentUser?._id);
    return otherUser?.displayName || otherUser?.username || 'Unknown';
  };

  const getLastMessagePreview = (chat: Chat) => {
    if (!chat.lastMessage) return 'No messages yet';
    const sender = chat.lastMessage.sender;
    const isYou = sender._id === currentUser?._id;
    return `${isYou ? 'You: ' : ''}${chat.lastMessage.content.substring(0, 30)}${
      chat.lastMessage.content.length > 30 ? '...' : ''
    }`;
  };

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (user.displayName && user.displayName.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (!currentUser) {
    return <div className="p-4 text-red-500">Please sign in to view chats</div>;
  }

  if (isLoading) return <div className="p-4">Loading chats...</div>;
  if (isError) return <div className="p-4 text-red-500">Error loading chats</div>;

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow relative">
      {/* Header with title and new chat button */}
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-xl font-semibold">Chats</h2>
        <button
          onClick={() => setShowUserList(true)}
          className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors"
          aria-label="New chat"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {/* User list modal */}
      {showUserList && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
          <div className="bg-white rounded-lg p-4 w-full max-w-md max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">New Chat</h3>
              <button
                onClick={() => {
                  setShowUserList(false);
                  setSearchTerm('');
                }}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <input
              type="text"
              placeholder="Search users..."
              className="w-full p-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="space-y-2">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <div
                    key={user._id}
                    className="p-3 hover:bg-gray-100 rounded cursor-pointer flex items-center transition-colors"
                    onClick={() => startNewChat(user._id)}
                  >
                    <div className="w-10 h-10 rounded-full bg-gray-300 mr-3 flex items-center justify-center">
                      {(user.displayName || user.username).charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-medium">{user.displayName || user.username}</p>
                      {user.displayName && (
                        <p className="text-sm text-gray-500">@{user.username}</p>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 py-4">
                  {users.length === 0 ? 'No other users found' : 'No matching users'}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Chat list */}
      <div className="divide-y">
        {chats.length > 0 ? (
          chats.map((chat) => (
            <Link
              key={chat._id}
              href={`/chats/${chat._id}`}
              passHref
              legacyBehavior
            >
              <div className="p-4 hover:bg-gray-50 cursor-pointer transition-colors">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gray-300 mr-3 flex items-center justify-center">
                    {getChatName(chat).charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium truncate">{getChatName(chat)}</h3>
                      <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                        {chat.updatedAt?.toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 truncate">
                      {getLastMessagePreview(chat)}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="p-4 text-center text-gray-500">
            No chats found. Start a new conversation!
          </div>
        )}
      </div>
    </div>
  );
}