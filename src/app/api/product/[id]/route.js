import Product from "@/model/Product";
import { connection } from "@/utils/db";
import { NextResponse } from "next/server";

export const DELETE = async (req, context) => {
  try {
    const { id } = await context.params;
    await connection();
    await Product.findByIdAndDelete(id);
    const products = await Product.find().sort({ createdAt: -1 });
    return new NextResponse(JSON.stringify(products), { status: 200 });
  } catch (error) {
    return new NextResponse(
      { message: "Error while deleting product" + error },
      { status: 500 }
    );
  }
};
