/*
 * DELETE /api/delete-user-message
 * Deletes a specific message from the authenticated user's messages array.
 *
 * Logic:
 * 1. Connect to the database.
 * 2. Ensure the request is authenticated via NextAuth session.
 * 3. Parse the messageId from the request body.
 * 4. Use MongoDB's $pull operator to remove the message from the user's messages array.
 * 5. Return a standard ApiResponse with success or error.
 */

import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/option";
import { User } from "next-auth";
import { ApiResponse } from "@/types/ApiResponse";
import UserModel from "@/model/User.model";
import { Types } from "mongoose";

export async function DELETE(request: Request) {
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
        const { messageId } = await request.json();

        // Validate messageId
        if (!messageId) {
            const res: ApiResponse = {
                success: false,
                message: "Message ID is required",
            };
            return Response.json(res, { status: 400 });
        }

        // Validate if messageId is a valid ObjectId
        if (!Types.ObjectId.isValid(messageId)) {
            const res: ApiResponse = {
                success: false,
                message: "Invalid Message ID format",
            };
            return Response.json(res, { status: 400 });
        }

        const userId = new Types.ObjectId(user._id as string);

        // Use $pull to remove the message from the user's messages array
        const updatedUser = await UserModel.updateOne(
            { _id: userId },
            { $pull: { messages: { _id: new Types.ObjectId(messageId) } } }
        );

        // Check if any document was modified
        if (updatedUser.modifiedCount === 0) {
            const res: ApiResponse = {
                success: false,
                message: "Message not found or already deleted",
            };
            return Response.json(res, { status: 404 });
        }

        const res: ApiResponse = {
            success: true,
            message: "Message deleted successfully",
        };
        return Response.json(res, { status: 200 });

    } catch (error) {
        console.error("Error deleting user message", error);
        const res: ApiResponse = {
            success: false,
            message: "Error deleting user message",
        };
        return Response.json(res, { status: 500 });
    }
}
