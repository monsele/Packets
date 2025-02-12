import { BidVm } from "../../utils/interfaces/interfaces";

export default function BidTable({ bids }: { bids: BidVm[] }) {
   console.log("Received bids:", JSON.stringify(bids, null, 2));
  return (
    <div className="bg-white rounded-lg overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
              Property
            </th>
            {/* <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
              Owner
            </th> */}
            {/* <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Volume(ETH)</th> */}
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
              Your offer
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
              Position
            </th>
            <th className="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {bids.map((bid, index) => (
            <tr key={index}>
              <td className="px-6 py-4">
                <div>
                  <p className="font-medium">{bid.propertyName}</p>
                  <p className="text-sm text-gray-500">{bid.owner}</p>
                </div>
              </td>
              {/* <td className="px-6 py-4 text-sm">{bid.owner}</td> */}
              {/* <td className="px-6 py-4 text-sm">{bid.volume}</td> */}
              <td className="px-6 py-4">
                <span
                  className={`text-sm ${
                    true
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {bid?.bidAmont?.toString()}
                </span>
              </td>
              <td className="px-6 py-4 text-sm">{1}</td>
              <td className="px-6 py-4">
                <button className="px-4 py-1 text-sm bg-gray-100 rounded-lg">
                  End bid
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
