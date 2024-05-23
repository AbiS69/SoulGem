// app/api/generateImage/route.js
import { NextRequest, NextResponse } from 'next/server';
import { Storage } from '@google-cloud/storage';
import { MongoClient, ObjectId } from 'mongodb';
import { v4 as uuidv4 } from 'uuid';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);
const storage = new Storage({
  projectId: process.env.GCP_PROJECT_ID,
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
});
const bucket = storage.bucket(process.env.GCS_BUCKET_NAME);

export async function POST(request: NextRequest) {
  const { prompt, size, definition, userId } = await request.json();

  console.log('Received userId:', userId);

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
    const response = await fetch(
      "https://api.openai.com/v1/images/generations",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "dall-e-3",
          prompt: prompt,
          n: 1,
          size: size,
          quality: definition,
          response_format: "b64_json",
        }),
      }
    );

    if (!response.ok) {
      console.error(await response.text());
      throw new Error("Failed to generate image");
    }

    const data = await response.json();
    const imageB64Json = data.data[0].b64_json;
    const revisedPrompt = data.data[0].revised_prompt;
    console.log("Revised prompt:", revisedPrompt);

    // Convert b64_json to Buffer
    const imageBuffer = Buffer.from(imageB64Json, "base64");
    const fileName = `${uuidv4()}.jpg`;  // Generates a unique filename with .jpg extension
    const blob = bucket.file(fileName);

    const blobStream = blob.createWriteStream({
      resumable: false,
      contentType: 'image/jpeg',
    });

    return new Promise((resolve, reject) => {
      blobStream.on('error', (error) => {
        console.error('Blob stream error:', error);
        reject(NextResponse.json({ error: 'Failed to upload file' }, { status: 500 }));
      });

      blobStream.on('finish', async () => {
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;

        // Connect to MongoDB and update the user document
        try {
          await client.connect();
          const db = client.db(process.env.MONGODB_DB);
          const users = db.collection('users');

          // Check if user exists
          console.log("ObjectId:", objectId);
	        const user = await users.findOne({ _id: objectId });

          if (!user) {
            console.error('User not found with ID:', userId);
            throw new Error('User not found');
          }

          console.log('User found:', user);

          // Update the user's document
          const result = await users.updateOne(
            { _id: objectId },
            { $push: { images: { url: publicUrl, createdAt: new Date() } } }
          );

          if (result.matchedCount === 0) {
            console.error('Failed to update user with ID:', userId);
            throw new Error('Failed to update user');
          }

          resolve(NextResponse.json({
            success: true,
            imageUrl: publicUrl,
          }));
        } catch (error) {
          console.error("Failed to connect to MongoDB or update user:", error);
          reject(NextResponse.json({ error: error.message }, { status: 500 }));
        }
      });

      blobStream.end(imageBuffer);
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to generate image" },
      { status: 500 }
    );
  }
}
