import { connectDB } from "@/lib/mongodb";
import UserModel from "@/models/users";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const { id } = await params;
    const body = await request.json();

    // ID ভ্যালিডেশন
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid user id" },
        { status: 400 }
      );
    }

    // ইউজার আপডেট
    const updatedUser = await UserModel.findByIdAndUpdate(
      id,
      {
        name: body.name,
        phoneNumber: body.phoneNumber,
        bloodGroup: body.bloodGroup,
        address: body.address,
        gender: body.gender,
        profileImage: body.profileImage,
      },
      {
        new: true,
        runValidators: false,
      }
    );

    if (!updatedUser) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // নতুন টোকেন তৈরি
    const newToken = jwt.sign(
      {
        id: updatedUser._id,
        name: updatedUser.name,
        phoneNumber: updatedUser.phoneNumber,
        bloodGroup: updatedUser.bloodGroup,
        address: updatedUser.address,
        gender: updatedUser.gender,
        profileImage: updatedUser.profileImage,
        email: updatedUser.email,
      },
      process.env.JWT_SECRET || "your_secret_key_here",
      { expiresIn: "7d" }
    );

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
      token: newToken,
    });
  } catch (error: any) {
    console.error("Update Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Server error occurred",
      },
      { status: 500 }
    );
  }
}

// ইউজার ডিটেইলস পাওয়ার জন্য GET মেথড
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const { id } = params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid user id" },
        { status: 400 }
      );
    }

    const user = await UserModel.findById(id).select("-password");

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      user: user,
    });
  } catch (error: any) {
    console.error("Get User Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}