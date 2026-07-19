import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
 

    const { phoneNumber, password } = body;

    if (!phoneNumber || !password) {
      return NextResponse.json(
        { message: "মোবাইল নাম্বার এবং পাসওয়ার্ড প্রয়োজন" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { phoneNumber },
    });

    //console.log("User found:", user ? "Yes" : "No");

    if (!user) {
      return NextResponse.json(
        { message: "ইউজার পাওয়া যায়নি" },
        { status: 404 }
      );
    }

    if (user.password !== password) {
      //console.log("Password mismatch");
      return NextResponse.json(
        { message: "পাসওয়ার্ড ভুল" },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
        phoneNumber: user.phoneNumber,
        bloodGroup: user.bloodGroup,
      },
      JWT_SECRET,
      { expiresIn: "30d" }
    );

    //console.log("Token generated:", token);

    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json({
      success: true,
      user: userWithoutPassword,
      token: token,
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "লগইন করতে সমস্যা হয়েছে" },
      { status: 500 }
    );
  }
}