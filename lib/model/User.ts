import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";

export interface UserDocument extends Document {
  username: string;
  email: string;
  password: string;
  description: string;
  bio: string;
  location: string;
  interests: string[];
  chats?: mongoose.Types.ObjectId[] | ChatDocument[];
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<UserDocument>(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    description: { type: String, default: "" },
    bio: { type: String, default: "" },
    location: { type: String, default: "" },
    interests: { type: [String], default: [] },
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Password comparison method
userSchema.methods.comparePassword = function (candidatePassword: string) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.models.User || mongoose.model<UserDocument>("User", userSchema);
export default User;