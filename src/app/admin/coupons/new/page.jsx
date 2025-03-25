import React from "react";
import PageHeader from "../../_components/PageHeader";
import CouponForm from "./_components/CouponForm";

function CouponCreationForm() {
  return (
    <div>
      <PageHeader variant="large">Create a new coupon</PageHeader>
      <div className="w-3/4 pt-4">
        <CouponForm />
      </div>
    </div>
  );
}

export default CouponCreationForm;
