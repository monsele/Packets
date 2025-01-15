import { useState } from "react";
import { useParams } from "react-router-dom";
import { Building2, Users, CheckCircle2, Timer } from "lucide-react";
import { AuctionVM } from "../../utils/interfaces/interfaces";
import OnRealAPI from "../../utils/api/onreal";
import { useQuery } from "@tanstack/react-query";

interface Bid {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  amount: number;
  timestamp: Date;
}

interface Auction {
  id: string;
  propertyName: string;
  location: string;
  initialBid: number;
  plots: number;
  imageUrl: string;
  endTime: Date;
  status: "open" | "closed";
  bids: Bid[];
}

const SAMPLE_AUCTION: Auction = {
  id: "1",
  propertyName: "Lekki Court Yard",
  location: "Island, Lagos",
  initialBid: 75000,
  plots: 50,
  imageUrl:
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
  endTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
  status: "open",
  bids: [
    {
      id: "bid1",
      user: {
        name: "John Doe",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=faces",
      },
      amount: 80000,
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    },
    {
      id: "bid2",
      user: {
        name: "Jane Smith",
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=faces",
      },
      amount: 77500,
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
    },
  ],
};

export default function AuctionDetails() {
  const { id } = useParams();
  const { data } = useQuery({
    queryKey: ["getAuctionById", id],
    queryFn: async (): Promise<AuctionVM> => {
      const onRealAPI = new OnRealAPI();
      return await onRealAPI.getAuctionById(Number(id));
    },
  });
  //const [auctions] = useState(SAMPLE_AUCTIONS);
  console.log(data);
  const [auction, setAuction] = useState<Auction>(SAMPLE_AUCTION);
  const [selectedBid, setSelectedBid] = useState<Number | null>(null);

  const handleAcceptBid = (bidId: Number) => {
    setSelectedBid(bidId);
    setAuction((prev) => ({ ...prev, status: "closed" }));
    // Implement bid acceptance logic
    console.log("Accepting bid:", bidId);
  };

  const getStatusDisplay = () => {
    if (data?.completed===false) {
      return (
        <div className="flex items-center gap-2">
          <Timer size={20} className="text-green-500" />
          <span className="text-green-500 font-medium">Open</span>
        </div>
      );
    }
    return (
      <div className="flex items-center gap-2">
        <CheckCircle2 size={20} className="text-red-500" />
        <span className="text-red-500 font-medium">Closed</span>
      </div>
    );
  };

  return (
    <div className="p-8">
      <div className="bg-white rounded-lg overflow-hidden shadow-sm mb-8">
        <div className="relative h-64">
          <img
            src={data?.imageUrl?.split(",")[0]}
            alt={data?.nameOfAsset}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-4 left-4 text-white">
            <h1 className="text-2xl font-semibold">{data?.nameOfAsset}</h1>
            <p className="flex items-center gap-1 mt-1">
              <Building2 size={16} />
              {data?.location}
            </p>
          </div>
          <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full">
            {getStatusDisplay()}
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-3 gap-8 mb-6">
            <div>
              <p className="text-gray-600">Initial Bid</p>
              <p className="text-xl font-semibold">
                ${data?.initialBid?.toLocaleString()} NGN
              </p>
            </div>
            <div>
              <p className="text-gray-600">Plots Available</p>
              <p className="text-xl font-semibold flex items-center gap-2">
                <Users size={20} />
                {data?.tokenAmount}
              </p>
            </div>
            <div>
              <p className="text-gray-600">Status</p>
              <div className="text-xl">{getStatusDisplay()}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">
            Bids ({data?.bids?.length})
          </h2>
        </div>
        <div className="divide-y">
          {data?.bids?.map((bid) => (
            <div key={bid.id} className="p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img
                  src={auction.bids[0].user.avatar}
                  alt={auction.propertyName}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-medium">{auction.bids[0].user.name}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(Date.now()).toLocaleDateString()} at{" "}
                    {new Date(Date.now()).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-lg font-semibold">
                  ${bid.bidAmont.toLocaleString()} NGN
                </span>
                {selectedBid === bid.id ? (
                  <span className="px-4 py-2 bg-green-100 text-green-700 rounded-lg">
                    Bid Accepted
                  </span>
                ) : auction.status === "open" ? (
                  <button
                    onClick={() => handleAcceptBid(bid.id)}
                    className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    Accept & Close
                  </button>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
