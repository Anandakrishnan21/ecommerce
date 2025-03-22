"use client";
import FileInput from "@/app/admin/_components/FileInput";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React, { useEffect, useState } from "react";
import ImageInput from "../../../new/_components/ImageInput";
import { Button } from "@/components/ui/button";
import * as yup from "yup";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

function UpdateProductForm({
  id,
  productName: initialProductName,
  price: initialPrice,
  description: initialDescription,
  filePath: initialFilePath,
  imagePath: initialImagePath,
  isAvailableForPurchase: initialStatus,
}) {
  const { toast } = useToast();
  const router = useRouter();
  const [count, setCount] = useState(initialDescription.length);
  const [productName, setProductName] = useState(initialProductName);
  const [price, setPrice] = useState(initialPrice);
  const [description, setDescription] = useState(initialDescription);
  const [filePath, setFilePath] = useState(initialFilePath);
  const [imagePath, setImagePath] = useState(initialImagePath);
  const [isAvailableForPurchase, setAvailableForPurchase] =
    useState(initialStatus);
  const [errors, setErrors] = useState({});
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const productSchema = yup.object().shape({
    productName: yup
      .string()
      .min(1)
      .max(15)
      .required("Product name is required"),
    price: yup
      .number()
      .typeError("Price must be a number")
      .positive("Price must be greater than zero")
      .required("Price is required"),
    description: yup
      .string()
      .min(1)
      .max(160)
      .required("Description is required"),
    filePath: yup.string().required("File path is required"),
    imagePath: yup.string().required("Image path is required"),
    isAvailableForPurchase: yup.boolean(),
  });

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (
      productName === initialProductName &&
      price === initialPrice &&
      description === initialDescription &&
      filePath === initialFilePath &&
      imagePath === initialImagePath
    ) {
      toast({
        variant: "destructive",
        title: "No changes detected!",
        description: "You haven't modified any product details",
      });
      return;
    }

    const productData = {
      productName,
      price: parseFloat(price),
      description,
      filePath,
      imagePath,
      isAvailableForPurchase,
    };

    try {
      await productSchema.validate(productData, { abortEarly: false });
      setErrors({});

      const res = await fetch(`/api/product/${id}`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(productData),
      });

      if (res.ok) {
        toast({
          variant: "success",
          title: "Success",
          description: "Product updated successfully!",
        });
        router.push("/admin/products");
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to update product!",
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
    <form className="flex flex-col gap-2" onSubmit={handleUpdate}>
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
          <FileInput
            id="file"
            name="file"
            filePath={filePath}
            setFilePath={setFilePath}
          />
          {errors.filePath && (
            <div className="text-red-600 text-sm">{errors.filePath}</div>
          )}
        </div>
        <div>
          <Label htmlFor="image">Image</Label>
          <ImageInput
            id="image"
            name="image"
            imagePath={imagePath}
            setImagePath={setImagePath}
          />
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

export default UpdateProductForm;
