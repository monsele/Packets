import { useParams } from 'react-router-dom';
import ImageGallery from '../../components/property/ImageGallery';
import PropertyInfo from '../../components/property/PropertyInfo';
import PurchaseCard from '../../components/property/PurchaseCard';

// This would typically come from an API
const SAMPLE_PROPERTY = {
  id: '1',
  title: 'Lekki Court Yard',
  location: 'W041, ADEOLA HOPEWELL, Island Lagos',
  owner: 'Danielking',
  investors: 200,
  images: [
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
  ],
  totalValue: 75620,
  totalUnits: 500,
  unitValue: 620,
  annualYield: 20
};

export default function PropertyDetails() {
  const { id } = useParams();

  const handlePurchase = (units: number) => {
    console.log('Purchasing units:', units);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <ImageGallery images={SAMPLE_PROPERTY.images} />
        </div>
        
        <div className="space-y-8">
          <PropertyInfo
            title={SAMPLE_PROPERTY.title}
            location={SAMPLE_PROPERTY.location}
            owner={SAMPLE_PROPERTY.owner}
            investors={SAMPLE_PROPERTY.investors}
          />
          
          <PurchaseCard
            totalValue={SAMPLE_PROPERTY.totalValue}
            totalUnits={SAMPLE_PROPERTY.totalUnits}
            unitValue={SAMPLE_PROPERTY.unitValue}
            annualYield={SAMPLE_PROPERTY.annualYield}
            onPurchase={handlePurchase}
          />
        </div>
      </div>
    </div>
  );
}