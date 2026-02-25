import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

async function grantDiscordRole(discordUserId: string) {
  const response = await fetch(
    `https://discord.com/api/v10/guilds/${process.env.DISCORD_SERVER_ID}/members/${discordUserId}/roles/${process.env.DISCORD_ROLE_ID}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Discord API error: ${response.status}`);
  }
}

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature") as string;

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (err) {
    console.error("Webhook signature error:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const discordUserId = session.metadata?.discordUserId;

    if (discordUserId) {
      try {
        await grantDiscordRole(discordUserId);
        console.log(`Granted Discord role to user ${discordUserId}`);
      } catch (err) {
        console.error("Failed to grant Discord role:", err);
      }
    }
  }

  return NextResponse.json({ received: true });
}