import { useEffect, useState } from "react";
import ActivityStats from "../../components/dashboard/ActivityStats";
import PropertyGrid from "../../components/properties/PropertyGrid";
import { useNavigate } from "react-router-dom";
import { EstatePoolView } from "../../utils/smartContract";

import { toast } from "sonner";
import { UserTokenData } from "../../utils/interfaces/interfaces";
import { PackageSearch } from "lucide-react";
import { Link } from "react-router-dom";


const ACTIVITY_STATS = [
  { label: "Total Value", value: "$75,620", icon: "bg-blue-100 text-blue-600" },
  { label: "Units", value: "500", icon: "bg-green-100 text-green-600" },
  { label: "Unit Value", value: "$620", icon: "bg-yellow-100 text-yellow-600" },
];

export default function Properties() {
  const [properties, setProperties] = useState<UserTokenData[]>([]);
   const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  console.log(localStorage.getItem("userWalletAddress"));
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const userAddress = localStorage.getItem("userWalletAddress");
      if (userAddress === null) {
        toast.error("User is not logged in");
        setLoading(false);
        return;
      }

      const test = await EstatePoolView.getUserTokensData(
        localStorage.getItem("userWalletAddress") as `0x${string}`
      );
      const result = new Array<UserTokenData>();
       test.map((property) => {
        result.push(property);
      });
      setProperties(result);
      setLoading(false);
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

      {loading ? (
        <>
          <div className="grid grid-cols-4 gap-4 mb-8">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg animate-pulse"
              >
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <div className="h-4 w-24 bg-gray-200 rounded"></div>
                    <div className="h-6 w-32 bg-gray-200 rounded"></div>
                  </div>
                  <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                </div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-lg overflow-hidden shadow-sm animate-pulse"
              >
                <div className="h-48 bg-gray-200" />
                <div className="p-4 space-y-4">
                  <div className="space-y-2">
                    <div className="h-5 bg-gray-200 rounded w-3/4" />
                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="h-4 bg-gray-200 rounded w-1/3" />
                      <div className="h-4 bg-gray-200 rounded w-1/4" />
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="h-4 bg-gray-200 rounded w-1/4" />
                      <div className="h-4 bg-gray-200 rounded w-1/3" />
                    </div>
                  </div>
                  <div className="h-10 bg-gray-200 rounded" />
                </div>
              </div>
            ))}
          </div>
        </>
      ) : properties.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-12 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <PackageSearch className="w-8 h-8 text-gray-400" />
            </div>
            <h4 className="text-lg font-medium text-gray-900 mb-2">
              No properties found
            </h4>
            <p className="text-gray-500 mb-6">
              You haven't added any properties to your portfolio yet.
            </p>
            <Link to={"/upload"} className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
              Add New Property
            </Link>
          </div>
        </div>
      ) : (
        <>
          {/* <ActivityStats stats={ACTIVITY_STATS} /> */}
          <PropertyGrid properties={properties} onAuction={handleAuction} />
        </>
      )}
    </div>
  );
}
