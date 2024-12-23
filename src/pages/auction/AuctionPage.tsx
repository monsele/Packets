import { useState } from 'react';
import { useParams } from 'react-router-dom';
import ImageGallery from '../../components/property/ImageGallery';
import PropertyInfo from '../../components/property/PropertyInfo';
import AuctionOverview from '../../components/auction/AuctionOverview';
import BidList from '../../components/auction/BidList';
import Analytics from '../../components/auction/Analytics';

const SAMPLE_PROPERTY = {
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
  timeLeft: { days: 4, hours: 4, minutes: 30 },
  bids: [
    {
      user: {
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=faces',
        name: 'xdh...qhftuimjdf'
      },
      amount: 74000,
      isIncrease: true,
      position: '1/10'
    },
    // Add more sample bids
  ],
  analytics: {
    labels: ['year 1', 'year 2', 'year 3', 'year 4'],
    values: [1000, 2500, 3500, 4000]
  }
};

export default function AuctionPage() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<'overview' | 'analytics'>('overview');
  const [analyticsPeriod, setAnalyticsPeriod] = useState('4');

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <ImageGallery images={SAMPLE_PROPERTY.images} />
          <PropertyInfo
            title={SAMPLE_PROPERTY.title}
            location={SAMPLE_PROPERTY.location}
            owner={SAMPLE_PROPERTY.owner}
            investors={SAMPLE_PROPERTY.investors}
          />
        </div>
        
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Auction</h2>
            <div className="flex gap-4 mb-6">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-4 py-2 rounded-lg ${
                  activeTab === 'overview' ? 'bg-gray-100' : ''
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('analytics')}
                className={`px-4 py-2 rounded-lg ${
                  activeTab === 'analytics' ? 'bg-gray-100' : ''
                }`}
              >
                Analytics
              </button>
            </div>

            {activeTab === 'overview' ? (
              <AuctionOverview
                totalValue={SAMPLE_PROPERTY.totalValue}
                acres={SAMPLE_PROPERTY.acres}
                annualYield={SAMPLE_PROPERTY.annualYield}
                timeLeft={SAMPLE_PROPERTY.timeLeft}
                onPlaceBid={() => console.log('Place bid')}
              />
            ) : (
              <Analytics
                data={SAMPLE_PROPERTY.analytics}
                period={analyticsPeriod}
                onPeriodChange={setAnalyticsPeriod}
              />
            )}
          </div>

          {activeTab === 'overview' && (
            <div>
              <h3 className="font-medium mb-4">Other bidders</h3>
              <BidList bids={SAMPLE_PROPERTY.bids} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}