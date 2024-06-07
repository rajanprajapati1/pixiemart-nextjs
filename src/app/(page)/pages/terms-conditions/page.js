import { MongooseConnection } from "@/tools/configs/MongooseConnection";
import { Category } from "@/tools/models/Category";
import { Product } from "@/tools/models/Product";
import { SubCategory } from "@/tools/models/SubCategory";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  await MongooseConnection();
  await Category?.find();
  await SubCategory?.find();
  try {
    const { id } = res?.params;

    const product = await Product?.findOne({ _id: id }).populate('category') // populate the category field
    .populate('ratings.user');
    ;

    if (!product) {
      return NextResponse.json({ msg: "Product not found" }, { status: 404 });
    }
    
    const productRecommednId = product?.category;

    const recommendedProducts = await Product?.find({
      category: productRecommednId,
      _id: { $ne: product?._id },
    }).limit(8)
    .populate('category') // populate the category field
    .populate('ratings.user')

    return NextResponse.json({
      msg: "success",
      product: pro