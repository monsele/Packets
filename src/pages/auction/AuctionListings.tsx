import { useState } from "react";
import AuctionListCard from "../../components/auction/AuctionListCard";
import { AuctionVM } from "../../utils/interfaces/interfaces";
import { useQuery } from "@tanstack/react-query";
import OnRealAPI from "../../utils/api/onreal";

// Sample data - replace with actual data from your backend
const SAMPLE_AUCTIONS : AuctionVM[] = [
  {
    Id: 1,
    NameOfAsset: "Lakeview Heights Estate",
    TokenAssetId: 12345,
    InitialBid: "75000",
    Owner: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    Completed: false,
    TokenAmount: "50",
    Location: "Victoria Island, Lagos",
    ImageUrl:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
  },
  {
    Id: 2,
    NameOfAsset: "Palm Grove Residences",
    TokenAssetId: 12346,
    InitialBid: "45000",
    Owner: "0x8474d35Cc6634C0532925a3b844Bc454e4438f5a",
    Completed: true,
    TokenAmount: "25",
    Location: "Ikoyi, Lagos",
    ImageUrl:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
  },
  {
    Id: 3,
    NameOfAsset: "Sunset Gardens",
    TokenAssetId: 12347,
    InitialBid: "60000",
    Owner: "0x932d35Cc6634C0532925a3b844Bc454e4438f3c",
    Completed: false,
    TokenAmount: "35",
    Location: "Lekki Phase 1, Lagos",
    ImageUrl:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
  },
  {
    Id: 4,
    NameOfAsset: "Green Valley Estate",
    TokenAssetId: 12348,
    InitialBid: "85000",
    Owner: "0x156d35Cc6634C0532925a3b844Bc454e4438f7b",
    Completed: false,
    TokenAmount: "40",
    Location: "Ajah, Lagos",
    ImageUrl:
      "https://images.unsplash.com/photo-1600607687644-c7171b42498e?w=800",
  },
];

export default function AuctionListings() {
  const { data } = useQuery({
    queryKey: ["getAuctions"],
    queryFn: async (): Promise<AuctionVM[]> => {
      const onRealAPI = new OnRealAPI();
      return await onRealAPI.getAuctions();
    },
  });
  //const [auctions] = useState(SAMPLE_AUCTIONS);
  console.log(data);
  
  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold">Active Auctions</h1>
        <div className="flex gap-4">
          <select className="px-4 py-2 border rounded-lg">
            <option>Sort by: Latest</option>
            <option>Sort by: Ending Soon</option>
            <option>Sort by: Initial Bid</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.map((auction,index) => (
          <AuctionListCard auction={auction} key={index} />
        ))}
      </div>
    </div>
  );
}
