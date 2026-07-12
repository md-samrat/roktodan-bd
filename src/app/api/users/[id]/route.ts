// app/api/users/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-it";

// ✅ GET: নির্দিষ্ট ইউজারের ডেটা
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> } // ✅ Promise type
) {
  try {
    // ✅ params কে await করতে হবে
    const { id } = await params;
    
    console.log("GET /api/users/[id] - ID:", id);

    if (!id) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    // ✅ Authorization header থেকে token নেওয়া
    const authHeader = request.headers.get("authorization");
    const token = authHeader?.split(" ")[1];

    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // ✅ Token verify
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as any;
      
      // ✅ ইউজার ম্যাচ চেক
      if (decoded.id !== id) {
        return NextResponse.json(
          { error: "You can only access your own profile" },
          { status: 403 }
        );
      }
    } catch (error) {
      console.error("Token verification failed:", error);
      return NextResponse.json(
        { error: "Invalid token" },
        { status: 401 }
      );
    }

    // ✅ ইউজার খোঁজা
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        phoneNumber: true,
        bloodGroup: true,
        address: true,
        gender: true,
        profileImage: true,
        lastDonationDate: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      user: user,
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 }
    );
  }
}

// ✅ PUT: ইউজার আপডেট
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> } // ✅ Promise type
) {
  try {
    // ✅ params কে await করতে হবে
    const { id } = await params;
    
    console.log("PUT /api/users/[id] - ID:", id);

    if (!id) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { name, phoneNumber, bloodGroup, address, gender, profileImage } = body;

    // ✅ Authorization check
    const authHeader = request.headers.get("authorization");
    const token = authHeader?.split(" ")[1];

    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // ✅ Token verify
    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET) as any;
    } catch (error) {
      return NextResponse.json(
        { error: "Invalid token" },
        { status: 401 }
      );
    }

    // ✅ ইউজার ম্যাচ চেক
    if (decoded.id !== id) {
      return NextResponse.json(
        { error: "You can only update your own profile" },
        { status: 403 }
      );
    }

    // ✅ ইউজার আপডেট
    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        name,
        phoneNumber,
        bloodGroup,
        address,
        gender,
        profileImage,
      },
    });

    // ✅ নতুন Token তৈরি
    const newToken = jwt.sign(
      {
        id: updatedUser.id,
        name: updatedUser.name,
        phoneNumber: updatedUser.phoneNumber,
        bloodGroup: updatedUser.bloodGroup,
      },
      JWT_SECRET,
      { expiresIn: "30d" }
    );

    const { password: _, ...userWithoutPassword } = updatedUser;

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully!",
      user: userWithoutPassword,
      token: newToken,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}