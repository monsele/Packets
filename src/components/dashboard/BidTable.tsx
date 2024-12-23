interface Bid {
  property: string;
  owner: string;
  volume: string;
  yourOffer: string;
  position: string;
}

export default function BidTable({ bids }: { bids: Bid[] }) {
  return (
    <div className="bg-white rounded-lg overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Property</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Owner</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Volume(ETH)</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Your offer</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Position</th>
            <th className="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {bids.map((bid, index) => (
            <tr key={index}>
              <td className="px-6 py-4">
                <div>
                  <p className="font-medium">{bid.property}</p>
                  <p className="text-sm text-gray-500">Island, Lagos...</p>
                </div>
              </td>
              <td className="px-6 py-4 text-sm">{bid.owner}</td>
              <td className="px-6 py-4 text-sm">{bid.volume}</td>
              <td className="px-6 py-4">
                <span className={`text-sm ${
                  bid.yourOffer.startsWith('+') ? 'text-green-500' : 'text-red-500'
                }`}>
                  {bid.yourOffer}
                </span>
              </td>
              <td className="px-6 py-4 text-sm">{bid.position}</td>
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