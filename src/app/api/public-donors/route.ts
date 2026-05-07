import { connectDB } from "@/lib/mongodb";
import UserModel from "@/models/users";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const bloodGroup = searchParams.get("group");
    
    let query = {};
    if (bloodGroup) {
      query = { bloodGroup: bloodGroup };
    }
    
    // ✅ লেটেস্ট ডাটা পাওয়ার জন্য sort এবং lean()
    const donors = await UserModel.find(query)
      .select("name phoneNumber bloodGroup address gender profileImage")
      .sort({ updatedAt: -1 }) // সবচেয়ে নতুন আপডেট প্রথমে
      .lean();
    
    return NextResponse.json(donors);
  } catch (error) {
    console.error("Error fetching donors:", error);
    return NextResponse.json(
      { message: "error" },
      { status: 500 }
    );
  }
}