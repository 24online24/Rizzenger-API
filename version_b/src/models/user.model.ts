import { db } from "../utils/connectDB.ts";
import { ObjectId } from "../deps.ts";

export interface UserSchema {
  id?: ObjectId;
  username: string;
  email: string;
  password: string;
  created_at: Date;
  online: boolean;
}

export const User = db.collection<UserSchema>("users");
