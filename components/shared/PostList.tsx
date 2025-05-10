'use client';

import { useEffect, useState } from 'react';

type PostType = {
  _id: string;
  username: string;
  thought?: string;
  feeling?: string;
  content: string;
  createdAt: string;
};

export default function PostList() {
  const [posts, setPosts] = useState<PostType[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/Post');
        const data = await res.json();
        if (data.success) {
          setPosts(data.posts);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError(true);
      }
    };

    fetchPosts();
  }, []);

  if (error) return <div className='flex items-center justify-center '>Failed to load posts.</div>;
  if (!posts) return <div className='flex items-center justify-center'>Loading...</div>;

  return (
    <div className="space-y-4">
      {posts.map((post, index) => (
        <div
          key={post._id || index}
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
  );
}
