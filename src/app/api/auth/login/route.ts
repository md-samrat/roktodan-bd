import { connectDB } from "@/lib/mongodb";
import UserModel from "@/models/users";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
  await connectDB();

  try {
    const { phoneNumber, password } = await request.json();

    const user = await UserModel.findOne({ phoneNumber });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    //  plain password check
    if (user.password !== password) {
      return NextResponse.json({ message: "Wrong password" }, { status: 401 });
    }
    //  JWT token
    const token = jwt.sign(
      {
        id: user._id,
        phoneNumber: user.phoneNumber,
        name: user.name,
        bloodGroup: user.bloodGroup,
        address: user.address,
      },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" },
    );

    return NextResponse.json({
      message: "login success",
      token,
      user,
    });
  } catch (error) {
    return NextResponse.json({ message: "error", error }, { status: 500 });
  }
}
