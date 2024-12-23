import { useState } from 'react';
import PropertyCard from '../components/PropertyCard';

const CATEGORIES = ['Lands', 'Houses', 'Commercial', 'Apartment'];

const SAMPLE_PROPERTIES = [
  {
    id: '1',
    title: 'Lekki Court Yard',
    location: 'Island, Lagos Nigeris',
    price: { eth: 0.02, usdt: 50000 },
    annualYield: 10,
    bidders: 200,
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
    owner: 'Adrone Homes'
  },
  {
    id: '2',
    title: 'Lekki Court Yard',
    location: 'Island, Lagos Nigeris',
    price: { eth: 0.02, usdt: 50000 },
    annualYield: 10,
    bidders: 200,
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
    owner: 'Adrone Homes'
  },
  {
    id: '3',
    title: 'Lekki Court Yard',
    location: 'Island, Lagos Nigeris',
    price: { eth: 0.02, usdt: 50000 },
    annualYield: 10,
    bidders: 200,
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
    owner: 'Adrone Homes'
  },
  {
    id: '4',
    title: 'Lekki Court Yard',
    location: 'Island, Lagos Nigeris',
    price: { eth: 0.02, usdt: 50000 },
    annualYield: 10,
    bidders: 200,
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
    owner: 'Adrone Homes'
  },
  // Add more sample properties as needed
];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('Houses');

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="flex items-center justify-center gap-8 mb-8">
        {CATEGORIES.map((category) => (
          <button
            key={category}
            className={`px-6 py-2 rounded-full ${
              activeCategory === category
                ? 'bg-blue-100 text-blue-600'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {SAMPLE_PROPERTIES.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
}