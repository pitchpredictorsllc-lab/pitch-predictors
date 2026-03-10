import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");

  if (!code) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/dashboard?error=no_code`);
  }

  try {
    // Exchange code for access token
    const tokenRes = await fetch("https://discord.com/api/oauth2/token", {
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

    const tokenData = await tokenRes.json();

    // Get Discord user info
    const userRes = await fetch("https://discord.com/api/users/@me", {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });

    const discordUser = await userRes.json();

    // Get JWT from cookie to find our user
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/login`);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string };

    // Save Discord info to user
    await prisma.user.update({
      where: { id: decoded.userId },
      data: {
        discordId: discordUser.id,
        discordUsername: discordUser.username,
      },
    });

    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/dashboard?discord=linked`);
  } catch (error) {
    console.error("Discord OAuth error:", error);
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/dashboard?error=oauth_failed`);
  }
}

