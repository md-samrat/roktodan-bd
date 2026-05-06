import { connectDB } from "@/lib/mongodb";
import UserModel from "@/models/users";
import { NextResponse } from "next/server";

export async function GET(){
    await connectDB();
    const users = await UserModel.find().lean();
    return NextResponse.json(users)
}

export async function POST(request:Request){
    await connectDB();
    const newUser = await request.json();
    const result = await UserModel.create(newUser)
    return NextResponse.json({message:"success",result})
}