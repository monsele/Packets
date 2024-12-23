import { useState } from 'react';
import { Upload, X } from 'lucide-react';

interface ImageUploadProps {
  onImageSelect: (files: FileList) => void;
  selectedImages: string[];
  onRemoveImage: (index: number) => void;
}

export default function ImageUpload({ onImageSelect, selectedImages, onRemoveImage }: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onImageSelect(e.dataTransfer.files);
    }
  };

  return (
    <div className="space-y-4">
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center ${
          isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <Upload className="mx-auto h-12 w-12 text-gray-400" />
        <div className="mt-4">
          <label htmlFor="file-upload" className="cursor-pointer text-blue-600 hover:text-blue-500">
            Upload property image
          </label>
          <input
            id="file-upload"
            type="file"
            className="hidden"
            accept="image/*"
            multiple
            onChange={(e) => e.target.files && onImageSelect(e.target.files)}
          />
          <p className="text-sm text-gray-500 mt-1">up to 5 images</p>
          <p className="text-xs text-gray-400">Max upload size 20MB</p>
        </div>
      </div>

      {selectedImages.length > 0 && (
        <div className="flex gap-2 overflow-x-auto py-2">
          {selectedImages.map((image, index) => (
            <div key={index} className="relative">
              <img src={image} alt={`Preview ${index}`} className="h-20 w-20 object-cover rounded" />
              <button
                onClick={() => onRemoveImage(index)}
                className="absolute -top-2 -right-2 bg-white rounded-full p-0.5 shadow-md"
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}