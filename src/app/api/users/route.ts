import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-it";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      name,
      phoneNumber,
      bloodGroup,
      address,
      gender,
      lastDonationDate,
      password,
      profileImage,
    } = body;

    
    if (!name || !phoneNumber || !bloodGroup || !address || !gender || !password) {
      return NextResponse.json(
        { error: "সব প্রয়োজনীয় ফিল্ড পূরণ করুন" },
        { status: 400 }
      );
    }

    const bdPhoneRegex = /^01[3-9]\d{8}$/;
    if (!bdPhoneRegex.test(phoneNumber)) {
      return NextResponse.json(
        { error: "সঠিক বাংলাদেশি মোবাইল নাম্বার দিন (01XXXXXXXXX)" },
        { status: 400 }
      );
    }

   
    if (password.length < 6) {
      return NextResponse.json(
        { error: "পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে" },
        { status: 400 }
      );
    }

    
    const existingUser = await prisma.user.findUnique({
      where: { phoneNumber },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "এই নাম্বার দিয়ে আগে থেকেই রেজিস্টার করা হয়েছে" },
        { status: 400 }
      );
    }

  
    const userData: any = {
      name,
      phoneNumber,
      bloodGroup,
      address,
      gender,
      password,
    };

    if (lastDonationDate) {
      userData.lastDonationDate = new Date(lastDonationDate);
    }

    if (profileImage) {
      userData.profileImage = profileImage;
    }

   
    const newUser = await prisma.user.create({
      data: userData,
    });

   
    const token = jwt.sign(
      {
        id: newUser.id,
        name: newUser.name,
        phoneNumber: newUser.phoneNumber,
        bloodGroup: newUser.bloodGroup,
      },
      JWT_SECRET,
      { expiresIn: "30d" }
    );

   
    const { password: _, ...userWithoutPassword } = newUser;

    return NextResponse.json(
      {
        success: true,
        message: "রেজিস্ট্রেশন সফল হয়েছে!",
        user: userWithoutPassword,
        token: token,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      {
        error: "রেজিস্ট্রেশন করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}


export async function GET(request: NextRequest) {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        phoneNumber: true,
        bloodGroup: true,
        address: true,
        gender: true,
        lastDonationDate: true,
        profileImage: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      success: true,
      users: users,
      count: users.length,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "ইউজার লোড করতে সমস্যা হয়েছে" },
      { status: 500 }
    );
  }
}