/*
 * POST /api/sign-up
 * Handles user registration.
 *
 * Logic:
 * 1.  Connect to the database.
 * 2.  Parse username, email, and password from the request body.
 * 3.  Check if a user with the given email already exists.
 * 4.  If a user exists:
 *     a. If the user is already verified, return a 400 error indicating the user already exists.
 *     b. If the user is not verified, update their password, username, and generate a new verification code with a new expiry time. Save the changes.
 * 5.  If no user exists with that email:
 *     a. Hash the provided password.
 *     b. Create a new user document with the provided details, a new verification code, and an expiry time.
 *     c. Save the new user to the database.
 * 6.  For both new users and existing unverified users, send a verification email.
 * 7.  If the email sending fails, return a 500 server error.
 * 8.  If the email is sent successfully, return a 201 success response.
 * 9.  Catch any other exceptions during the process, log the error, and return a 500 server error.
 */

import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User.model";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/helpers/sendVerificationMail";

export async function POST(request: Request) {
    await dbConnect();

    try {
        const { username, email, password } = await request.json();

        const existingUser = await UserModel.findOne({ email });
        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

        if (existingUser) {
            if (existingUser.isVerified) {
                return Response.json(
                    {
                        success: false,
                        message: "User already exists with this email",
                    },
                    { status: 400 }
                );
            } else {
                // If user exists but is not verified, update their password and verification code
                const hashedPassword = await bcrypt.hash(password, 10);
                existingUser.password = hashedPassword;
                existingUser.username = username;
                existingUser.verifyCode = verifyCode;
                existingUser.verifyCodeExpire = new Date(Date.now() + 3600000); // 1 hour
                await existingUser.save();
            }
        } else {
            // Create a new user since one doesn't exist with this email
            const hashedPassword = await bcrypt.hash(password, 10);
            const expiryDate = new Date();
            expiryDate.setHours(expiryDate.getHours() + 1);

            const newUser = new UserModel({
                username,
                email,
                password: hashedPassword,
                verifyCode,
                verifyCodeExpire: expiryDate,
                isVerified: false,
                isAcceptingMessages: true,
                messages: [],
            });

            await newUser.save();
        }

        // Send verification email in both cases (new user or existing unverified user)
        const emailResponse = await sendVerificationEmail(
            email,
            username,
            verifyCode
        );

        if (!emailResponse.success) {
            return Response.json(
                {
                    success: false,
                    message: emailResponse.message,
                },
                { status: 500 }
            );
        }

        return Response.json(
            {
                success: true,
                message: "User registered successfully. Please verify your email.",
            },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error registering user', error);
        return Response.json(
            {
                success: false,
                message: "Error registering user",
            },
            { status: 500 }
        );
    }
}




