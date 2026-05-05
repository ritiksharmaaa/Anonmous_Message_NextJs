import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User.model";
import { ApiResponse } from "@/types/ApiResponse";
import { z } from "zod";

const querySchema = z.object({
  q: z.string().optional(),
});

export async function GET(request: Request) {
  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);
    const parsed = querySchema.safeParse({ q: searchParams.get("q") || undefined });

    if (!parsed.success) {
      return Response.json(
        { success: false, message: "Invalid query" } as ApiResponse,
        { status: 400 }
      );
    }

    const search = parsed.data.q?.trim();
    const match: Record<string, unknown> = { isVerified: true };

    if (search) {
      match.$or = [
        { username: { $regex: search, $options: "i" } },
      ];
    }

    const users = await UserModel.aggregate([
      { $match: match },
      {
        $project: {
          username: 1,
          isAcceptingMessages: 1,
          lastMessage: { $arrayElemAt: ["$messages", -1] },
        },
      },
      { $sort: { "lastMessage.createdAt": -1 } },
      { $limit: 50 },
    ]);

    const channels = users.map((user: { username: string; lastMessage?: { content?: string; createdAt?: Date } }) => ({
      username: user.username,
      displayName: user.username,
      lastMessage: user.lastMessage?.content || "Say hi anonymously!",
      timestamp: user.lastMessage?.createdAt ? new Date(user.lastMessage.createdAt).toLocaleDateString() : "New",
      avatar: "",
      unread: 0,
    }));

    return Response.json(
      { success: true, data: { channels } } as ApiResponse,
      { status: 200 }
    );
  } catch (error) {
    console.error("Discover channels error", error);
    return Response.json(
      { success: false, message: "Failed to load channels" } as ApiResponse,
      { status: 500 }
    );
  }
}
