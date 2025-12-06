/*
 * POST /api/send-user-messages
 * Allows sending a message to a user.
 *
 * Logic:
 * 1. Connect to the database.
 * 2. Require sender to be authenticated and verified.
 * 3. Parse and validate the request body using Zod (messageSchema).
 * 4. Find the target user by username or email.
 * 5. Check if the user is accepting messages.
 * 6. If not accepting, return a 403 error.
 * 7. If accepting, push the new message to the user's messages array.
 * 8. Return a standard ApiResponse with success or error.
 */

import dbConnect from "@/lib/dbConnect";
import UserModel,  {Message } from "@/model/User.model";
import { ApiResponse } from "@/types/ApiResponse";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/option";
import { User } from "next-auth";

export async function POST(request: Request) {
  await dbConnect();

  // Require sender to be authenticated and verified
  const session = await getServerSession(authOptions);
  const sender = session?.user as User | undefined;
  if (!session || !sender?._id) {
    const res: ApiResponse = {
      success: false,
      message: "Not Authenticated",
    };
    return Response.json(res, { status: 401 });
  }
  if (!sender.isVerified) {
    const res: ApiResponse = {
      success: false,
      message: "User is not verified",
    };
    return Response.json(res, { status: 403 });
  }

  try {
    const  { username, content  }  = await request.json();
   
    // Find the target user by username or email
    const user = await UserModel.findOne({ username 
    });

    if (!user) {
      const res: ApiResponse = {
        success: false,
        message: "User not found",
      };
      return Response.json(res, { status: 404 });
    }

    // Check if user is accepting messages
    if (!user.isAcceptingMessages) {
      const res: ApiResponse = {
        success: false,
        message: "User is not accepting messages",
      };
      return Response.json(res, { status: 403 });
    }

    // Add the message
    const newMessage = { content : content, createdAt: new Date() };
    user.messages.push(newMessage as Message );
    await user.save();

    const res: ApiResponse = {
      success: true,
      message: "Message sent successfully",
    };
    return Response.json(res, { status: 201 });
  } catch (error) {
    console.error("Error sending message", error);
    const res: ApiResponse = {
      success: false,
      message: "Error sending message",
    };
    return Response.json(res, { status: 500 });
  }
}
