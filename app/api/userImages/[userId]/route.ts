// app/api/userImages/[userId].ts
import { NextRequest, NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export async function GET(request: NextRequest, { params }: { params: { userId: string } }) {
  const { userId } = params;

  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }

  let objectId;
  try {
    objectId = new ObjectId(userId);
  } catch (error) {
    console.error('Invalid userId:', error);
    return NextResponse.json({ error: 'Invalid user ID format' }, { status: 400 });
  }

  try {
    await client.connect();
    const db = client.db(process.env.MONGODB_DB);
    const usersCollection = db.collection('users');

    const user = await usersCollection.findOne({ _id: objectId });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const images = user.images || [];
    return NextResponse.json({ images });
  } catch (error) {
    console.error('Failed to connect to MongoDB or fetch user:', error);
    return NextResponse.json({ error: 'Failed to fetch user images' }, { status: 500 });
  } finally {
    await client.close();
  }
}
