import {
  DollarSign,
  BarChart2,
  Award,
  Bookmark,
  Loader2,
  PackageSearch,
} from "lucide-react";
import StatCard from "../../components/dashboard/StatCard";
import BidTable from "../../components/dashboard/BidTable";
import { useQuery } from "@tanstack/react-query";
import { BidVm } from "../../utils/interfaces/interfaces";
import OnRealAPI from "../../utils/api/onreal";
import { Link } from "react-router-dom";

export default function Overview() {
  const { data, isLoading } = useQuery({
    queryKey: ["getAuctionsByAddress"],
    queryFn: async (): Promise<BidVm[]> => {
      const onRealAPI = new OnRealAPI();
      return await onRealAPI.getBidsByAddress(
        localStorage.getItem("userWalletAddress") as string
      );
    },
  });
  console.log(data);

  if (isLoading) {
    return (
      <div className="p-8">
        <h2 className="text-xl font-semibold mb-6">Activity Overview</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="bg-white p-6 rounded-lg animate-pulse">
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

        <div>
          <h3 className="text-lg font-semibold mb-4">Your Current Bids</h3>
          <div className="bg-white rounded-lg overflow-hidden">
            <div className="p-8 flex items-center justify-center">
              <div className="flex flex-col items-center gap-2">
                <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
                <p className="text-gray-500">Loading bids...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="p-8">
      <h2 className="text-xl font-semibold mb-6">Activity Overview</h2>

      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          label="Total Yield"
          value="$7,879"
          subValue="0.005ETH"
          icon={DollarSign}
          iconColor="bg-yellow-100 text-yellow-600"
        />
        <StatCard
          label="Total Volume"
          value="$75,620"
          subValue="0.1ETH"
          icon={BarChart2}
          iconColor="bg-blue-100 text-blue-600"
        />
        <StatCard
          label="Won Biddings"
          value="520"
          icon={Award}
          iconColor="bg-green-100 text-green-600"
        />
        <StatCard
          label="My Auction"
          value="32"
          icon={Bookmark}
          iconColor="bg-purple-100 text-purple-600"
        />
      </div> */}

      <div>
        <h3 className="text-lg font-semibold mb-4">Your Current Bids</h3>
        {data && data.length > 0 ? (
          <BidTable bids={data} />
        ) : (
          <div className="bg-white rounded-lg overflow-hidden">
            <div className="p-12 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <PackageSearch className="w-8 h-8 text-gray-400" />
              </div>
              <h4 className="text-lg font-medium text-gray-900 mb-2">
                No active bids
              </h4>
              <p className="text-gray-500 mb-6">
                You haven't placed any bids yet. Start exploring properties to
                make your first bid!
              </p>
              <Link
                to="/"
                className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                Explore Properties
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
