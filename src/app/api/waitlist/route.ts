import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendEmail, generateWaitlistNotificationEmail } from "@/lib/email";

const sanitize = (value: unknown) => (typeof value === "string" ? value.trim() : "");

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = sanitize(body.email);
    const business = sanitize(body.business);
    const wallet = sanitize(body.wallet);

    if (!email || !business) {
      return NextResponse.json({ message: "Email and business are required." }, { status: 400 });
    }

    // Save to database
    const signup = await prisma.waitlistSignup.create({
      data: {
        email,
        business,
        wallet: wallet || null,
      },
    });

    console.info("[waitlist] signup created", {
      id: signup.id,
      email,
      business,
      wallet: wallet || "not_provided",
    });

    // Send email notification to admin
    const adminEmail = process.env.ADMIN_EMAIL;
    if (adminEmail) {
      const emailContent = generateWaitlistNotificationEmail({ email, business, wallet });
      const result = await sendEmail({
        to: adminEmail,
        subject: emailContent.subject,
        html: emailContent.html,
      });

      if (!result.success) {
        console.error("[waitlist] Failed to send notification email:", result.error);
      } else {
        console.info("[waitlist] Notification email sent to admin");
      }
    } else {
      console.warn("[waitlist] ADMIN_EMAIL not configured, skipping notification");
    }

    return NextResponse.json(
      {
        message: "You're on the waitlist. We'll share the Stripe + wallet onboarding link shortly.",
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("[waitlist] error:", error);
    
    // Handle unique constraint violation (duplicate email)
    if (error && typeof error === 'object' && 'code' in error && error.code === 'P2002') {
      return NextResponse.json({ message: "This email is already on the waitlist." }, { status: 409 });
    }
    
    return NextResponse.json({ message: "Invalid request payload." }, { status: 400 });
  }
}
