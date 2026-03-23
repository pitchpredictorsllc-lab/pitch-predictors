 import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  // Verify this is being called by Vercel Cron
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Fetch all members of the server
    const membersResponse = await fetch(
      `https://discord.com/api/v10/guilds/${process.env.DISCORD_SERVER_ID}/members?limit=1000`,
      {
        headers: {
          Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
        },
      }
    );

    if (!membersResponse.ok) {
      throw new Error(`Failed to fetch members: ${membersResponse.status}`);
    }

    const members = await membersResponse.json();

    // Filter members who have the Daily Jabroni role
    const membersWithRole = members.filter((member: any) =>
      member.roles.includes(process.env.DISCORD_ROLE_ID)
    );

    console.log(`Found ${membersWithRole.length} members with Daily Jabroni role`);

    // Remove the role from each member
    const results = await Promise.allSettled(
      membersWithRole.map(async (member: any) => {
        const response = await fetch(
          `https://discord.com/api/v10/guilds/${process.env.DISCORD_SERVER_ID}/members/${member.user.id}/roles/${process.env.DISCORD_ROLE_ID}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to remove role from ${member.user.username}: ${response.status}`);
        }

        console.log(`Removed Daily Jabroni from ${member.user.username}`);
        return member.user.username;
      })
    );

    const succeeded = results.filter((r) => r.status === "fulfilled").length;
    const failed = results.filter((r) => r.status === "rejected").length;

    return NextResponse.json({
      success: true,
      message: `Removed Daily Jabroni role from ${succeeded} members. ${failed} failed.`,
    });
  } catch (error) {
    console.error("Cron job error:", error);
    return NextResponse.json({ error: "Cron job failed" }, { status: 500 });
  }
}
