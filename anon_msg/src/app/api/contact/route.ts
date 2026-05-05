import { z } from "zod";
import { resend } from "@/lib/resend";
import { ApiResponse } from "@/types/ApiResponse";

const contactSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(1, "Message is required"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      const message = parsed.error.issues?.[0]?.message ?? "Invalid request";
      return Response.json({ success: false, message } as ApiResponse, {
        status: 400,
      });
    }

    const { firstName, lastName, email, subject, message } = parsed.data;

    const toEmail = process.env.CONTACT_TO_EMAIL;
    const fromEmail = process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev";

    if (!toEmail) {
      return Response.json(
        {
          success: false,
          message: "Contact destination email is not configured",
        } as ApiResponse,
        { status: 500 }
      );
    }

    await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      subject: `[Contact] ${subject}`,
      reply_to: email,
      text: [
        `From: ${firstName} ${lastName}`,
        `Email: ${email}`,
        `Subject: ${subject}`,
        "",
        message,
      ].join("\n"),
    });

    return Response.json(
      { success: true, message: "Message sent" } as ApiResponse,
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error", error);
    return Response.json(
      { success: false, message: "Failed to send message" } as ApiResponse,
      { status: 500 }
    );
  }
}
