import { DollarSign, BarChart2, Award, Bookmark } from 'lucide-react';
import StatCard from '../../components/dashboard/StatCard';
import BidTable from '../../components/dashboard/BidTable';

const SAMPLE_BIDS = [
  {
    property: 'Lekki Court Yard',
    owner: 'Adrone Homes',
    volume: '0.06ETH',
    yourOffer: '+0.02ETH',
    position: '1/10'
  },
  {
    property: 'Lekki Court Yard',
    owner: 'Adrone Homes',
    volume: '0.06ETH',
    yourOffer: '-0.02ETH',
    position: '2/10'
  }
];

export default function Overview() {
  return (
    <div className="p-8">
      <h2 className="text-xl font-semibold mb-6">Activity Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          label="Total Yield"
          value="$7,879"
          subValue="0.005ETH"
          icon={DollarSign}
          iconColor="bg-yellow-100 text-yellow-600"
        />
        <StatCard
          label="Total Volume"
          value="$75,620"
          subValue="0.1ETH"
          icon={BarChart2}
          iconColor="bg-blue-100 text-blue-600"
        />
        <StatCard
          label="Won Biddings"
          value="520"
          icon={Award}
          iconColor="bg-green-100 text-green-600"
        />
        <StatCard
          label="My Auction"
          value="32"
          icon={Bookmark}
          iconColor="bg-purple-100 text-purple-600"
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Your Current Bids</h3>
        <BidTable bids={SAMPLE_BIDS} />
      </div>
    </div>
  );
}