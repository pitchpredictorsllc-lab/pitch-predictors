import { NextResponse } from "next/server";

export async function GET() {
  const params = new URLSearchParams({
    client_id: process.env.DISCORD_CLIENT_ID as string,
    redirect_uri: `${process.env.NEXT_PUBLIC_URL}/api/auth/discord/callback`,
    response_type: "code",
    scope: "identify",
  });

  return NextResponse.redirect(
    `https://discord.com/oauth2/authorize?${params.toString()}`
  );
}
