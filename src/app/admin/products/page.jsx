"use client";
import PageHeader from "@/app/admin/_components/PageHeader";
import React from "react";
import ProductTable from "./new/_components/ProductTable";
import CreateFormBtn from "../_components/CreateFormBtn";

function ProductPage() {
  return (
    <>
      <div className="flex justify-between items-center gap-4 mb-2">
        <PageHeader>Products</PageHeader>
        <CreateFormBtn link="/admin/products/new">
          Create products
        </CreateFormBtn>
      </div>
      <ProductTable />
    </>
  );
}

export default ProductPage;
