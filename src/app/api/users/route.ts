// src/app/api/users/route.ts
import UserModel from "@/models/users";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/mongodb";

export async function POST(request: NextRequest) {
  try {
    console.log("1. Connecting to database...");
    await connectDB();
    console.log("2. Database connected");

    const body = await request.json();
    console.log("3. Request body received");

    // Check if user already exists
    const existingUser = await UserModel.findOne({
      phoneNumber: body.phoneNumber,
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "এই নাম্বার দিয়ে আগে থেকেই রেজিস্টার করা হয়েছে" },
        { status: 400 }
      );
    }

    // Process lastDonationDate
    const userData = { ...body };
    if (userData.lastDonationDate === "" || !userData.lastDonationDate) {
      delete userData.lastDonationDate;
    }

    // Create new user
    console.log("4. Creating user...");
    const newUser = await UserModel.create(userData);
    console.log("5. User created successfully:", newUser._id);

    // Generate JWT token
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
      process.env.JWT_SECRET || "your_secret_key_here",
      { expiresIn: "7d" }
    );

    // Return success response
    return NextResponse.json({
      message: "success",
      user: {
        id: newUser._id,
        name: newUser.name,
        phoneNumber: newUser.phoneNumber,
        bloodGroup: newUser.bloodGroup,
        address: newUser.address,
        gender: newUser.gender,
        profileImage: newUser.profileImage || "",
      },
      token: token,
    });

  } catch (error: any) {
    console.error("API Error Details:", error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      return NextResponse.json(
        { message: "দয়া করে সব তথ্য সঠিকভাবে পূরণ করুন", error: error.message },
        { status: 400 }
      );
    }
    
    // Handle duplicate key error
    if (error.code === 11000) {
      return NextResponse.json(
        { message: "এই নাম্বার দিয়ে আগে থেকেই রেজিস্টার করা আছে" },
        { status: 400 }
      );
    }
    
    // Handle other errors
    return NextResponse.json(
      { 
        message: "রেজিস্ট্রেশন করতে সমস্যা হয়েছে", 
        error: error.message 
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();
    // পাসওয়ার্ড সহ সব ডাটা দেখতে চাইলে .select() বাদ দিন
    const users = await UserModel.find().lean();
    return NextResponse.json(users);
  } catch (error: any) {
    console.error("GET Error:", error);
    return NextResponse.json(
      { message: "ডাটা লোড করতে সমস্যা হয়েছে" },
      { status: 500 }
    );
  }
}