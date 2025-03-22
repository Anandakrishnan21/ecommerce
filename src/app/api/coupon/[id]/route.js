import Coupon from "@/model/Coupon";
import { connection } from "@/utils/db";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  try {
    const { id } = await params;
    await connection();
    const coupon = await Coupon.findById(id);
    if (!coupon) {
      return new NextResponse(JSON.stringify({ message: "Coupon not found" }), {
        status: 404,
      });
    }
    return new NextResponse(JSON.stringify(coupon), { status: 200 });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "Failed to fetch the coupon" }),
      { status: 500 }
    );
  }
};

export const PUT = async (req, { params }) => {
  try {
    const { id } = await params;
    const updatedData = await req.json();

    await connection();
    const updatedCoupon = await Coupon.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (!updatedCoupon) {
      return new NextResponse(JSON.stringify({ message: "Coupon not found" }), {
        status: 404,
      });
    }
    return new NextResponse(JSON.stringify(updatedCoupon), { status: 200 });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "Failed to updated the coupon" }),
      { status: 201 }
    );
  }
};

export const DELETE = async (req, { params }) => {
  try {
    const { id } = await params;
    await connection();
    const deletedCoupon = await Coupon.findOneAndDelete(id);

    if (!deletedCoupon) {
      return new NextResponse(JSON.stringify({ message: "Coupon not found" }), {
        status: 404,
      });
    }

    const coupons = await Coupon.find().sort({ createdAt: -1 });
    return new NextResponse(JSON.stringify(coupons), { status: 200 });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "Failed to delete the coupon" }),
      { status: 500 }
    );
  }
};
