import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  username: { type: String, required: true },
  thought: { type: String },
  feeling: { type: String },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Post = mongoose.models.Post || mongoose.model("Post", postSchema);
export default Post;
