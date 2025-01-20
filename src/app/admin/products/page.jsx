"use client";
import PageHeader from "@/app/admin/_components/PageHeader";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import ProductTable from "../_components/ProductTable";

function ProductPage() {
  return (
    <>
      <div className="flex justify-between items-center gap-4 mb-2">
        <PageHeader>Products</PageHeader>
        <Button asChild variant="outline" size="sm">
          <Link href="/admin/products/new">Create product</Link>
        </Button>
      </div>
      <ProductTable />
    </>
  );
}

export default ProductPage;
