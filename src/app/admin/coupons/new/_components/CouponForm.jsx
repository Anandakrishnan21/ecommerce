"use client";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { formatDate } from "@/lib/formatter";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useState } from "react";
import * as yup from "yup";

function CouponForm() {
  const { toast } = useToast();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [type, setType] = useState("percentage");
  const [limit, setLimit] = useState("");
  const [expiresAt, setExpiresAt] = useState();
  const [productName, setProductName] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setIsClient(true);
  });

  const couponSchema = yup.object().shape({
    couponCode: yup.string().required("Code is required"),
    type: yup.string().required("Type is required"),
    limit: yup.number().typeError("Type should be number"),
    expiresAt: yup.string().required("Expired date is required"),
    productName: yup.string().required("Product name is required"),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const couponData = {
      couponCode,
      type,
      limit: parseInt(limit),
      expiresAt: expiresAt ? formatDate(expiresAt) : "",
      productName,
    };

    try {
      await couponSchema.validate(couponData, { abortEarly: false });
      setErrors({});

      const resExists = await fetch("/api/couponExists", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ couponCode, type, productName }),
      });

      const { couponExists } = await resExists.json();

      if (couponExists) {
        toast({
          variant: "destructive",
          title: "Coupon already exists!",
          description: "Coupon with similar data is already exists",
        });
        return;
      }

      const res = await fetch("/api/coupons", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(couponData),
      });

      if (res.ok) {
        e.target.reset();
        toast({
          variant: "success",
          title: "Success",
          description: "Coupon added successfully!",
        });
        router.push("/admin/coupon");
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to add coupon!",
        });
      }
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const newError = {};
        error.inner.forEach((err) => {
          newError[err.path] = err.message;
        });
        setErrors(newError);
      } else {
        toast({
          variant: "destructive",
          title: "Service error",
          description: "Check your internet connection!",
        });
      }
    }
  };

  if (!isClient) return null;

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <Label htmlFor="code">Code</Label>
        <Input
          placeholder="Coupon code"
          id="code"
          name="code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="discount">Discount Type</Label>
        <RadioGroup defaultValue={type} onValueChange={setType}>
          <div className="flex gap-2 items-center">
            <RadioGroupItem value="percentage" id="percentage" />
            <Label htmlFor="percentage">Percentage</Label>
          </div>
          <div className="flex gap-2 items-center">
            <RadioGroupItem value="fixed" id="fixed" />
            <Label htmlFor="fixed">Fixed</Label>
          </div>
        </RadioGroup>
      </div>
      <div className="space-y-2">
        <Label htmlFor="limit">Limit</Label>
        <Input
          placeholder="Limit"
          id="limit"
          name="limit"
          value={limit}
          onChange={(e) => setLimit(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="expiration">Expires At</Label>
        <DatePicker date={expiresAt} setDate={setExpiresAt} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="productName">Product Name</Label>
        <Input
          placeholder="Product Name"
          id="productName"
          name="productName"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
      </div>
      <Button type="submit" variant="default">
        Save
      </Button>
    </form>
  );
}

export default CouponForm;
