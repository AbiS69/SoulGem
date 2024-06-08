// app/api/upload/route.ts
import { NextRequest, NextResponse } from 'next/server';
import formidable from 'formidable';
import fs from 'fs';
import bucket from '../../lib/googleCloudStorage';
import { MongoClient } from 'mongodb';
import { v4 as uuidv4 } from 'uuid';
import connectMongo from '@/libs/mongoose';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export const config = {
  api: {
    bodyParser: false,
  },
};

async function parseForm(req: NextRequest): Promise<{ fields: formidable.Fields; files: formidable.Files }> {
  return new Promise((resolve, reject) => {
    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
      if (err) {
        reject(err);
      } else {
        resolve({ fields, files });
      }
    });
  });
}

export async function POST(req: NextRequest) {
  try {
    const { fields, files } = await parseForm(req);
    const { filepath, mimetype, originalFilename } = files.file;
    const fileName = `${uuidv4()}-${originalFilename}`;
    const blob = bucket.file(fileName);

    const blobStream = blob.createWriteStream({
      resumable: false,
      contentType: mimetype,
      predefinedAcl: 'publicRead',
    });

    return new Promise((resolve, reject) => {
      blobStream.on('error', (error) => {
        console.error('Blob stream error:', error);
        reject(NextResponse.json({ error: 'Failed to upload file' }, { status: 500 }));
      });

      blobStream.on('finish', async () => {
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;

        await connectMongo();
        
        const db = client.db('your-database-name');
        const collection = db.collection('images');
        const result = await collection.insertOne({
          url: publicUrl,
          createdAt: new Date(),
        });

        resolve(NextResponse.json({ url: publicUrl, id: result.insertedId }));
      });

      fs.createReadStream(filepath).pipe(blobStream);
    });
  } catch (error) {
    console.error('Error uploading image:', error);
    return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 });
  }
}
