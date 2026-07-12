import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "ইউজার আইডি প্রদান করুন" },
        { status: 400 }
      );
    }

    // ইউজার আছে কিনা চেক করা
    const existingUser = await prisma.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      return NextResponse.json(
        { error: "ইউজার পাওয়া যায়নি" },
        { status: 404 }
      );
    }

    // ইউজার ডিলিট করা
    await prisma.user.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "ইউজার ডিলিট করা হয়েছে",
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { error: "ইউজার ডিলিট করতে সমস্যা হয়েছে" },
      { status: 500 }
    );
  }
}