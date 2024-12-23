import { Property } from '../../types';
import PropertyCard from './PropertyCard';

interface PropertyGridProps {
  properties: Property[];
  onAuction?: (id: string) => void;
}

export default function PropertyGrid({ properties, onAuction }: PropertyGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((property) => (
        <PropertyCard 
          key={property.id} 
          property={property}
          onAuction={onAuction}
          showAuctionButton={!!onAuction}
        />
      ))}
    </div>
  );
}