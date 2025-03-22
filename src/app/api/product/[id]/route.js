import Product from "@/model/Product";
import { connection } from "@/utils/db";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  try {
    const { id } = await params;
    await connection();
    const product = await Product.findById(id);

    if (!product) {
      return new NextResponse(
        JSON.stringify({ message: "Product not found" }),
        { status: 404 }
      );
    }

    return new NextResponse(JSON.stringify(product), { status: 200 });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "Failed to fetch the product" }),
      { status: 500 }
    );
  }
};

export const DELETE = async (req, { params }) => {
  try {
    const { id } = await params;
    await connection();
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return new NextResponse(
        JSON.stringify({ message: "Product not found" }),
        { status: 404 }
      );
    }

    const products = await Product.find().sort({ createdAt: -1 });
    return new NextResponse(JSON.stringify(products), { status: 200 });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "Error while deleting product" }),
      { status: 500 }
    );
  }
};

export const PUT = async (req, { params }) => {
  try {
    const { id } = await params;
    const updatedData = await req.json();

    await connection();
    const updatedProduct = await Product.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (!updatedProduct) {
      return new NextResponse(
        JSON.stringify({ message: "Product not found" }),
        { status: 404 }
      );
    }

    return new NextResponse(JSON.stringify(updatedProduct), { status: 200 });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "Failed to update the product" }),
      { status: 500 }
    );
  }
};
