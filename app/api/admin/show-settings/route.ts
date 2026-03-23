 import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

// GET - fetch current show settings
export async function GET(req: NextRequest) {
  try {
    let settings = await prisma.showSettings.findFirst();

    if (!settings) {
      settings = await prisma.showSettings.create({
        data: { isActive: false },
      });
    }

    return NextResponse.json({ isActive: settings.isActive });
  } catch (error) {
    console.error("Error fetching show settings:", error);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}

// POST - update show settings
export async function POST(req: NextRequest) {
  try {
    const { password, isActive } = await req.json();

    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Invalid password." }, { status: 401 });
    }

    let settings = await prisma.showSettings.findFirst();

    if (!settings) {
      settings = await prisma.showSettings.create({
        data: { isActive },
      });
    } else {
      settings = await prisma.showSettings.update({
        where: { id: settings.id },
        data: { isActive },
      });
    }

    return NextResponse.json({ success: true, isActive: settings.isActive });
  } catch (error) {
    console.error("Error updating show settings:", error);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}

