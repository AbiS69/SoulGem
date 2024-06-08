import { NextResponse, NextRequest } from "next/server";
import { headers } from "next/headers";
import connectMongo from "@/libs/mongoose";
import configFile from "@/config";
import User from "@/models/User";
import { ObjectId } from "mongodb";

export async function POST(req: NextRequest) {
	await connectMongo();
	const { userId, creditsToSubstract } = await req.json();

	// Fetch the user from the database
	// const user = await User.findOne({ _id: new ObjectId(userId) });
	
	const user = await User.findById(userId);

	// Check if user exists
	if (!user) {
		return new Response("User not found", { status: 404 });
	}

	// Subtract credits and save the user
	user.credits -= creditsToSubstract;
	await user.save();

	return new Response(JSON.stringify({ message: "Credits updated successfully", credits: user.credits }), { status: 200, headers: { "Content-Type": "application/json" } });
}
