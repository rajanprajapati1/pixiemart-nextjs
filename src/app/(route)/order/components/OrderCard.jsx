import { MongooseConnection } from "@/tools/configs/MongooseConnection";
import { NextResponse } from "next/server";
import { Product } from "@/tools/models/Product";
import { Category } from "@/tools/models/Category";
import { SubCategory } from "@/tools/models/SubCategory";

export async function GET(req, res) {
  await MongooseConnection();
  await Category?.find();
  await SubCategory?.find();
  try {
    const url = new URL(req.url);
    let q = url?.searchParams.getAll("q");
    console.log(q.join(""));
    let query = {};
    if (q.includes("isfeatured=true", "isoffer=true")) {
      query = { isInOffer: true, isFeatured: true };
    } else if (q.includes("isfeaturedonly=true")) {
      query = { isFeatured: true };
    } else if (q.includes("WomensClothing=true")) {
      query = {
        category: "665764802b778fda350d2d7f",
      };
    } else if (q.includes("MensClothing=true")) {
      query = {
        category: "665764802b778fda350d2d7e",
      };
    } else if (q.includes("SmartPhone=true")) {
      query = { category: "665764802b778fda350d2d79" };
    } else if (q.includes("isInOffer=true")) {
      query = { finalPrice: { $gt: 999, $lt: 5000 } };
    } else if (q.includes("Laptop=true", "Tv=true")) {
      query = {
        category: "665764802b778fda350d2d7a",
        category: "6658121a2b778fda350d3088",
      };
    } else if (q.includes("KitchenAppliances=true")) {
      query = { category: "665764802b778fda350d2d84" };
    } else if (q.includes("Airpods=true")) {
      query = { category: "665764802b778fda350d2d7c" };
    } else {
      const searchQuery = q.join(" ");
      const regex = new RegExp(searchQuery, "i", "g");
      query = {
        $or: [{ name: regex }, { description: regex }],
      };
    }

    const product = await Product.find(query)
      .populate({
        path: "category",
        select: "-_id -description -image -__v ",
        populate: {
          path: "parentCategory",
          model: "category",
          select: "-_id -description -image -__v",
        },
      })
      .select(" -__