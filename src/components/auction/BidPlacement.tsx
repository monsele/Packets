import { useState } from 'react';
import BidInput from './BidInput';
import WinningBid from './WinningBid';
import BidList from './BidList';
import { ChevronDown } from 'lucide-react';

interface BidPlacementProps {
  propertyInfo: {
    totalValue: number;
    acres: number;
    annualYield: number;
  };
  winningBid: {
    user: {
      avatar: string;
      name: string;
    };
    amount: number;
  };
  otherBids: Array<{
    user: {
      avatar: string;
      name: string;
    };
    amount: number;
    isIncrease: boolean;
    position: string;
  }>;
  onPlaceBid: (amount: string) => void;
}

export default function BidPlacement({
  propertyInfo,
  winningBid,
  otherBids,
  onPlaceBid
}: BidPlacementProps) {
  const [bidAmount, setBidAmount] = useState('');
  const [showOtherBids, setShowOtherBids] = useState(false);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        <div>
          <p className="text-gray-600">Total value</p>
          <p className="text-xl font-semibold">${propertyInfo.totalValue.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-gray-600">Acres</p>
          <p className="text-xl font-semibold">{propertyInfo.acres}</p>
        </div>
        <div>
          <p className="text-gray-600">Annual yield</p>
          <p className="text-xl font-semibold">{propertyInfo.annualYield}%</p>
        </div>
      </div>

      <div className="space-y-4">
        <p className="text-gray-600">Enter your offer</p>
        <BidInput
          value={bidAmount}
          onChange={setBidAmount}
        />
        <button
          onClick={() => onPlaceBid(bidAmount)}
          className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors"
        >
          Place bid
        </button>
      </div>

      <WinningBid {...winningBid} />

      <div className="space-y-4">
        <button
          onClick={() => setShowOtherBids(!showOtherBids)}
          className="flex items-center justify-between w-full"
        >
          <span className="text-gray-600">Other bidders</span>
          <ChevronDown
            className={`transform transition-transform ${showOtherBids ? 'rotate-180' : ''}`}
          />
        </button>
        
        {showOtherBids && <BidList bids={otherBids} />}
        
        {showOtherBids && (
          <button className="w-full text-center text-sm text-gray-500">
            See all
          </button>
        )}
      </div>
    </div>
  );
}