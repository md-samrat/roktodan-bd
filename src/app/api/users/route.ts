import { connectDB } from "@/lib/mongodb";
import UserModel from "@/models/users";
import { NextResponse } from "next/server";


// app/api/users/route.ts - এ ফিল্টার যোগ করুন
export async function GET(request: Request) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    let bloodGroup = searchParams.get("group");
    
    // URL ডিকোড করুন
    if (bloodGroup) {
      bloodGroup = decodeURIComponent(bloodGroup);
    }
    
    let query = {};
    if (bloodGroup && bloodGroup !== "") {
      query = { bloodGroup: bloodGroup };
    }
    
    const users = await UserModel.find(query)
      .select("name phoneNumber bloodGroup address gender profileImage")
      .lean();
    
    return NextResponse.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { message: "ডাটা লোড করতে সমস্যা হয়েছে" },
      { status: 500 }
    );
  }
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
      user: newUser,
      token: token,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "error", error },
      { status: 500 }
    );
  }
}