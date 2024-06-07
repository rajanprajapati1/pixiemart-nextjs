import { MongooseConnection } from "@/tools/configs/MongooseConnection";
import { Category } from "@/tools/models/Category";
import { SubCategory } from "@/tools/models/SubCategory";
import { NextResponse } from "next/server";

// export async function POST(req, res) {
//   const { name, description, image } = await req.json();
//   try {
//     const newCategory = await Category.create({
//       name,
//       description,
//       image,
//     });
//     return NextResponse.json({
//       msg: "category Created Successfully",
//       success: true,
//       newCategory: newCategory,
//     });
//   } catch (error) {
//     return NextResponse.json({ msg: "failed to Post category", error: error });
//   }
// }

export async function GET(req, res) {
  await MongooseConnection();
  await Category?.find()
  try {
    const category = await SubCategory?.find({})?.populate("parentCategory");
    const parentCategoryNames = category?.map((subcat) => subcat?.name);
    const uniqueCategoryNames = [...new Set(parentCategoryNames)];
    return NextResponse.json({
      msg: "category List",
      SubCategory: category,
      category: uniqueCategoryNames,
    });
  } catch (error) {
    return NextResponse.json({ msg: "category fetch to failed", error: error });
  }
}
