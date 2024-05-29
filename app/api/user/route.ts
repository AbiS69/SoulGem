import { MongoClient, ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";

export async function GET(req: NextRequest, res: NextApiResponse) {
	const searchParams = req.nextUrl.searchParams;
	const userId = searchParams.get("userId");
	console.log("Received userId:", userId);
	const client = new MongoClient(process.env.MONGODB_URI);
	await client.connect();
	const database = client.db(process.env.MONGODB_DB);
	const users = database.collection("users");
	// const user = await users.findOne({ id: userId });
	const user = await users.findOne({ _id: new ObjectId(userId) });
	return NextResponse.json(user);
}
