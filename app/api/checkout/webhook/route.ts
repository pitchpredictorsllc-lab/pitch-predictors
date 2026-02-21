import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { Client, GatewayIntentBits } from "discord.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

async function grantDiscordRole(discordUserId: string) {
  const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers] });
  
  await client.login(process.env.DISCORD_BOT_TOKEN);
  
  const guild = await client.guilds.fetch(process.env.DISCORD_SERVER_ID as string);
  const member = await guild.members.fetch(discordUserId);
  await member.roles.add(process.env.DISCORD_ROLE_ID as string);
  
  await client.destroy();
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