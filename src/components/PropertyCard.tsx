import { Link } from 'react-router-dom';
import type { Property } from '../types';

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <Link to={`/property/${property.id}`}>
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
          <h3 className="font-semibold text-lg">{property.title}</h3>
          <p className="text-gray-600 text-sm">{property.location}</p>
          
          <div className="mt-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">
                {property.price.eth} ETH <span className="text-xs">MIN</span>
              </p>
            </div>
            <div className="text-sm text-gray-600">
              {property.bidders} Bidders
            </div>
          </div>
          
          <button className="mt-4 w-full py-2 text-blue-600 font-medium border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
            Join Bid
          </button>
        </div>
      </Link>
    </div>
  );
}