import { ArrowUpCircle, ArrowDownCircle } from 'lucide-react';
import { Bid } from '../../utils/interfaces/interfaces';

// interface Bid {
//   user: {
//     avatar: string;
//     name: string;
//   };
//   amount: number;
//   isIncrease: boolean;
//   position: string;
// }

interface BidListProps {
  bids: Bid[];
  onEndBid?: (bidId: string) => void;
}

export default function BidList({ bids, onEndBid }: BidListProps) {
  return (
    <div className="space-y-4">
      {bids.map((bid, index) => (
        <div key={index} className="flex items-center justify-between py-3 border-b last:border-0">
          <div className="flex items-center gap-3">
            <img
              //src={bid.user.avatar}
              alt={bid.bidder}
              className="w-8 h-8 rounded-full"
            />
            <div>
              <p className="font-medium">{bid.bidder}</p>
              <p className="text-sm text-gray-500">Island, Lagos...</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className={`flex items-center gap-1 ${
              true ? 'text-green-500' : 'text-red-500'
            }`}>
              {true ? <ArrowUpCircle size={16} /> : <ArrowDownCircle size={16} />}
              <span>${bid.bidAmont.toLocaleString()}</span>
            </div>
            {/* <span className="text-sm text-gray-500">{bid.position}</span> */}
            {onEndBid && (
              <button
                onClick={() => onEndBid(index.toString())}
                className="px-4 py-1 text-sm bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                End bid
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}