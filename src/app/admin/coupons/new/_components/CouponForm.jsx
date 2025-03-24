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
import { formatDate } from "@/lib/formatter";
import { getProducts } from "@/utils/api";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useState } from "react";
import * as yup from "yup";

function CouponForm() {
  const { toast } = useToast();
  const [products, setProducts] = useState([]);
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [type, setType] = useState("percentage");
  const [limit, setLimit] = useState(0);
  const [usersCount, setUsersCount] = useState(0);
  const [expiresAt, setExpiresAt] = useState();
  const [productName, setProductName] = useState("");
  const [errors, setErrors] = useState({});

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const couponData = {
      couponCode,
      type,
      usersCount: parseInt(usersCount),
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

      const res = await fetch("/api/coupon", {
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
        router.push("/admin/coupons");
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
            setLimit(0);
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
          value={usersCount}
          onChange={(e) => {
            if (/^\d*\.?\d*$/.test(e.target.value)) {
              setUsersCount(e.target.value);
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
        <Select onValueChange={setProductName}>
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

export default CouponForm;
