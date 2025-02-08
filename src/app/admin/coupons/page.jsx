import React from "react";
import PageHeader from "../_components/PageHeader";
import CreateFormBtn from "../_components/CreateFormBtn";

function CouponsPage() {
  return (
    <div className="flex justify-between items-center gap-4 mb-2">
      <PageHeader>Coupons</PageHeader>
      <CreateFormBtn link="/admin/coupons/new">Create coupons</CreateFormBtn>
    </div>
  );
}

export default CouponsPage;
