import { connectDB } from "@/lib/mongodb";
import UserModel from "@/models/users";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(){
    await connectDB();
    const users = await UserModel.find().lean();
    return NextResponse.json(users)
}

export async function POST(request: Request) {
  await connectDB();

  try {
    const body = await request.json();

    // duplicate phone check
    const existingUser = await UserModel.findOne({
      phoneNumber: body.phoneNumber,
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "এই নাম্বার দিয়ে আগে থেকেই রেজিস্টার করা হয়েছে" },
        { status: 400 }
      );
    }

    const newUser = await UserModel.create(body);

    // 🔐 টোকেন তৈরি করা (অটো লগইনের জন্য)
    const token = jwt.sign(
      {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        phoneNumber: newUser.phoneNumber,
        bloodGroup: newUser.bloodGroup,
        address: newUser.address,
        gender: newUser.gender,
        profileImage: newUser.profileImage,
      },
      process.env.JWT_SECRET || "your_secret_key",
      { expiresIn: "7d" }
    );

    return NextResponse.json({
      message: "success",
      user: newUser,
      token: token,  // 👈 টোকেন যোগ করা হয়েছে
    });
  } catch (error) {
    return NextResponse.json(
      { message: "error", error },
      { status: 500 }
    );
  }
}