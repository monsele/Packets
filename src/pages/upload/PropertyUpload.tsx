import { useState } from 'react';
import ImageUpload from '../../components/upload/ImageUpload';
import PropertyForm from '../../components/upload/PropertyForm';

export default function PropertyUpload() {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  const handleImageSelect = (files: FileList) => {
    const newImages = Array.from(files).map(file => URL.createObjectURL(file));
    setSelectedImages(prev => [...prev, ...newImages].slice(0, 5));
  };

  const handleRemoveImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (formData: any) => {
    console.log('Form submitted:', { ...formData, images: selectedImages });
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