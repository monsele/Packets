
import AuctionListCard from "../../components/auction/AuctionListCard";
import { AuctionVM } from "../../utils/interfaces/interfaces";
import { useQuery } from "@tanstack/react-query";
import OnRealAPI from "../../utils/api/onreal";

// Sample data - replace with actual data from your backend


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
