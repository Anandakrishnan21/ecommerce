"use client";
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { formatCurrency } from "../../../lib/formatter";
import { Button } from "@/components/ui/button";
import FileInput from "./FileInput";
import { useRouter } from "next/navigation";
import ImageInput from "./ImageInput";
import { useToast } from "@/hooks/use-toast";

function ProductForm() {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [filePath, setFilePath] = useState("");
  const [imagePath, setImagePath] = useState("");
  const [count, setCount] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const maxCount = 650;
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleName = (e) => setProductName(e.target.value);

  const handlePriceChange = (e) => {
    const numericValue = Number(e.target.value.replace(/[^\d]/g, ""));
    setPrice(isNaN(numericValue) ? "" : numericValue);
  };

  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    if (value.length <= maxCount) {
      setDescription(value);
      setCount(value.length);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const resExists = await fetch("/api/productExists", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ productName, price }),
      });
      const { productExists } = await resExists.json();

      if (productExists) {
        toast({
          variant: "destructive",
          title: "Product already exists!",
          description: `Product with ${productName} and ${price} already exists`,
        });
        return;
      }

      const res = await fetch("/api/product", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          productName,
          price,
          description,
          filePath,
          imagePath,
        }),
      });

      if (res.ok) {
        e.target.reset();
        toast({
          variant: "success",
          title: "Success",
          description: "Product added successfully!",
        });
        router.push("/admin/products");
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to add product!",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Service error",
        description: "Check the internet connection!",
      });
    }
  };

  if (!isClient) return null;

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
      <div>
        <Label htmlFor="productName">Name</Label>
        <Input
          id="productName"
          name="productName"
          placeholder="Product name"
          value={productName}
          onChange={handleName}
          required
        />
      </div>
      <div>
        <Label htmlFor="price">Price</Label>
        <Input
          id="price"
          name="price"
          placeholder="Product price"
          value={price ? formatCurrency(price) : ""}
          onChange={handlePriceChange}
          required
        />
        <div className="text-sm mt-1">
          {price ? formatCurrency(price) : "₹0"}
        </div>
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          placeholder="Product description"
          value={description}
          onChange={handleDescriptionChange}
          required
        />
        <div className="text-sm mt-1">{count} / 650</div>
      </div>
      <div className="flex gap-2">
        <div>
          <Label htmlFor="file">File</Label>
          <FileInput id="file" name="file" setFilePath={setFilePath} />
        </div>
        <div>
          <Label htmlFor="image">Image</Label>
          <ImageInput id="image" name="image" setImagePath={setImagePath} />
        </div>
      </div>
      <Button type="submit" variant="default">
        Save
      </Button>
    </form>
  );
}

export default ProductForm;
