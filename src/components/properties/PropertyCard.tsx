import { ArrowDown } from "lucide-react";
import OnRealApi from "../../utils/api/onreal";
import { useEffect, useState } from "react";
import { Property, UserTokenData } from "../../utils/interfaces/interfaces";
import { useQuery } from "@tanstack/react-query";
interface PropertyCardProps {
  property: UserTokenData;
  showAuctionButton?: boolean;
  onAuction?: (id: string) => void;
}

export default function PropertyCard({
  property,
  showAuctionButton,
  onAuction,
}: PropertyCardProps) {
  const [token, setToken] = useState<Property>();
  const { data } = useQuery({
    queryKey: ["property", Number(property.tokenId)],
    queryFn: () => {
      const api = new OnRealApi();
      return api.getBySmartId(Number(property.tokenId));
    },
    enabled: !!property.tokenId,
  });
  useEffect(() => {
   const fetchData = async () => {
  const api = new OnRealApi();
  const propertyValue = await api.getBySmartId(Number(property.tokenId));
  setToken(propertyValue);
   };
   fetchData();
  }, [data]);

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm">
      <div className="relative">
        <img
          src={token?.images ? token.images.split(",")[0] : ""}
          alt={property.name}
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
        <h3 className="font-semibold">{property.name}</h3>
        <p className="text-sm text-gray-600">{token?.propertyLocation}</p>

        <div className="mt-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">{token?.price} USDT</p>
            <p className="text-sm text-gray-600">
              {token?.annualYield}% Annual yield
            </p>
          </div>
          {showAuctionButton && (
            <button
              onClick={() =>
                property.tokenId && onAuction?.(token?.smartContractId?.toString() || "")
              }
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
