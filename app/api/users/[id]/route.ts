// app/api/users/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import connectDB from '@/lib/db';
import User from '@/lib/model/User';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const userId = params.id;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json({ success: false, error: 'Invalid ID' }, { status: 400 });
    }

    const user = await User.findById(userId).lean();

    if (!user) {
      return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
    }

    user._id = user._id.toString();

    return NextResponse.json({ success: true, user }, { status: 200 });
  } catch (error) {
    console.error('Error in GET:', error);
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}
