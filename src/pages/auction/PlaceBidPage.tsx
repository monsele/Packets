import { useParams } from 'react-router-dom';
import ImageGallery from '../../components/property/ImageGallery';
import PropertyInfo from '../../components/property/PropertyInfo';
import BidPlacement from '../../components/auction/BidPlacement';

const SAMPLE_DATA = {
  property: {
    id: '1',
    title: 'Lekki Court Yard',
    location: 'NO 51, ADEKOLA str Lekki way, Island Lagos',
    owner: 'Danielking',
    investors: 20,
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
    ],
    totalValue: 75620,
    acres: 500,
    annualYield: 20,
  },
  winningBid: {
    user: {
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=faces',
      name: 'xdh...qhftuimjdf'
    },
    amount: 75000
  },
  otherBids: [
    {
      user: {
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=faces',
        name: 'xdh...qhftuimjdf'
      },
      amount: 74000,
      isIncrease: true,
      position: '1/10'
    },
    // Add more sample bids as needed
  ]
};

export default function PlaceBidPage() {
  const { id } = useParams();
  
  const handlePlaceBid = (amount: string) => {
    console.log('Placing bid:', amount);
    // Implement bid placement logic
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <ImageGallery images={SAMPLE_DATA.property.images} />
          <PropertyInfo
            title={SAMPLE_DATA.property.title}
            location={SAMPLE_DATA.property.location}
            owner={SAMPLE_DATA.property.owner}
            investors={SAMPLE_DATA.property.investors}
          />
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold mb-6">Auction</h2>
          <BidPlacement
            propertyInfo={{
              totalValue: SAMPLE_DATA.property.totalValue,
              acres: SAMPLE_DATA.property.acres,
              annualYield: SAMPLE_DATA.property.annualYield
            }}
            winningBid={SAMPLE_DATA.winningBid}
            otherBids={SAMPLE_DATA.otherBids}
            onPlaceBid={handlePlaceBid}
          />
        </div>
      </div>
    </div>
  );
}