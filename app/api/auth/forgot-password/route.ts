import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { Resend } from "resend";
import crypto from "crypto";

const prisma = new PrismaClient();
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required." }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });

    // Always return success even if user not found to prevent email enumeration
    if (!user) {
      return NextResponse.json({ success: true });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetExpiry = new Date(Date.now() + 1000 * 60 * 60); // 1 hour from now

    await prisma.user.update({
      where: { email },
      data: {
        passwordResetToken: resetToken,
        passwordResetExpiry: resetExpiry,
      },
    });

    await resend.emails.send({
      from: "Pitch Predictors <noreply@pitchpredictorsllc.com>",
      to: email,
      subject: "Reset your Pitch Predictors password",
      html: `
        <div style="background:#0f0f0f;padding:40px;font-family:Georgia,serif;max-width:500px;margin:0 auto;">
          <img src="https://pitchpredictorsllc.com/radar.png" width="80" style="display:block;margin:0 auto 16px;" />
          <h1 style="color:#c4a882;text-align:center;font-size:22px;">PITCH PREDICTORS</h1>
          <h2 style="color:#fff;text-align:center;font-size:18px;">Reset Your Password</h2>
          <p style="color:#a0b0c0;text-align:center;font-size:15px;">We received a request to reset your password. Click the button below to choose a new one. This link expires in 1 hour.</p>
          <div style="text-align:center;margin:32px 0;">
            <a href="${process.env.NEXT_PUBLIC_URL}/reset-password?token=${resetToken}"
               style="background:#c4a882;color:#000;font-weight:800;padding:14px 32px;border-radius:8px;text-decoration:none;font-size:15px;">
              Reset Password
            </a>
          </div>
          <p style="color:#6a7a90;text-align:center;font-size:13px;">If you didn't request this you can safely ignore this email.</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}