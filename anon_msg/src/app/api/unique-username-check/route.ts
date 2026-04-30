/*
 * POST /api/unique-username-check
 * Checks if a username is available or can be claimed.
 *
 * Logic:
 * 1. Connect to the database.
 * 2. Parse username from the request body and validate with Zod schema.
 * 3. Check if a user with the given username exists.
 * 4. If a user exists:
 *    a. If the user is verified, return a 200 response indicating the username is taken and verified.
 *    b. If the user is not verified, return a 200 response indicating the username is taken but not verified and can be used.
 * 5. If no user exists with that username, return a 200 response indicating the username is available.
 */

import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User.model";
import { usernameValidation } from "@/schemas/signUpSchema";

export async function GET(request: Request) {
    // preventing the post request from going through
    if (request.method !== "GET") {
        return Response.json(
            {
                success: false,
                message: "Method not allowed",
            },
            { status: 405 }
        );
    }

    await dbConnect();

    try {
        const url = new URL(request.url);
        // getting the https://a.com/ route?username=someusername 
        // we are trying to get the someusername part 
        const rawUsername = url.searchParams.get("username")?.trim();

        // validating the username with zod schema

        const parseResult = usernameValidation.safeParse(rawUsername);
        if (!parseResult.success) {
            // collect all issue messages into an array of strings
            const errorMessages = parseResult.error.issues.map((issue) => issue.message);
            return Response.json(
            {
                success: false,
                message: errorMessages.length > 0 ? errorMessages.join(", ") : "Invalid username",
            },
            { status: 400 }
            );
        }
        const username = parseResult.data; // This is the validated username
        const user = await UserModel.findOne({ username });

        if (user && user.isVerified) {
            return Response.json(
            {
                success: false,
                message: "Username is already taken and verified",
            },
            { status: 200 }
            );
        }

        return Response.json(
            {
                success: true,
                message: "Username is available",
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error checking username", error);
        return Response.json(
            {
                success: false,
                message: "Error checking username",
            },
            { status: 500 }
        );
    }
}
