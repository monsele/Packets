import { useEffect, useState } from "react";
import ActivityStats from "../../components/dashboard/ActivityStats";
import PropertyGrid from "../../components/properties/PropertyGrid";

import { EstatePoolView } from "../../utils/smartContract";
import { useAccount } from "wagmi";
//import { toast } from 'sonner';
import { UserTokenData } from "../../utils/interfaces/interfaces";
import { useQuery } from "@tanstack/react-query";
import PropertyCard from "../../components/PropertyCard";
import PropertyCard2 from "../../components/PropertyCard2";

// const SAMPLE_PROPERTIES: UserTokenData[] = [
//   {
//     tokenId: 1n,
//     propertyTitle: 'Lekki Court Yard',
//     propertyLocation: 'Island, Lagos Nigeria',
//     price: 500,
//     annualYield: 10,
//     images: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
//     propertyCategory: 'Residential',
//     units: 0
//   },
//   // Add more sample properties as needed
// ];

const ACTIVITY_STATS = [
  { label: "Total Value", value: "$75,620", icon: "bg-blue-100 text-blue-600" },
  { label: "Units", value: "500", icon: "bg-green-100 text-green-600" },
  { label: "Unit Value", value: "$620", icon: "bg-yellow-100 text-yellow-600" },
];

export default function Properties() {
  const [properties] = useState<UserTokenData[]>([]);
  const { address } = useAccount();
  const { data: userData } = useQuery({
    queryKey: ["user", address],
    queryFn: () => EstatePoolView.getUserTokensData(address as `0x${string}`),
    enabled: !!address,
  });
  useEffect(() => {
    if (userData) {
      console.log("User properties:", userData);
    }
  }, [userData]);
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">My Properties</h2>
      </div>

      <ActivityStats stats={ACTIVITY_STATS} />
      {
        // Display properties if there are any
        userData && userData.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {properties.map((property) => (
                 <PropertyCard2
                   key={property.tokenId}
                 />
               ))}
             </div>
        )
      }
    </div>
  );
}
