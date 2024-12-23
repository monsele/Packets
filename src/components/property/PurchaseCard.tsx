import { useState } from 'react';

interface PurchaseCardProps {
  totalValue: number;
  totalUnits: number;
  unitValue: number;
  annualYield: number;
  onPurchase: (units: number) => void;
}

export default function PurchaseCard({
  totalValue,
  totalUnits,
  unitValue,
  annualYield,
  onPurchase
}: PurchaseCardProps) {
  const [units, setUnits] = useState(1);
  const totalCost = units * unitValue;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div>
          <p className="text-gray-600">Total value</p>
          <p className="text-xl font-semibold">${totalValue.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-gray-600">Units</p>
          <p className="text-xl font-semibold">{totalUnits}</p>
        </div>
        <div>
          <p className="text-gray-600">Unit value</p>
          <p className="text-xl font-semibold">${unitValue}</p>
        </div>
      </div>

      <div className="mb-6">
        <p className="text-lg font-semibold">
          {annualYield}% <span className="text-gray-600">Annual yield</span>
        </p>
        <p className="text-sm text-gray-500">
          This price is subjected to increase depending on the of the property
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Enter number of units you want
          </label>
          <div className="mt-1 flex gap-4">
            <input
              type="number"
              min={1}
              max={totalUnits}
              value={units}
              onChange={(e) => setUnits(Number(e.target.value))}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <div className="flex items-center px-4 border rounded-md">
              <span>USDT</span>
            </div>
          </div>
        </div>

        <button
          onClick={() => onPurchase(units)}
          className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors"
        >
          Pay Now
        </button>
      </div>
    </div>
  );
}