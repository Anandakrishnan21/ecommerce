import PageHeader from "@/app/admin/_components/PageHeader";
import React from "react";
import UpdateProductForm from "./_component/UpdateProductForm";

const getProducts = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/api/product/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch the product");
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching product", error);
  }
};

async function UpdateProductPage({ params }) {
  const { id } = await params;
  const product = await getProducts(id);

  const {
    productName,
    price,
    description,
    filePath,
    imagePath,
    isAvailableForPurchase,
  } = product;

  return (
    <div>
      <PageHeader>Update the product</PageHeader>
      <div className="w-3/4 pt-4">
        <UpdateProductForm
          id={id}
          productName={productName}
          price={price}
          description={description}
          filePath={filePath}
          imagePath={imagePath}
          isAvailableForPurchase={isAvailableForPurchase}
        />
      </div>
    </div>
  );
}

export default UpdateProductPage;
