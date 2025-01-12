import { useState } from "react";

interface AuctionFormProps {
  onSubmit: (data: { auctionAmount: string; startingBid: string }) => void;
}

export default function AuctionForm({ onSubmit }: AuctionFormProps) {
  const [formData, setFormData] = useState({
    auctionAmount: "",
    startingBid: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Auction Amount (USDT)
        </label>
        <div className="relative">
          <input
            type="text"
            placeholder="Enter auction amount"
            value={formData.auctionAmount}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                auctionAmount: e.target.value,
              }))
            }
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
            USDT
          </span>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Starting Bid (USDT)
        </label>
        <div className="relative">
          <input
            type="text"
            placeholder="Enter starting bid"
            value={formData.startingBid}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, startingBid: e.target.value }))
            }
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
            USDT
          </span>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors"
      >
        Start Auction
      </button>
    </form>
  );
}
