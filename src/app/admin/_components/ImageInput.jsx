"use client";
import React, { useState } from "react";
import { UploadButton } from "@/utils/uploadthing";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";

function ImageInput({ id, name, setImagePath }) {
  const { toast } = useToast();
  const [filePreview, setFilePreview] = useState(null);

  const handleUploadComplete = async (res) => {
    try {
      const uploadedUrl = res[0].url;
      setImagePath(uploadedUrl);
      setFilePreview(uploadedUrl);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to upload file",
      });
    }
  };

  const handleUploadError = (error) => {
    toast({
      variant: "destructive",
      title: "Error",
      description: `${error.message}`,
    });
  };

  return (
    <div className="relative">
      <UploadButton
        id={id}
        name={name}
        className="absolute inset-0 w-20 h-20 opacity-0 cursor-pointer"
        endpoint="imageUploader"
        onClientUploadComplete={handleUploadComplete}
        onUploadError={handleUploadError}
      />
      <div className="w-20 h-20 flex items-center justify-center text-sm border-[1px] border-dashed border-gray-400 rounded-md font-medium hover:border-blue-500 focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50">
        {filePreview ? (
          <Image
            src={filePreview}
            width={55}
            height={50}
            alt="File preview"
            className="object-contain rounded-md"
          />
        ) : (
          <span>+ Upload</span>
        )}
      </div>
    </div>
  );
}

export default ImageInput;
