import { Building2, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { AuctionVM } from "../../utils/interfaces/interfaces";

interface Props {
  auction: AuctionVM;
  key: number;
}



export default function AuctionListCard({auction}: Props) {
  const timeLeft =
    new Date(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)).getTime() -
    new Date().getTime();
  const daysLeft = Math.ceil(timeLeft / (1000 * 60 * 60 * 24));
  console.log(auction);
  

  return (
    <Link to={`/auction/${auction.tokenAssetId}/bid`} className="block">
      <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        <div className="relative">
          <img
            src={auction.imageUrl?.split(",")[0]}
            alt={auction.nameOfAsset}
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-4 right-4 bg-black/80 text-white px-3 py-1 rounded-full text-sm">
            {daysLeft} days left
          </div>
        </div>

        <div className="p-4">
          <h3 className="font-semibold text-lg">{auction.nameOfAsset}</h3>
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
                {auction.initialBid?.toLocaleString()} NGN
              </span>
            </div>
          </div>

          <button className="mt-4 w-full py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
            View Auction
          </button>
        </div>
      </div>
    </Link>
  );
}
