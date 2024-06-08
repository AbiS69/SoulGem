import connectMongo from '@/libs/mongoose';
import { connect } from 'http2';
import { MongoClient, ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";
import User from "@/models/User";

export async function GET(req: NextRequest, res: NextApiResponse) {
	const searchParams = req.nextUrl.searchParams;
	const userId = searchParams.get("userId");
	console.log("Received userId:", userId);
	// const client = new MongoClient(process.env.MONGODB_URI);
	await connectMongo();
	// const database = client.db(process.env.MONGODB_DB);
	// const users = database.collection("users");
	// const user = await users.findOne({ id: userId });
	// const user = await users.findOne({ _id: new ObjectId(userId) });
	const user = await User.findById(userId);
	return NextResponse.json(user);
}
