import Coupon from "@/model/Coupon";
import { connection } from "@/utils/db";
import { NextResponse } from "next/server";

export const POST = async (req, res) => {
  try {
    const { couponCode, type, limit, expiresAt, productName } =
      await req.json();
    await connection();
    const coupons = await Coupon.create({
      couponCode,
      type,
      limit,
      expiresAt,
      productName,
    });
    return NextResponse.json(
      { message: "Coupon created successfully", coupons },
      {
        status: 201,
      }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while creating the coupon" },
      { status: 500 }
    );
  }
};
