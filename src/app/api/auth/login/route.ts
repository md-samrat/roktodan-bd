import { connectDB } from "@/lib/mongodb";
import UserModel from "@/models/users";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    await connectDB();

    const { phoneNumber, password } = await request.json();

    // console.log("🔍 Login attempt for:", phoneNumber);

    // ভ্যালিডেশন
    if (!phoneNumber || !password) {
      return NextResponse.json(
        { message: "ফোন নাম্বার এবং পাসওয়ার্ড প্রয়োজন" },
        { status: 400 },
      );
    }

    // ইউজার খোঁজা
    const user = await UserModel.findOne({ phoneNumber });

    // console.log("📋 User found:", user ? "Yes" : "No");

    if (!user) {
      return NextResponse.json(
        { message: "এই নাম্বারে কোন ইউজার নেই" },
        { status: 404 },
      );
    }

    // পাসওয়ার্ড চেক
    // console.log("🔐 Password match:", user.password === password ? "Yes" : "No");

    if (user.password !== password) {
      return NextResponse.json({ message: "পাসওয়ার্ড ভুল" }, { status: 401 });
    }

    // JWT টোকেন তৈরি
    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
        phoneNumber: user.phoneNumber,
        bloodGroup: user.bloodGroup,
        address: user.address,
        gender: user.gender,
        profileImage: user.profileImage || "",
      },
      process.env.JWT_SECRET || "your_secret_key_here",
      { expiresIn: "7d" },
    );

    // console.log("✅ Login successful for:", user.name);

    // পাসওয়ার্ড বাদ দিয়ে ইউজার ডাটা
    const userData = {
      id: user._id,
      name: user.name,
      phoneNumber: user.phoneNumber,
      bloodGroup: user.bloodGroup,
      address: user.address,
      gender: user.gender,
      profileImage: user.profileImage,
    };

    return NextResponse.json({
      success: true,
      message: "লগইন সফল",
      token,
      user: userData,
    });
  } catch (error: any) {
    console.error("❌ Login error:", error);
    return NextResponse.json(
      {
        message: error.message || "লগইন করতে সমস্যা হয়েছে",
      },
      { status: 500 },
    );
  }
}
