// app/api/public-donors/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";



export async function GET(request: NextRequest) {
  try {
    // ✅ ডেটাবেস কানেকশন চেক
    const donors = await prisma.user.findMany({
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
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      success: true,
      donors: donors,
      count: donors.length,
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { 
        error: "Database error", 
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}
// 📋 GET: স্পেসিফিক ডোনারের বিস্তারিত তথ্য (আইডি দিয়ে)
export async function GET_DONOR_BY_ID(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "ডোনার আইডি প্রদান করুন" },
        { status: 400 }
      );
    }

    const donor = await prisma.user.findUnique({
      where: { id },
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
    });

    if (!donor) {
      return NextResponse.json(
        { error: "ডোনার পাওয়া যায়নি" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      donor: donor,
    });
  } catch (error) {
    console.error("Error fetching donor:", error);
    return NextResponse.json(
      {
        error: "ডোনারের তথ্য লোড করতে সমস্যা হয়েছে",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}