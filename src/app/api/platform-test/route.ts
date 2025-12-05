import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendEmail, generatePlatformTestNotificationEmail } from "@/lib/email";

const sanitize = (value: unknown) => (typeof value === "string" ? value.trim() : "");

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = sanitize(body.email);
    const testType = sanitize(body.testType);
    const details = sanitize(body.details);

    if (!email || !testType) {
      return NextResponse.json({ message: "Email and test type are required." }, { status: 400 });
    }

    // Save to database
    const test = await prisma.platformTest.create({
      data: {
        email,
        testType,
        details: details || null,
      },
    });

    console.info("[platform-test] test logged", {
      id: test.id,
      email,
      testType,
    });

    // Send email notification to admin
    const adminEmail = process.env.ADMIN_EMAIL;
    if (adminEmail) {
      const emailContent = generatePlatformTestNotificationEmail({ email, testType, details });
      const result = await sendEmail({
        to: adminEmail,
        subject: emailContent.subject,
        html: emailContent.html,
      });

      if (!result.success) {
        console.error("[platform-test] Failed to send notification email:", result.error);
      } else {
        console.info("[platform-test] Notification email sent to admin");
      }
    } else {
      console.warn("[platform-test] ADMIN_EMAIL not configured, skipping notification");
    }

    return NextResponse.json(
      {
        message: "Test completed successfully. Thank you!",
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("[platform-test] error:", error);
    return NextResponse.json({ message: "Failed to log test." }, { status: 500 });
  }
}
