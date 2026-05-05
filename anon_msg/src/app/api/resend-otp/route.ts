/*
 * POST /api/resend-otp
 * Resends a verification OTP to an unverified user.
 *
 * Logic:
 * 1. Connect to the database.
 * 2. Parse the username from the request body.
 * 3. Find the user by username.
 * 4. If the user doesn't exist, return a 404 error.
 * 5. If the user is already verified, return a 400 error.
 * 6. Generate a new verification code and update the expiry time.
 * 7. Save the user.
 * 8. Send the new verification code using sendVerificationEmail.
 * 9. Return success or error based on the email sending result.
 */

import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User.model";
import { sendVerificationEmail } from "@/helpers/sendVerificationMail";

export async function POST(request: Request) {
    await dbConnect();

    try {
        const { username } = await request.json();

        if (!username) {
            return Response.json(
                { success: false, message: "Username is required" },
                { status: 400 }
            );
        }

        const user = await UserModel.findOne({ username });

        if (!user) {
            return Response.json(
                { success: false, message: "User not found" },
                { status: 404 }
            );
        }

        if (user.isVerified) {
            return Response.json(
                { success: false, message: "User is already verified" },
                { status: 400 }
            );
        }

        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
        user.verifyCode = verifyCode;
        user.verifyCodeExpire = new Date(Date.now() + 3600000); // 1 hour

        await user.save();

        const emailResponse = await sendVerificationEmail(
            user.email,
            user.username,
            verifyCode
        );

        if (!emailResponse.success) {
            return Response.json(
                { success: false, message: emailResponse.message },
                { status: 500 }
            );
        }

        return Response.json(
            { success: true, message: "Verification code resent successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error resending OTP', error);
        return Response.json(
            { success: false, message: "Error resending verification code" },
            { status: 500 }
        );
    }
}
