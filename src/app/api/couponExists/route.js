import Coupon from "@/model/Coupon";
import { connection } from "@/utils/db";
import { NextResponse } from "next/server";

export const POST = async (req, res) => {
  try {
    const { couponCode, type, productName } = await req.json();
    await connection();
    const coupons = await Coupon.findOne({
      couponCode,
      type,
      productName,
    }).select("_id");
    const couponExists = !!coupons;
    return NextResponse.json({ couponExists });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
