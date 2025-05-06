// /lib/types/User.ts

export interface UserType {
    _id: string; // MongoDB ObjectId as string
    username: string;
    email: string;
    bio?: string; // Optional field
    location?: string; // Optional field
    interests?: string[]; // Optional array of interests
    createdAt: Date; // Timestamp of user creation
    updatedAt: Date; // Timestamp of last update
  }
  