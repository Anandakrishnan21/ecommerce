import PageHeader from "@/app/admin/_components/PageHeader";
import React from "react";
import ProductForm from "../../_components/ProductForm";

function ProductCreateForm() {
  return (
    <div>
      <PageHeader>Add a new product</PageHeader>
      <div className="w-3/4 pt-4">
        <ProductForm />
      </div>
    </div>
  );
}

export default ProductCreateForm;
