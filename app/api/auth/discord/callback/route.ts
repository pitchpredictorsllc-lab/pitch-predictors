import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

async function generateInviteLink(): Promise<{ code: string; url: string }> {
  const response = await fetch(
    `https://discord.com/api/v10/channels/${process.env.DISCORD_WELCOME_CHANNEL_ID}/invites`,
    {
      method: "POST",
      headers: {
        Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        max_uses: 1,
        max_age: 604800, // 7 days to join
        unique: true,
      }),
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to create invite: ${response.status}`);
  }

  const data = await response.json();
  return { code: data.code, url: `https://discord.gg/${data.code}` };
}

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");

  if (!code) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/dashboard?error=no_code`);
  }

  try {
    // Get JWT token from cookie to identify logged in user
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/login`);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string };

    // Exchange code for Discord access token
    const tokenResponse = await fetch("https://discord.com/api/oauth2/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: process.env.DISCORD_CLIENT_ID as string,
        client_secret: process.env.DISCORD_CLIENT_SECRET as string,
        grant_type: "authorization_code",
        code,
        redirect_uri: `${process.env.NEXT_PUBLIC_URL}/api/auth/discord/callback`,
      }),
    });

    if (!tokenResponse.ok) {
      throw new Error("Failed to exchange Discord code");
    }

    const tokenData = await tokenResponse.json();

    // Get Discord user info
    const userResponse = await fetch("https://discord.com/api/users/@me", {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });

    if (!userResponse.ok) {
      throw new Error("Failed to fetch Discord user");
    }

    const discordUser = await userResponse.json();

    // Save Discord info to user in database
    const user = await prisma.user.update({
      where: { id: decoded.userId },
      data: {
        discordId: discordUser.id,
        discordUsername: discordUser.username,
      },
    });

    // Check if user is already in the server
    const memberCheck = await fetch(
      `https://discord.com/api/v10/guilds/${process.env.DISCORD_SERVER_ID}/members/${discordUser.id}`,
      {
        headers: {
          Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
        },
      }
    );

    if (memberCheck.ok) {
      // Already in server — just grant Jabroni role
      await fetch(
        `https://discord.com/api/v10/guilds/${process.env.DISCORD_SERVER_ID}/members/${discordUser.id}/roles/${process.env.DISCORD_JABRONI_ROLE_ID}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );

      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/dashboard?discord=linked`);
    }

    // Not in server — generate invite and save to database
    const invite = await generateInviteLink();

    // Save invite code tied to this Discord user ID
    await prisma.discordInvite.upsert({
      where: { discordUserId: discordUser.id },
      update: { inviteCode: invite.code, used: false, createdAt: new Date() },
      create: { discordUserId: discordUser.id, inviteCode: invite.code },
    });

    // Send invite email
    const { Resend } = await import("resend");
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: "Pitch Predictors <noreply@pitchpredictorsllc.com>",
      to: user.email,
      subject: "Your Pitch Predictors Discord invite",
      html: `
        <div style="background:#0f0f0f;padding:40px;font-family:Georgia,serif;max-width:500px;margin:0 auto;">
          <img src="https://pitchpredictorsllc.com/radar.png" width="80" style="display:block;margin:0 auto 16px;" />
          <h1 style="color:#c4a882;text-align:center;font-size:22px;">PITCH PREDICTORS</h1>
          <h2 style="color:#fff;text-align:center;font-size:18px;">Discord Linked!</h2>
          <p style="color:#a0b0c0;text-align:center;font-size:15px;">Hey ${user.name || ""}! Your Discord account has been linked. Click below to join our server and get access to our community.</p>
          <div style="text-align:center;margin:32px 0;">
            <a href="${invite.url}" style="background:#5865f2;color:#fff;font-weight:800;padding:14px 32px;border-radius:8px;text-decoration:none;font-size:15px;">
              Join Discord Server
            </a>
          </div>
          <p style="color:#6a7a90;text-align:center;font-size:13px;">This invite link is single-use and expires in 7 days. Once you join, you'll automatically receive the Jabroni role.</p>
          <p style="color:#6a7a90;text-align:center;font-size:13px;">To purchase access to a show, head back to your dashboard on pitchpredictorsllc.com.</p>
        </div>
      `,
    });

    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/dashboard?discord=linked`);
  } catch (err) {
    console.error("Discord callback error:", err);
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/dashboard?error=discord_failed`);
  }
}