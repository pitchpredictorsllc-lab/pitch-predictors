import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");

  if (!token) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/login?error=invalid_token`);
  }

  try {
    const user = await prisma.user.findFirst({
      where: { verificationToken: token },
    });

    if (!user) {
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/login?error=invalid_token`);
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerified: true,
        verificationToken: null,
      },
    });

    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/login?verified=true`);
  } catch (error) {
    console.error("Verification error:", error);
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/login?error=something_went_wrong`);
  }
}
