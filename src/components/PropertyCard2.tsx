import { Link } from 'react-router-dom';
import { PropertyType } from '../utils/interfaces/interfaces';

interface PropertyCardProps {
  property: PropertyType;
}

export default function PropertyCard() {
  
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <Link to={`/property/${1}`}>
        <div className="relative">
          <img
            src={
              "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800"
            }
            alt={"Property"}
            className="w-full h-48 object-cover"
          />
          <div className="absolute bottom-2 left-2 flex gap-1">
            {[1, 2, 3, 4, 5].map((dot) => (
              <div
                key={dot}
                className={`w-2 h-2 rounded-full ${
                  dot === 1 ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="p-4">
          <h3 className="font-semibold text-lg">{"Test"}</h3>
          <p className="text-gray-600 text-sm">{"Test"}</p>

          <div className="mt-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">
                {property.price} ETH <span className="text-xs">MIN</span>
              </p>
            </div>
            <div className="text-sm text-gray-600">{500} Units</div>
          </div>

          <button className="mt-4 w-full py-2 text-blue-600 font-medium border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
            Buy
          </button>
        </div>
      </Link>
    </div>
  );
}