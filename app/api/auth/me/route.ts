import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string };

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        name: true,
        discordId: true,
        discordUsername: true,
        emailVerified: true,
      }
    });

    if (!user) {
      // User no longer exists — clear the cookie and log them out
      const response = NextResponse.json({ error: "User not found" }, { status: 401 });
      response.cookies.set("token", "", { maxAge: 0 });
      return response;
    }

    return NextResponse.json({ user });
  } catch {
    const response = NextResponse.json({ error: "Invalid token" }, { status: 401 });
    response.cookies.set("token", "", { maxAge: 0 });
    return response;
  }
}