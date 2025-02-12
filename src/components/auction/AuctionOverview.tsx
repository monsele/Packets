import { Clock } from "lucide-react";

interface AuctionOverviewProps {
  totalValue: number;
  acres: number;
  annualYield: number;
  timeLeft: {
    days: number;
    hours: number;
    minutes: number;
  };
}

export default function AuctionOverview({
  totalValue,
  acres,
  annualYield,
  timeLeft,
}: AuctionOverviewProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-8">
        {/* <div>
          <p className="text-gray-600">Total value</p>
          <p className="text-2xl font-semibold">
            ${totalValue.toLocaleString()}
          </p>
        </div> */}
        <div>
          <p className="text-gray-600">Acres</p>
          <p className="text-2xl font-semibold">{acres}</p>
        </div>
        <div>
          <p className="text-gray-600">Annual yield</p>
          <p className="text-2xl font-semibold">{annualYield}%</p>
        </div>
      </div>
{/* 
      <div className="flex items-center gap-2 text-sm">
        <Clock size={16} className="text-blue-500" />
        <div className="flex items-center gap-1">
          <span className="bg-blue-500 text-white px-2 py-1 rounded">
            {String(timeLeft.days).padStart(2, "0")}
          </span>
          <span>Days</span>
          <span>:</span>
          <span className="bg-gray-100 px-2 py-1 rounded">
            {String(timeLeft.hours).padStart(2, "0")}
          </span>
          <span>Hrs</span>
          <span>:</span>
          <span className="bg-gray-100 px-2 py-1 rounded">
            {String(timeLeft.minutes).padStart(2, "0")}
          </span>
          <span>min</span>
        </div>
      </div> */}
    </div>
  );
}
