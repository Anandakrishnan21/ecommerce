import PageHeader from "@/app/admin/_components/PageHeader";
import React from "react";
import UpdatedCouponForm from "./_components/UpdatedCouponForm";

const getCoupons = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/api/coupon/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch the coupon");
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching product", error);
  }
};
async function UpdateCouponPage({ params }) {
  const { id } = await params;
  const coupon = await getCoupons(id);
  const { couponCode, type, usersCount, limit, expiresAt, productName } =
    coupon;
  return (
    <div>
      <PageHeader>Update the coupon</PageHeader>
      <div className="w-3/4 pt-4">
        <UpdatedCouponForm
          id={id}
          couponCode={couponCode}
          type={type}
          usersCount={usersCount}
          limit={limit}
          expiresAt={expiresAt}
          productName={productName}
        />
      </div>
    </div>
  );
}

export default UpdateCouponPage;
