import { RefreshCw } from "lucide-react";
import { useState } from "react";

interface PropertyFormData {
  title: string;
  location: string;
  category: string;
  annualYield: string;
  units: string;
  pricePerUnit: string;
  description: string;
}

interface PropertyFormProps {
  onSubmit: (data: PropertyFormData) => void;
  isSubmitting?: boolean;
}

export default function PropertyForm({ onSubmit, isSubmitting = false }: PropertyFormProps) {
  const [formData, setFormData] = useState<PropertyFormData>({
    title: "",
    location: "",
    category: "Apartment",
    annualYield: "",
    units: "",
    pricePerUnit: "",
    description: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };
  const inputClasses =
    "mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200";
  const selectClasses =
    "mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Property Title
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, title: e.target.value }))
          }
          className={inputClasses}
          placeholder="Property name"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Property Location
        </label>
        <input
          type="text"
          value={formData.location}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, location: e.target.value }))
          }
          className={inputClasses}
          placeholder="Enter your property location here"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Property Category
          </label>
          <select
            value={formData.category}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, category: e.target.value }))
            }
            className={selectClasses}
          >
            <option>Apartment</option>
            <option>House</option>
            <option>Land</option>
            <option>Commercial</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Annual Yield (%)
          </label>
          <input
            type="number"
            value={formData.annualYield}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, annualYield: e.target.value }))
            }
            className={inputClasses}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            No. of Units
          </label>
          <input
            type="number"
            value={formData.units}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, units: e.target.value }))
            }
            className={inputClasses}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Price per Unit (NGN)
          </label>
          <input
            type="number"
            value={formData.pricePerUnit}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, pricePerUnit: e.target.value }))
            }
            className={inputClasses}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Property Description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, description: e.target.value }))
          }
          rows={4}
          className={inputClasses}
          placeholder="Give a brief description of the property"
        />
      </div>

      <div className="flex gap-4">
        <button
          type="button"
          disabled={isSubmitting}
          className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Save & sell later
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 rounded-lg border border-transparent bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              Publishing...
            </>
          ) : (
            "Publish for sale"
          )}
        </button>
      </div>
    </form>
  );
}
