import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Post from '@/lib/model/Post';

export async function GET() {
  try {
    await connectDB();
    const posts = await Post.find().lean();
    return NextResponse.json({ success: true, posts: posts.reverse() });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch posts' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const { username, userId, thought, feeling, content } = body;

    if (!username || !userId || !content) {
      return NextResponse.json(
        { success: false, error: 'Username, userId, and content are required' },
        { status: 400 }
      );
    }

    const newPost = new Post({ username, userId, thought, feeling, content });
    await newPost.save();

    return NextResponse.json({ success: true, post: newPost });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json({ success: false, error: 'Failed to create post' }, { status: 500 });
  }
}
