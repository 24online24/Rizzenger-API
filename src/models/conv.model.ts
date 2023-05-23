import { db } from "../utils/connectDB.ts";
import { ObjectId } from "../deps.ts";

export interface ConvSchema {
  id?: ObjectId;
  name: string | null;
  created_at: Date;
  participants: ObjectId[];
  avatar?: string;
}

export const ConvCollection = db.collection<ConvSchema>(
  "conversations",
);
