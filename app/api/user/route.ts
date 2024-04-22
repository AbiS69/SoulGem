import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { type NextRequest } from 'next/server'

export async function GET(req: NextRequest, res: NextApiResponse) {
	const searchParams = req.nextUrl.searchParams;
	const userId = searchParams.get("user");
	const client = new MongoClient(process.env.MONGODB_URI);
	await client.connect();
	const database = client.db(process.env.MONGODB_DB);
	const users = database.collection("users");
	const user = await users.findOne({ id: userId });
	await client.close();
  return NextResponse.json(user);
}
