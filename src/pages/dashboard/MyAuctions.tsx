import { Link } from "react-router-dom";
import { Building2, MapPin, Clock, PackageSearch } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { AuctionVM } from "../../utils/interfaces/interfaces";
import OnRealAPI from "../../utils/api/onreal";

export default function MyAuctions() {

  const { data, isLoading } = useQuery({
    queryKey: ["getAuctionsByAddress"],
    queryFn: async (): Promise<AuctionVM[]> => {
      const onRealAPI = new OnRealAPI();
      return await onRealAPI.getAuctionsByAddress(
        localStorage.getItem("userWalletAddress") as string
      );
    },
  });
  
  console.log(data);
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">My Auctions</h2>
        <div className="flex gap-4">
          <select className="px-4 py-2 border rounded-lg">
            <option>All Auctions</option>
            <option>Active</option>
            <option>Ended</option>
          </select>
        </div>
      </div>

      {isLoading ? (
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
                  <div className="flex justify-between items-center">
                    <div className="h-4 bg-gray-200 rounded w-1/3" />
                    <div className="h-4 bg-gray-200 rounded w-1/4" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : data?.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-12 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <PackageSearch className="w-8 h-8 text-gray-400" />
            </div>
            <h4 className="text-lg font-medium text-gray-900 mb-2">
              No auctions found
            </h4>

            <Link
              to="/upload"
              className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              Create New Auction
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.map((auction) => (
            <Link key={auction.id} to={`/dashboard/auctions/${auction.id}`}>
              <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="relative">
                  <img
                    src={auction.imageUrl?.split(",")[0]}
                    alt={auction.nameOfAsset}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-black/80 text-white px-3 py-1 rounded-full text-sm">
                    {auction.bids?.length} bids
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-lg">
                    {auction.nameOfAsset}
                  </h3>
                  <p className="text-gray-600 text-sm flex items-center gap-1 mt-1">
                    <MapPin size={16} />
                    {auction.location}
                  </p>

                  <div className="mt-4 space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Plots for auction</span>
                      <span className="font-medium flex items-center gap-1">
                        <Building2 size={16} />
                        {auction.tokenAmount}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 text-sm">Initial bid</span>
                      <span className="font-semibold text-blue-600">
                        {auction?.initialBid?.toLocaleString()} NGN
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Time left</span>
                      <span className="flex items-center gap-1 text-gray-800">
                        <Clock size={16} />
                        {auction.completed ? "Closed" : "Open"}{" "}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
