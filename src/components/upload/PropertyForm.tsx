import { useState } from 'react';

interface PropertyFormData {
  title: string;
  location: string;
  category: string;
  annualYield: number;
  units: number;
  pricePerUnit: number;
  description: string;
}

interface PropertyFormProps {
  onSubmit: (data: PropertyFormData) => void;
}

export default function PropertyForm({ onSubmit }: PropertyFormProps) {
  const [formData, setFormData] = useState<PropertyFormData>({
    title: '',
    location: '',
    category: 'Apartment',
    annualYield: 0,
    units: 0,
    pricePerUnit: 0,
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Property Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Property name"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Property Location</label>
        <input
          type="text"
          value={formData.location}
          onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Enter your property location here"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Property Category</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option>Apartment</option>
            <option>House</option>
            <option>Land</option>
            <option>Commercial</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Annual Yield (%)</label>
          <input
            type="number"
            value={formData.annualYield}
            onChange={(e) => setFormData(prev => ({ ...prev, annualYield: Number(e.target.value) }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">No. of Units</label>
          <input
            type="number"
            value={formData.units}
            onChange={(e) => setFormData(prev => ({ ...prev, units: Number(e.target.value) }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Price per Unit (USDT)</label>
          <input
            type="number"
            value={formData.pricePerUnit}
            onChange={(e) => setFormData(prev => ({ ...prev, pricePerUnit: Number(e.target.value) }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Property Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Give a brief description of the property"
        />
      </div>

      <div className="flex gap-4">
        <button
          type="button"
          className="flex-1 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Save & sell later
        </button>
        <button
          type="submit"
          className="flex-1 rounded-md border border-transparent bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
        >
          Publish for sale
        </button>
      </div>
    </form>
  );
}