// app/api/public-donors/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// 📋 GET: সকল পাবলিক ডোনারের তালিকা
export async function GET(request: NextRequest) {
  try {
    // URL থেকে query parameters নেওয়া
    const { searchParams } = new URL(request.url);
    const bloodGroup = searchParams.get("bloodGroup");
    const district = searchParams.get("district");
    const search = searchParams.get("search");

    // ✅ ফিল্টার বিল্ড করা
    const whereCondition: any = {};

    // ব্লাড গ্রুপ ফিল্টার
    if (bloodGroup && bloodGroup !== "all") {
      whereCondition.bloodGroup = bloodGroup;
    }

    // জেলা/এলাকা ফিল্টার
    if (district && district !== "all") {
      whereCondition.address = {
        contains: district,
        mode: "insensitive", // case-insensitive search
      };
    }

    // সার্চ ফিল্টার (নাম বা এলাকা)
    if (search) {
      whereCondition.OR = [
        {
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          address: {
            contains: search,
            mode: "insensitive",
          },
        },
      ];
    }

    // ✅ ডোনারদের তালিকা আনা (পাসওয়ার্ড বাদে)
    const donors = await prisma.user.findMany({
      where: whereCondition,
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
        // password বাদ দেওয়া হয়েছে
      },
      orderBy: [
        {
          createdAt: "desc",
        },
      ],
    });

    // ✅ স্ট্যাটিস্টিক্স
    const totalDonors = await prisma.user.count();
    const bloodGroupStats = await prisma.user.groupBy({
      by: ["bloodGroup"],
      _count: {
        bloodGroup: true,
      },
    });

    return NextResponse.json({
      success: true,
      donors: donors,
      count: donors.length,
      total: totalDonors,
      bloodGroupStats: bloodGroupStats.map((item) => ({
        bloodGroup: item.bloodGroup,
        count: item._count.bloodGroup,
      })),
    });
  } catch (error) {
    console.error("Error fetching donors:", error);
    return NextResponse.json(
      {
        error: "ডোনারদের তথ্য লোড করতে সমস্যা হয়েছে",
        details: error instanceof Error ? error.message : "Unknown error",
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