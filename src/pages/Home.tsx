//import { useState } from 'react';
import PropertyCard from '../components/PropertyCard';
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { PropertyType } from '../utils/interfaces/interfaces';
import { Loader2 } from 'lucide-react';
//const CATEGORIES = ['Lands', 'Houses', 'Commercial', 'Apartment'];


export default function Home() {
 // const [activeCategory, setActiveCategory] = useState('Houses');
 const { data, isLoading } = useQuery({
   queryKey: ["getProperties"],
   queryFn: async () => {
     const { data } = await axios.get(`https://on-real.fly.dev/properties`);
     return data as PropertyType[];
   },
 });
  return (
    <div className="container mx-auto px-6 py-8">
      {/* <div className="flex items-center justify-center gap-8 mb-8">
        {CATEGORIES.map((category) => (
          <button
            key={category}
            className={`px-6 py-2 rounded-full ${
              activeCategory === category
                ? 'bg-blue-100 text-blue-600'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div> */}
      {isLoading ?  (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm animate-pulse">
              <div className="h-48 bg-gray-200" />
              <div className="p-4 space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
                <div className="h-4 bg-gray-200 rounded w-1/4" />
                <div className="pt-4">
                  <div className="h-10 bg-gray-200 rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) :  data?.length === 0 ? (
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Loader2 size={32} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900">No properties found</h3>
          <p className="mt-2 text-gray-500">
            We couldn't find any properties in this category.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {data?.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}

      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {data?.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div> */}
    </div>
  );
}