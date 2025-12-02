import { NextResponse } from "next/server";

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

    console.info("[waitlist]", {
      email,
      business,
      wallet: wallet || "wallet:not_provided",
      receivedAt: new Date().toISOString(),
    });

    return NextResponse.json(
      {
        message: "You're on the waitlist. We'll share the Stripe + wallet onboarding link shortly.",
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("[waitlist] invalid payload", error);
    return NextResponse.json({ message: "Invalid request payload." }, { status: 400 });
  }
}
