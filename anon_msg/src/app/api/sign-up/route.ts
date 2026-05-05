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

        const emailUser = await UserModel.findOne({ email });
        const usernameUser = await UserModel.findOne({ username });

        if (emailUser?.isVerified) {
            return Response.json(
                {
                    success: false,
                    message: "User already exists with this email",
                },
                { status: 400 }
            );
        }

        if (usernameUser?.isVerified) {
            return Response.json(
                {
                    success: false,
                    message: "Username already taken",
                },
                { status: 409 }
            );
        }

        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
        const hashedPassword = await bcrypt.hash(password, 10);
        const verifyCodeExpire = new Date(Date.now() + 3600000);

        let userToUpdate = null;

        if (usernameUser && !usernameUser.isVerified) {
            if (emailUser && emailUser._id.toString() !== usernameUser._id.toString()) {
                return Response.json(
                    {
                        success: false,
                        message:
                            "Email and username belong to different unverified accounts. Try another.",
                    },
                    { status: 409 }
                );
            }
            userToUpdate = usernameUser;
        } else if (emailUser && !emailUser.isVerified) {
            userToUpdate = emailUser;
        }

        if (userToUpdate) {
            userToUpdate.username = username;
            userToUpdate.email = email;
            userToUpdate.password = hashedPassword;
            userToUpdate.verifyCode = verifyCode;
            userToUpdate.verifyCodeExpire = verifyCodeExpire;
            await userToUpdate.save();
        } else {
            await UserModel.create({
                username,
                email,
                password: hashedPassword,
                verifyCode,
                verifyCodeExpire,
                isVerified: false,
                isAcceptingMessages: true,
                messages: [],
            });
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
        const mongoError = error as { code?: number };
        if (mongoError.code === 11000) {
            return Response.json(
                {
                    success: false,
                    message: "Username already taken",
                },
                { status: 409 }
            );
        }
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




