import PageHeader from "@/app/admin/_components/PageHeader";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

function ProductPage() {
  return (
    <div className="flex justify-between items-center gap-4">
      <PageHeader>Products</PageHeader>
      <Button asChild variant="outline" size="sm">
        <Link href="/admin/products/new">Create product</Link>
      </Button>
    </div>
  );
}

export default ProductPage;
