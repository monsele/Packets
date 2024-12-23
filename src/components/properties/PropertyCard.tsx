import { Property } from '../../types';
import { ArrowDown } from 'lucide-react';

interface PropertyCardProps {
  property: Property;
  showAuctionButton?: boolean;
  onAuction?: (id: string) => void;
}

export default function PropertyCard({ property, showAuctionButton, onAuction }: PropertyCardProps) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm">
      <div className="relative">
        <img
          src={property.imageUrl}
          alt={property.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute bottom-2 left-2 flex gap-1">
          {[1,2,3,4,5].map((dot) => (
            <div
              key={dot}
              className={`w-2 h-2 rounded-full ${dot === 1 ? 'bg-white' : 'bg-white/50'}`}
            />
          ))}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold">{property.title}</h3>
        <p className="text-sm text-gray-600">{property.location}</p>
        
        <div className="mt-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">{property.price.usdt} USDT</p>
            <p className="text-sm text-gray-600">{property.annualYield}% Annual yield</p>
          </div>
          {showAuctionButton && (
            <button
              onClick={() => onAuction?.(property.id)}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
            >
              <span>Auction</span>
              <ArrowDown size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}