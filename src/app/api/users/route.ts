import { connectDB } from "@/lib/mongodb";
import UserModel from "@/models/users";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";




// শুধু POST রাখুন রেজিস্ট্রেশনের জন্য
export async function POST(request: Request) {
  await connectDB();

  try {
    const body = await request.json();
    
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

    const token = jwt.sign(
      {
        id: newUser._id,
        name: newUser.name,
        phoneNumber: newUser.phoneNumber,
        bloodGroup: newUser.bloodGroup,
        address: newUser.address,
        gender: newUser.gender,
        profileImage: newUser.profileImage || "",
      },
      process.env.JWT_SECRET || "your_secret_key",
      { expiresIn: "7d" }
    );

    return NextResponse.json({
      message: "success",
      user: {
        id: newUser._id,
        name: newUser.name,
        phoneNumber: newUser.phoneNumber,
        bloodGroup: newUser.bloodGroup,
        address: newUser.address,
        gender: newUser.gender,
        profileImage: newUser.profileImage,
      },
      token: token,
    });
  } catch (error) {
    console.error("POST Error:", error);
    return NextResponse.json(
      { message: "error", error },
      { status: 500 }
    );
  }
}