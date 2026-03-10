import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { Resend } from "resend";
import crypto from "crypto";

const prisma = new PrismaClient();
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { name, email, password, agreedToTerms } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    if (!agreedToTerms) {
      return NextResponse.json({ error: "You must agree to the Terms & Conditions." }, { status: 400 });
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: "An account with this email already exists." }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const verificationToken = crypto.randomBytes(32).toString("hex");

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        agreedToTerms: true,
        agreedToTermsAt: new Date(),
        emailVerified: false,
        verificationToken,
      },
    });

    await resend.emails.send({
      from: "Pitch Predictors <noreply@pitchpredictorsllc.com>",
      to: email,
      subject: "Verify your Pitch Predictors account",
      html: `
        <div style="background:#0f0f0f;padding:40px;font-family:Georgia,serif;max-width:500px;margin:0 auto;">
          <img src="https://pitchpredictorsllc.com/radar.png" width="80" style="display:block;margin:0 auto 16px;" />
          <h1 style="color:#c4a882;text-align:center;font-size:22px;">PITCH PREDICTORS</h1>
          <h2 style="color:#fff;text-align:center;font-size:18px;">Verify Your Email</h2>
          <p style="color:#a0b0c0;text-align:center;font-size:15px;">Hi ${name}, thanks for signing up! Click the button below to verify your email address.</p>
          <div style="text-align:center;margin:32px 0;">
            <a href="${process.env.NEXT_PUBLIC_URL}/api/auth/verify?token=${verificationToken}" 
               style="background:#c4a882;color:#000;font-weight:800;padding:14px 32px;border-radius:8px;text-decoration:none;font-size:15px;">
              Verify Email
            </a>
          </div>
          <p style="color:#6a7a90;text-align:center;font-size:13px;">If you didn't create this account you can safely ignore this email.</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true, message: "Please check your email to verify your account." });
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
