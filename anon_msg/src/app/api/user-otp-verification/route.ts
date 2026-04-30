/*
 * POST /api/user-otp-verification
 * Verifies a user's email using a 6-digit OTP code.
 *
 * Logic:
 * 1. Connect to the database.
 * 2. Parse `email` and `code` from the request body and validate with Zod.
 * 3. Find the user by email.
 * 4. If no user -> return 400.
 * 5. If user is already verified -> return 200 (or 400 depending on desired behaviour).
 * 6. Check code equality and expiry. If valid, mark user as verified and save.
 * 7. Return appropriate JSON responses using the standard Web `Response` object.
 */

import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User.model";
import { verifySchema } from "@/schemas/verifySchema";
import { z } from "zod";
import { ApiResponse } from "@/types/ApiResponse";

const requestSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    code: verifySchema.shape.code,
});

export async function POST(request: Request) {
    await dbConnect();

    try {
        const body = await request.json();
        const decodedBody = {
            email: decodeURIComponent(body.email),
            code: decodeURIComponent(body.code),
        };
        // attention whenever get the uri data we neeed to pass to decodeURIComponent becuase we have to somtimes handel it manually so we can  get the structure data not the url encoded data 


        const parsed = requestSchema.safeParse(decodedBody);
        if (!parsed.success) {
            return Response.json(
                { success: false, message: parsed.error.issues[0].message } as ApiResponse,
                { status: 400 }
            );
        }

        const { email, code } = parsed.data;

        const user = await UserModel.findOne({ email });
        if (!user) {
            return Response.json(
                { success: false, message: "No user found with this email" } as ApiResponse,
                { status: 400 }
            );
        }

        if (user.isVerified) {
            return Response.json(
                { success: true, message: "User already verified" } as ApiResponse,
                { status: 200 }
            );
        }

        // Check expiry
        if (!user.verifyCodeExpire || new Date() > new Date(user.verifyCodeExpire)) {
            return Response.json(
                { success: false, message: "Verification code has expired" } as ApiResponse,
                { status: 400 }
            );
        }

        // Compare codes (strings)
        if (String(user.verifyCode) !== String(code)) {
            return Response.json(
                { success: false, message: "Invalid verification code" } as ApiResponse,
                { status: 400 }
            );
        }

        // All good -> verify user
        user.isVerified = true;
        // Optional: clear verifyCode and expiry
        user.verifyCode = "";
        user.verifyCodeExpire = new Date();
        await user.save();

        return Response.json(
            { success: true, message: "Email verified successfully" } as ApiResponse,
            { status: 200 }
        );
    } catch (error) {
        console.error("Error verifying user", error);
        return Response.json(
            { success: false, message: "Error verifying user" } as ApiResponse,
            { status: 500 }
        );
    }
}
