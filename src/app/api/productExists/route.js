import Product from "@/model/Product";
import { connection } from "@/utils/db";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    const { productName, price } = await req.json();
    await connection();

    const product = await Product.findOne({ productName, price }).select("_id");
    const productExists = !!product;

    return NextResponse.json({ productExists });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
