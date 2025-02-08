"use client";
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import FileInput from "../../../_components/FileInput";
import { useRouter } from "next/navigation";
import ImageInput from "./ImageInput";
import { useToast } from "@/hooks/use-toast";
import * as yup from "yup";

function ProductForm() {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [filePath, setFilePath] = useState("");
  const [imagePath, setImagePath] = useState("");
  const [count, setCount] = useState(0);
  const [errors, setErrors] = useState({});
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => setCount(description.length), [description]);

  const productSchema = yup.object().shape({
    productName: yup
      .string()
      .min(1)
      .max(35)
      .required("Product name is required"),
    price: yup
      .number()
      .typeError("Price must be a number")
      .positive("Price must be greater than zero")
      .required("Product price is required"),
    description: yup
      .string()
      .min(1)
      .max(160)
      .required("Product description is required"),
    filePath: yup.string().required("File is required"),
    imagePath: yup.string().required("Image is required"),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      productName,
      price: parseFloat(price),
      description,
      filePath,
      imagePath,
    };

    try {
      await productSchema.validate(productData, { abortEarly: false });
      setErrors({});

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
          description: `Product with "${productName}" and "${price}" already exists`,
        });
        return;
      }

      const res = await fetch("/api/product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
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

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
      <div>
        <Label htmlFor="productName">Name</Label>
        <Input
          id="productName"
          name="productName"
          placeholder="Product name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
        {errors.productName && (
          <div className="text-red-600 text-sm">{errors.productName}</div>
        )}
      </div>

      <div>
        <Label htmlFor="price">Price</Label>
        <Input
          id="price"
          name="price"
          placeholder="Product price"
          value={price}
          onChange={(e) => {
            if (/^\d*\.?\d*$/.test(e.target.value)) {
              setPrice(e.target.value);
            }
          }}
        />
        {errors.price && (
          <div className="text-red-600 text-sm">{errors.price}</div>
        )}
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          placeholder="Product description"
          value={description}
          onChange={(e) => {
            const value = e.target.value;
            if (value.length <= 160) {
              setDescription(value);
              setCount(value.length);
            }
          }}
        />
        <div className="text-sm mt-1">{count} / 160</div>
        {errors.description && (
          <div className="text-red-600 text-sm">{errors.description}</div>
        )}
      </div>

      <div className="flex gap-2">
        <div>
          <Label htmlFor="file">File</Label>
          <FileInput id="file" name="file" setFilePath={setFilePath} />
          {errors.filePath && (
            <div className="text-red-600 text-sm">{errors.filePath}</div>
          )}
        </div>
        <div>
          <Label htmlFor="image">Image</Label>
          <ImageInput id="image" name="image" setImagePath={setImagePath} />
          {errors.imagePath && (
            <div className="text-red-600 text-sm">{errors.imagePath}</div>
          )}
        </div>
      </div>

      <Button type="submit" variant="default">
        Save
      </Button>
    </form>
  );
}

export default ProductForm;
