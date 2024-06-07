import { MongooseConnection } from "@/tools/configs/MongooseConnection";
import { Order } from "@/tools/models/Order";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  await MongooseConnection();

  try {
    const { id } = res?.params;
    const UserOrder = await Order?.find({userId : id}).limit(8)
    return NextResponse.json({
      msg: "success",
      order: UserOrder,
    });
  } catch (error) {
    return NextResponse.json({
      msg: "failed",
      error: error,
    });
  }
}
