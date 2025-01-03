import Product from "@/model/Product";
import { connection } from "@/utils/db";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    const {
      productName,
      price,
      description,
      filePath,
      imagePath,
      isAvailableForPurchase = true,
    } = await req.json();

    await connection();

    const product = await Product.create({
      productName,
      price,
      description,
      filePath,
      imagePath,
      isAvailableForPurchase,
    });

    return NextResponse.json(
      { message: "Product added successfully", product },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "An error occurred while creating the product",
      },
      { status: 500 }
    );
  }
};
