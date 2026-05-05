import { resend } from "@/lib/resend";
import VerificationEmail from '../email_template_resend/verificationEmail';
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
    email: string,
    username: string,
    verifyCode: string
): Promise<ApiResponse> {
    try {
        const fromEmail = process.env.RESEND_FROM;
        if (!fromEmail) {
            throw new Error("RESEND_FROM is not set in the environment.");
        }

        const { data, error } = await resend.emails.send({
            from: fromEmail,
            to: email,
            subject: 'Anonymous Message | Verification Code',
            react: VerificationEmail({ username, otp: verifyCode }),
        });

        if (error) {
            // console.error("Resend API error", error);
            return { success: false, message: `Failed to send verification email: ${error.message || "Unknown error"}` };
        }

        // console.log("Resend API response", data);
        return { success: true, message: 'Verification email sent successfully.' };
    } catch (emailError) {
        const errorMessage = emailError instanceof Error ? emailError.message : "Unknown error";
        console.error("Error sending verification email", emailError);
        return { success: false, message: `Failed to send verification email: ${errorMessage}` };
    }
}