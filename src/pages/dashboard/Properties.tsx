import { useEffect, useState } from "react";
import ActivityStats from "../../components/dashboard/ActivityStats";
import PropertyGrid from "../../components/properties/PropertyGrid";
import { useNavigate } from "react-router-dom";
import { EstatePoolView } from "../../utils/smartContract";

import { toast } from "sonner";
import { UserTokenData } from "../../utils/interfaces/interfaces";

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
  const [properties, setProperties] = useState<UserTokenData[]>([]);
  const navigate = useNavigate();
  console.log(localStorage.getItem("userWalletAddress"));
  //  const { data: userData } = useQuery({
  //    queryKey: ["user", localStorage.getItem("userWalletAddress")],
  //    queryFn: () => EstatePoolView.getUserTokensData((localStorage.getItem("userWalletAddress") as `0x${string}`)),

  //  });
  // console.log(userData);
  useEffect(() => {
    const fetchData = async () => {
      const userAddress = localStorage.getItem("userWalletAddress");
      if (userAddress === null) {
        toast.error("User is not logged in");
        return;
      }
      const test = await EstatePoolView.getUserTokensData(
        localStorage.getItem("userWalletAddress") as `0x${string}`
      );
      const result = new Array<UserTokenData>();
       test.map((property) => {
        result.push(property);
      });
       console.log(result);
      setProperties(result);
     
    };
    fetchData();
  }, []);

  const handleAuction = (id: string) => {
   navigate(`/auction/${id}`);
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">My Properties</h2>
      </div>

      <ActivityStats stats={ACTIVITY_STATS} />
      {
        // Display properties if there are any
        properties && properties.length > 0 && (
          <PropertyGrid properties={properties} onAuction={handleAuction} />
        )
      }
    </div>
  );
}
