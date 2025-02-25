import { NextResponse } from "next/server";
import { Db, MongoClient } from "mongodb";
import * as dotenv from 'dotenv'

dotenv.config()

// MongoDB connection setup
const MONGO_URI = process.env.MONGODB_URI;
const client = new MongoClient(MONGO_URI!);
let db: Db | undefined;

// Ensure DB connection is established
async function connectDB() {
  if (!db) {
    await client.connect();
    db = client.db('permit2DB');
    console.log('Connected to MongoDB');
  }
  return db;
}

export async function POST(req: Request) {
  try {
    const { permitBatch, signature, owner } = await req.json();
    if (!permitBatch || !signature || !owner) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const database = await connectDB();
    const permitsCollection = database.collection('permits');
    await permitsCollection.insertOne({
      owner,
      permitBatch,
      signature,
      createdAt: new Date(),
      submitted: false,
      submittedAt: null,
      executed: false,
      executedAt: null,
      reason: null
    });

    return NextResponse.json({ message: "Permit stored to db successfully" }, { status: 200 });
  } catch (error) {
    console.error('Failed to store permit:', error);
    return NextResponse.json(
      { message: "Failed to store permit", error: (error as Error).message },
      { status: 500 }
    );
  }
}

// Optional: Ensure client closes on process exit (not required for Next.js API routes typically)
process.on('SIGINT', async () => {
  await client.close();
  process.exit(0);
});