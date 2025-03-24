"use client";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { getProducts } from "@/utils/api";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import * as yup from "yup";

function UpdatedCouponForm({
  id,
  couponCode: initialCouponCode,
  type: initialType,
  usersCount: initialUsersCount,
  limit: initialLimit,
  expiresAt: initialExpiresAt,
  productName: initialProductName,
}) {
  const { toast } = useToast();
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [couponCode, setCouponCode] = useState(initialCouponCode);
  const [type, setType] = useState(initialType);
  const [usersCount, setUsersCount] = useState(initialUsersCount || 0);
  const [limit, setLimit] = useState(initialLimit);
  const [expiresAt, setExpiresAt] = useState(initialExpiresAt);
  const [productName, setProductName] = useState(initialProductName);
  const [errors, setErrors] = useState({});
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: error,
        });
      }
    };
    fetchData();
  }, [toast]);

  const couponSchema = yup.object().shape({
    couponCode: yup.string().required("Coupon code is required"),
    type: yup.string().required("Type is required"),
    usersCount: yup.number().typeError("Customer count should be number"),
    limit: yup.number().typeError("Type should be number"),
    expiresAt: yup.string(),
    productName: yup.string().required("Product name is required"),
  });

  const handleUpdateCoupon = async (e) => {
    e.preventDefault();

    if (
      couponCode === initialCouponCode &&
      type === initialType &&
      limit === initialLimit &&
      productName === initialProductName
    ) {
      toast({
        variant: "destructive",
        title: "No changes detected!",
        description: "You haven't modified any coupon details",
      });
      return;
    }

    const couponData = {
      couponCode,
      type,
      usersCount: parseFloat(usersCount),
      limit: parseFloat(limit),
      expiresAt,
      productName,
    };

    try {
      await couponSchema.validate(couponData, { abortEarly: false });
      setErrors({});

      const res = await fetch(`/api/coupon/${id}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(couponData),
      });

      if (res.ok) {
        toast({
          variant: "success",
          title: "Success",
          description: "Coupon updated successfully!",
        });
        router.push("/admin/coupons");
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to update coupon!",
        });
      }
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const newErrors = {};
        error.inner.forEach((err) => {
          newErrors[err.path] = err.message;
        });
        setErrors(newErrors);
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
    <form className="flex flex-col gap-2" onSubmit={handleUpdateCoupon}>
      <div className="space-y-2">
        <Label htmlFor="code" variant="required">
          Coupon Code
        </Label>
        <Input
          placeholder="Coupon code"
          id="code"
          name="code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
        />
        {errors.couponCode && (
          <div className="text-red-600 text-sm">{errors.couponCode}</div>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="discount">Discount Type</Label>
        <RadioGroup
          defaultValue={type}
          onValueChange={(value) => {
            setType(value);
            if (value === initialType) {
              setLimit(initialLimit);
            } else {
              setLimit(0);
            }
          }}
        >
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
        <p className="text-sm">{type === "percentage" ? limit + "%" : limit}</p>
        <Slider
          value={[limit]}
          max={type === "percentage" ? 50 : 200}
          onValueChange={(value) => setLimit(value)}
          step={10}
        />
        {errors.limit && (
          <div className="text-red-600 text-sm">{errors.limit}</div>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="usersCount">Limit</Label>
        <Input
          placeholder="Limit"
          value={!usersCount ? 0 : usersCount}
          onChange={(e) => {
            if (/^\d*\.?\d*$/.test(e.target.value)) {
              !usersCount ? setUsersCount(0) : setUsersCount(e.target.value);
            }
          }}
        />
        {errors.usersCount && (
          <div className="text-red-600 text-sm">{errors.usersCount}</div>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="expiration">Expires At</Label>
        <DatePicker date={expiresAt} setDate={setExpiresAt} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="productName" variant="required">
          Product Name
        </Label>
        <Select onValueChange={setProductName} defaultValue={productName}>
          <SelectTrigger>
            <SelectValue placeholder="Product name" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All products">All products</SelectItem>
            {products.map((product) => (
              <SelectItem value={product.productName} key={product._id}>
                {product.productName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.productName && (
          <div className="text-red-600 text-sm">{errors.productName}</div>
        )}
      </div>
      <Button type="submit" variant="default">
        Save
      </Button>
    </form>
  );
}

export default UpdatedCouponForm;
