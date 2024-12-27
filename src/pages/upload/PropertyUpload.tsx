import { useEffect, useState } from "react";
import ImageUpload from "../../components/upload/ImageUpload";
import PropertyForm from "../../components/upload/PropertyForm";
import { handleUploadFile } from "../../utils/firebase/firebase-config";
import { useAccount, useWaitForTransactionReceipt } from "wagmi";
import { toast } from "sonner";
export default function PropertyUpload() {
  const { isConnected, address } = useAccount();
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const handleImageSelect = (files: FileList) => {
    const newImages = Array.from(files).map((file) =>
      URL.createObjectURL(file)
    );
    const newFiles = Array.from(files).map((file) => file);
    setSelectedImages((prev) => [...prev, ...newImages].slice(0, 5));
    setSelectedFiles((prev) => [...prev, ...newFiles]);
  };

  const handleRemoveImage = (index: number) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (formData: any) => {
    //event.preventDefault();
    const data = { ...formData };
    //console.log("data value",data.title);

    if (!isConnected || !address) {
      toast.error("Wallet not connected");
      console.error("Wallet not connected");
      return;
    }

    // //console.log("Form submitted:", { ...formData, images: selectedImages });
    // writeContract({
    //   address: contractAddress,
    //   abi: contractABI,
    //   functionName: "CreateAsset",
    //   args: [
    //     data.title,
    //     BigInt(data.units),
    //     BigInt(Number(data.units)),
    //     Number(1),
    //   ],
    // });
    // console.log("Contract Called");
    
    const uploadPromises = selectedFiles.map(async (sfile) =>{
      console.log("File",sfile);
       return handleUploadFile(sfile);
    });
     const imageUrls = await Promise.all(uploadPromises);
     console.log(imageUrls);
     setImages(imageUrls.filter((url): url is string => url !== null));
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-2xl font-semibold mb-8">List Your Property</h1>

      <div className="bg-white rounded-lg p-6 shadow-sm mb-8">
        <h2 className="text-lg font-medium mb-4">Images of Properties</h2>
        <ImageUpload
          onImageSelect={handleImageSelect}
          selectedImages={selectedImages}
          onRemoveImage={handleRemoveImage}
        />
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h2 className="text-lg font-medium mb-4">Property Brief</h2>
        <PropertyForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
