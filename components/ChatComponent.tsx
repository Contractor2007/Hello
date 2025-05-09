// components/ChatComponent.tsx
'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import { User, Message } from '@/types';
import { fetchMessages, sendMessage } from '@/services/api';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

interface ChatComponentProps {
  currentUser: User;
  chatId: string;
}

export default function ChatComponent({ currentUser, chatId }: ChatComponentProps) {
  const queryClient = useQueryClient();
  const [newMessage, setNewMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Fetch messages for the current chat
  const {
    data: messages = [],
    isLoading,
    isError,
  } = useQuery<Message[]>({
    queryKey: ['messages', chatId],
    queryFn: () => fetchMessages(chatId),
  });

  // Mutation for sending a new message
  const { mutate: sendNewMessage } = useMutation({
    mutationFn: (content: string) => sendMessage(chatId, currentUser.id, content),
    onSuccess: (newMessage) => {
      queryClient.setQueryData<Message[]>(['messages', chatId], (old) => [
        ...(old || []),
        newMessage,
      ]);
      setNewMessage('');
      setShowEmojiPicker(false);
    },
  });

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;
    sendNewMessage(newMessage);
  };

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    setNewMessage((prev) => prev + emojiData.emoji);
  };

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (isLoading) return <div className="p-4">Loading messages...</div>;
  if (isError) return <div className="p-4 text-red-500">Error loading messages</div>;

  return (
    <div className="flex flex-col h-screen">
      {/* Chat header with back button */}
      <div className="bg-gray-100 p-3 border-b flex items-center">
        <Link href="/app/chats" className="mr-3 text-gray-600 hover:text-gray-900">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
        </Link>
        <h3 className="font-semibold">Chat</h3>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex mb-4 ${
              message.sender.id === currentUser.id ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message.sender.id === currentUser.id
                  ? 'bg-blue-500 text-white rounded-tr-none'
                  : 'bg-gray-200 text-gray-800 rounded-tl-none'
              }`}
            >
              {message.sender.id !== currentUser.id && (
                <p className="text-xs font-semibold">
                  {message.sender.name || message.sender.email}
                </p>
              )}
              <p>{message.content}</p>
              <p
                className={`text-xs mt-1 ${
                  message.sender.id === currentUser.id
                    ? 'text-blue-100'
                    : 'text-gray-500'
                }`}
              >
                {new Date(message.createdAt).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message input */}
      <div className="bg-gray-100 p-3 border-t relative">
        {showEmojiPicker && (
          <div className="absolute bottom-16 left-0">
            <EmojiPicker
              onEmojiClick={handleEmojiClick}
              width="100%"
              height={350}
            />
          </div>
        )}
        <div className="flex items-center">
          <button
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className="mr-2 text-gray-500 hover:text-gray-700 focus:outline-none"
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
                d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type a message"
            className="flex-1 border rounded-full py-2 px-4 focus:outline-none"
          />
          <button
            onClick={handleSendMessage}
            className="ml-2 bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}