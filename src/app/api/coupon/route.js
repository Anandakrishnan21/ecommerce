import Coupon from "@/model/Coupon";
import { connection } from "@/utils/db";
import { NextResponse } from "next/server";

export const POST = async (req, res) => {
  try {
    const { couponCode, type, usersCount, limit, expiresAt, productName } =
      await req.json();
    await connection();
    const coupons = await Coupon.create({
      couponCode,
      type,
      usersCount,
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

export const GET = async (req) => {
  try {
    await connection();
    const coupons = await Coupon.find().sort({ createdAt: -1 });
    return new NextResponse(JSON.stringify(coupons), { status: 200 });
  } catch (error) {
    return new NextResponse(
      "An error occurred while retrieving coupons" + error,
      { status: 500 }
    );
  }
};
