export interface Property {
  id: string;
  title: string;
  location: string;
  price: {
    eth: number;
    usdt: number;
  };
  annualYield: number;
  bidders: number;
  imageUrl: string;
  owner: string;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  role: 'investor' | 'property_manager';
  totalYield: number;
  totalVolume: number;
  wonBiddings: number;
  myAuctions: number;
}