// /lib/model/Post.ts
import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema(
  {
    username: String,
    userId: String,
    thought: String,
    feeling: String,
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Post || mongoose.model('Post', PostSchema);
