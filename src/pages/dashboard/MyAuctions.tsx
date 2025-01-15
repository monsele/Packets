import { useState } from "react";
import { Link } from "react-router-dom";
import { Building2, Users, Clock } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { AuctionVM } from "../../utils/interfaces/interfaces";
import OnRealAPI from "../../utils/api/onreal";

interface Auction {
  id: string;
  propertyName: string;
  location: string;
  initialBid: number;
  plots: number;
  imageUrl: string;
  bidsCount: number;
  endTime: Date;
}

const SAMPLE_AUCTIONS: Auction[] = [
  {
    id: "1",
    propertyName: "Lekki Court Yard",
    location: "Island, Lagos",
    initialBid: 75000,
    plots: 50,
    imageUrl:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
    bidsCount: 12,
    endTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
  },
  {
    id: "2",
    propertyName: "Palm Heights Estate",
    location: "Ikoyi, Lagos",
    initialBid: 45000,
    plots: 25,
    imageUrl:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
    bidsCount: 8,
    endTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
  },
];

export default function MyAuctions() {
  const [auctions] = useState<Auction[]>(SAMPLE_AUCTIONS);
  const { data } = useQuery({
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
                  <Building2 size={16} />
                  {auction.location}
                </p>

                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Plots for auction</span>
                    <span className="font-medium flex items-center gap-1">
                      <Users size={16} />
                      {auction.tokenAmount}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 text-sm">Initial bid</span>
                    <span className="font-semibold text-blue-600">
                      ${auction?.initialBid?.toLocaleString()} USDT
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Time left</span>
                    <span className="flex items-center gap-1 text-gray-800">
                      <Clock size={16} />
                      {auction.completed ? "Open" : "Closed"}{" "}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
