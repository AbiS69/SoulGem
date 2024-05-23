import { NextRequest, NextResponse } from 'next/server';
import { MongoClient, GridFSBucket, ObjectId } from 'mongodb';


export async function GET(req: NextRequest) {

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
        return NextResponse.json({ message: 'ID is required' }, { status: 400 });
    }

    try {
        const client = await MongoClient.connect(process.env.MONGODB_URI);

        const db = client.db("SoulGem");
        const bucket = new GridFSBucket(db, { bucketName: "images" });

        const downloadStream = bucket.openDownloadStream(new ObjectId(id));

        const headers = new Headers();
        headers.set('Content-Type', 'image/jpeg'); // Adjust content type if necessary

        const readableStream = new ReadableStream({
            start(controller) {
                downloadStream.on('data', (chunk) => {
                    controller.enqueue(chunk);
                });

                downloadStream.on('end', () => {
                    controller.close();
                    client.close();
                });

                downloadStream.on('error', (err) => {
                    console.error('Error downloading image:', err);
                    controller.error(err);
                    client.close();
                });
            }
        });

        return new NextResponse(readableStream, { headers });

    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
        return NextResponse.json({ message: 'Failed to retrieve image' }, { status: 500 });
    }
}
