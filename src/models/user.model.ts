import { db } from "../utils/connectDB.ts";
import { ObjectId } from "../deps.ts";

export interface UserSchema {
  _id?: ObjectId;
  name: string;
  email: string;
  password: string;
  avatar: string;
  created_at: Date;
  // online: boolean;
}

export const UserCollection = db.collection<UserSchema>("users");
