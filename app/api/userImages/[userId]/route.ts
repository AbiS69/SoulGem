// app/api/userImages/[userId].ts
import { NextRequest, NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';
import connectMongo from '@/libs/mongoose';
import User from "@/models/User";

export interface Image {
	url: string;
	createdAt: Date;
	format: string;
  }
  
  export interface User {
	_id: string;
	name: string;
	email: string;
	image: string;
	customerId: string;
	priceId: string;
	hasAccess: boolean;
	credits: number;
	images: Image[];
	createdAt: Date;
	updatedAt: Date;
  }
  


export async function GET(
	request: NextRequest,
	{ params }: { params: { userId: string } }
) {
	const { userId } = params;


	if (!userId) {
		return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
	}

	let objectId;
	try {
		objectId = new ObjectId(userId);
	} catch (error) {
		console.error('Invalid userId:', error);
		return NextResponse.json(
			{ error: 'Invalid user ID format' },
			{ status: 400 }
		);
	}

	try {
		await connectMongo();

		const user: User = await User.findById(userId).lean();
		if (!user) {
			return NextResponse.json({ error: 'User not found' }, { status: 404 });
		}

		const images = user.images || [];
		return NextResponse.json({ images });
	} catch (error) {
		console.error('Failed to connect to MongoDB or fetch user:', error);
		return NextResponse.json(
			{ error: 'Failed to fetch user images' },
			{ status: 500 }
		);
	}
}
