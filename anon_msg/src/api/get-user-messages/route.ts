/*
 * GET /api/get-user-messages
 * Retrieves all messages for the authenticated user.
 *
 * Logic:
 * 1. Connect to the database.
 * 2. Ensure the request is authenticated via NextAuth session.
 * 3. Use an aggregation pipeline to pull, unwind, sort, and regroup the user's messages.
 *    - Each stage is documented inline to clarify its purpose.
 * 4. Validate each message with our existing Zod schema to ensure content integrity.
 * 5. Return the validated messages in the standard ApiResponse shape.
 */

import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User.model";
import { messageSchema } from "@/schemas/messageSchema";
import { ApiResponse } from "@/types/ApiResponse";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/option";
import { Types, PipelineStage } from "mongoose";
import { User } from "next-auth";

export async function GET() {
	await dbConnect();

	const session = await getServerSession(authOptions);
	const user = session?.user as User | undefined;

	if (!session || !user?._id) {
		const res: ApiResponse = {
			success: false,
			message: "Not Authenticated",
		};
		return Response.json(res, { status: 401 });
	}

	try {
		const userId = new Types.ObjectId(user._id as string);

		const pipeline: PipelineStage[] = [
			// Match the current authenticated user by _id to scope the aggregation.
			{ $match: { _id: userId } },
			// we can unwind the message in the user document into multiple documents which look like this { _id: userId, messages: singleMessage }
            // Unwind the messages array to deconstruct it into individual message documents.		
			{ $unwind: "$messages"},
			// Sort messages by createdAt descending so latest messages appear first.
			{ $sort: { "messages.createdAt": -1 } },
			// Group back into a single document, re-aggregating messages into an array in sorted order. the final 
			{ $group: { _id: "$_id", messages: { $push: "$messages" } } },
		];

		const aggregationResult = await UserModel.aggregate(pipeline);
		const messages = aggregationResult?.[0]?.messages ?? [];

		// Validate each message content with our Zod schema to enforce consistency.
		const validatedMessages = messages.filter((message: { content?: string; createdAt?: Date }) => {

			if (!message?.content) {
				return false;
			}
			const parsed = messageSchema.safeParse({ content: message.content });
			return parsed.success;
		});

		const response: ApiResponse = {
			success: true,
			message: "Messages fetched successfully",
			messages: validatedMessages,
		};

		return Response.json(response, { status: 200 });
	} catch (error) {
		console.error("Error fetching user messages", error);
		const res: ApiResponse = {
			success: false,
			message: "Error fetching user messages",
		};
		return Response.json(res, { status: 500 });
	}
}

