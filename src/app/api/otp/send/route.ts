import { NextRequest, NextResponse } from "next/server";
import { otpStore } from "@/lib/otp-store";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { identifier, type } = body as { identifier: string; type: "mobile" | "email" };

    if (!identifier || !type || !["mobile", "email"].includes(type)) {
      return NextResponse.json(
        { error: "Invalid request. Provide identifier and type (mobile or email)." },
        { status: 400 }
      );
    }

    // Validate format
    if (type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }
    if (type === "mobile" && !/^\+?[0-9]{7,15}$/.test(identifier)) {
      return NextResponse.json({ error: "Invalid mobile number." }, { status: 400 });
    }

    const code = otpStore.generate(identifier, type);

    // In production: send via SMS/Email service
    // For demo: return the code in the response
    return NextResponse.json({
      success: true,
      message: `OTP sent to ${identifier}`,
      // Demo only — remove in production
      demoOtp: code,
    });
  } catch {
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
