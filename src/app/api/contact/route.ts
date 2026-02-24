import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import type { ContactFormData } from "@/types";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body: ContactFormData = await req.json();
    const { name, email, subject, message } = body;

    // Basic validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ success: false, message: "All fields are required." }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ success: false, message: "Invalid email address." }, { status: 400 });
    }

    // Email to you
    await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: process.env.EMAIL_TO!,
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      html: `
        <div style="font-family: monospace; background: #030712; color: #f1f5f9; padding: 2rem; border-radius: 12px; border: 1px solid rgba(99,102,241,0.3);">
          <h2 style="color: #6366f1; margin-bottom: 1.5rem;">New Message from Portfolio</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <hr style="border-color: rgba(99,102,241,0.2); margin: 1rem 0;" />
          <p><strong>Message:</strong></p>
          <p style="color: #94a3b8; white-space: pre-wrap;">${message}</p>
        </div>
      `,
    });

    // Auto-reply to sender
    await resend.emails.send({
      from: "Om Narayan Pandit <onboarding@resend.dev>",
      to: email,
      subject: `Thanks for reaching out, ${name}!`,
      html: `
        <div style="font-family: monospace; background: #030712; color: #f1f5f9; padding: 2rem; border-radius: 12px;">
          <h2 style="color: #6366f1;">Hey ${name}! 👋</h2>
          <p style="color: #94a3b8; line-height: 1.7;">
            Thanks for reaching out! I've received your message about "<strong style="color: #f1f5f9;">${subject}</strong>" and will get back to you soon.
          </p>
          <p style="color: #94a3b8;">— Om Narayan Pandit</p>
          <hr style="border-color: rgba(99,102,241,0.2);" />
          <p style="font-size: 0.75rem; color: #475569;">AI/ML Engineer · B.Tech Final Year</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json({ success: false, message: "Failed to send message. Please try again." }, { status: 500 });
  }
}