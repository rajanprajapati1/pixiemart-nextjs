import { MongooseConnection } from "@/tools/configs/MongooseConnection";
import { Category } from "@/tools/models/Category";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function POST(req, res) {
  await MongooseConnection();
  const { name, description, image } = await req.json();
  try {
    const newCategory = await Category.create({
      name,
      description,
      image,
    });
    return NextResponse.json({
      msg: "category Created Successfully",
      success: true,
      newCategory: newCategory,
    });
  } catch (error) {
    return NextResponse.json({ msg: "failed to Post category", error: error });
  }
}

export async function GET(req, res) {
  await MongooseConnection();
  try {
    const token = await getToken({ req })
    if (!token)
      return NextResponse.json({
        message: "Unauthenticated user. Your IP has been logged",
      });
    const category = await Category.find();
    return NextResponse.json({ msg: "category List", category: category });
  } catch (error) {
    return NextResponse.json({ msg: "category fetch to failed", error: error });
  }
}
