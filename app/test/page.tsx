"use client";
import React, { useState } from "react";
import imageCompression from "browser-image-compression";

const ImageUploader = () => {
  const [compressedImage, setCompressedImage] = useState<any>(null);

  const handleImageUpload = async (event: any) => {
    const imageFile = event.target.files[0];
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1024,
      useWebWorker: true,
    };

    try {
      const compressedFile = await imageCompression(imageFile, options);
      const compressedImageURL = URL.createObjectURL(compressedFile);
      setCompressedImage(compressedImageURL);
    } catch (error) {
      console.error("Error compressing image:", error);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {compressedImage && <img src={compressedImage} alt="Compressed Image" />}
    </div>
  );
};

export default ImageUploader;
