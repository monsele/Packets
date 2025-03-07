import { Link } from "react-router-dom";
import { PropertyType } from "../utils/interfaces/interfaces";
import { useReadContract } from "wagmi";
import { contractABI, contractAddress } from "../abi/EstatePool";

interface PropertyCardProps {
  property: PropertyType;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const {
    data: availableUnits,
    //isLoading,
  } = useReadContract({
    address: contractAddress,
    abi: contractABI,
    functionName: "getAvailableTokenAmount",
    args: [BigInt(property.smartContractId)],
  });
  console.log(availableUnits);
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <Link to={`/property/${property.id}`}>
        <div className="relative">
          <img
            src={property.images}
            alt={property.propertyTitle}
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
          <h3 className="font-semibold text-lg">{property.propertyTitle}</h3>
          <p className="text-gray-600 text-sm">{property.propertyLocation}</p>

          <div className="mt-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">
                ₦{property.price} <span className="text-xs">per unit</span>
              </p>
            </div>
            <div className="text-sm text-gray-600">
              {Number(availableUnits)} Units
            </div>
          </div>

          <button className="mt-4 w-full py-2 text-blue-600 font-medium border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
            Buy
          </button>
        </div>
      </Link>
    </div>
  );
}
