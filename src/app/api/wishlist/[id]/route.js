import { MongooseConnection } from "@/tools/configs/MongooseConnection";
import { User } from "@/tools/models/User";
import { Wishlist } from "@/tools/models/Wishlist";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  await MongooseConnection();
  try {
    const { id } = res.params;
    const userExist = await User.findById(id);
    if (!userExist) {
      return NextResponse.json({
        msg: "User Does Not Exist",
        success: false,
      });
    }
    const wishlist = await Wishlist.find({
      user: id,
    })
    .populate({
      path: 'product',
      select: '-size -color',
      populate: {
        path: 'category',
        populate: {
          path: 'parentCategory',
        },
      },
    });
    return NextResponse.json({
      msg: "Wishlist Fetched Successfully",
      success: true,
      Wishlist:
        wishlist.length === 0 ? "No items In Wishlist" : wishlist.length,
      item: wishlist,
    });
  } catch (error) {
    return NextResponse.json({
      msg: "Error While  Fetching Wishlist",
      success: false,
      error: error,
    });
  }
}

export async function DELETE(req, res) {
  await MongooseConnection();
  try {
    const { id } = res.params;
    const { WishlistId } = await req.json();

    const WishlistItem = await Wishlist.findOne({
      _id: WishlistId,
      user: id,
    });
    if (!WishlistItem) {
      return NextResponse.json({
        msg: "Wishlist Item Doenst Exists",
        success: false,
      });
    }
    const DeleteWishlist = await Wishlist.deleteOne({
      _id: WishlistId,
    });
    return NextResponse.json({
      msg: "Wishlist Item Deleted Successfully",
      success: true,
      DeleteWishlist,
    });
  } catch (error) {
    return NextResponse.json({
      msg: "Wishlist Item Deletion Failed ",
      success: false,
    });
  }
}
