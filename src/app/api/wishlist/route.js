import { Product } from "@/tools/models/Product";
import { Wishlist } from "@/tools/models/Wishlist";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  try {
    const { user, productId } = await req.json();
    console.log(user, productId);
    const product = await Product.findOne({ _id: productId });
    if (!product) {
      return NextResponse.json({
        msg: "Product Doenst Exists",
        success: false,
      });
    }
    const existProduct = await Wishlist.findOne({
      user: user,
      product: productId,
    });

    if (existProduct) {
      return NextResponse.json({
        msg: "Product Already Exists in Your Wishlist",
        success: false,
      });
    }
    const wishlist = await Wishlist.create({
      user: user,
      product: productId,
    });
    return NextResponse.json({
      msg: "Product Added in Your Wishlist",
      success: true,
      item: wishlist,
    });
  } catch (error) {
    return NextResponse.json({
      msg: "Error While  Adding Product  in  Wishlist",
      success: false,
      error: error,
    });
  }
}

