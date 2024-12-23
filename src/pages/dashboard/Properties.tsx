import { useState } from 'react';
import ActivityStats from '../../components/dashboard/ActivityStats';
import PropertyGrid from '../../components/properties/PropertyGrid';
import { Property } from '../../types';

const SAMPLE_PROPERTIES: Property[] = [
  {
    id: '1',
    title: 'Lekki Court Yard',
    location: 'Island, Lagos Nigeria',
    price: { eth: 0.02, usdt: 50000 },
    annualYield: 10,
    bidders: 200,
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
    owner: 'Adrone Homes'
  },
  // Add more sample properties as needed
];

const ACTIVITY_STATS = [
  { label: 'Total Value', value: '$75,620', icon: 'bg-blue-100 text-blue-600' },
  { label: 'Units', value: '500', icon: 'bg-green-100 text-green-600' },
  { label: 'Unit Value', value: '$620', icon: 'bg-yellow-100 text-yellow-600' }
];

export default function Properties() {
  const [properties] = useState<Property[]>(SAMPLE_PROPERTIES);

  const handleAuction = (id: string) => {
    console.log('Auction property:', id);
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">My Properties</h2>
      </div>

      <ActivityStats stats={ACTIVITY_STATS} />
      <PropertyGrid properties={properties} onAuction={handleAuction} />
    </div>
  );
}