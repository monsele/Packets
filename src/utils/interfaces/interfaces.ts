 export interface PropertyType {
    id: number;
    propertyTitle: string;
    propertyLocation: string;
    propertyCategory: string;
    annualYield: number;
    units: number;
    price: number;
    propertyDescription: string;
    propertyOwner: string;
    images: string;
    smartContractId: number;
  }
  export interface UserTokenData {
  tokenId: bigint;
  name: string;
  description: string;
  amountOwned: bigint;
}

export interface Auction {
  id: number;
  nameOfAsset: string;
  tokenId: number;
  initialBid: string;
  owner: string;
  completed: boolean;
  tokenAmount: string;
  smartContractId: number;
}

export interface CreateAssetRequest {
  propertyTitle: string;
  totalUnits: number;
  totalUnitsNumber: number;
  category: number;
  metaId:number;
  userAddress: string;
}

export interface BuyPlotRequest {
  tokenId: number;
  purchaseAmt: number;
  payAmount: number;
  userAddress: string;
  currencyCode: string;
}

export interface CreateAuctionRequest {
  tokenId: number;
  amount: number;
  userAddress: string;
}

export interface PayBidRequest {
  auctionId: number;
  amount: number;
  currencyCode: string;
  userAddress: string;
}

export interface Property {
  id?: number;
  propertyTitle?: string;
  propertyLocation?: string;
  propertyCategory?: string;
  annualYield: number;
  units: number;
  price: number;
  propertyDescription?: string;
  propertyOwner?: string;
  images?: string;
  smartContractId?: number;
}

export interface TokenMeta {
  id?: number;
  name?: string;
  images?: string;
}

export interface Auction {
  id: number;
  nameOfAsset: string;
  tokenId: number;
  initialBid: string;
  owner: string;
  completed: boolean;
  tokenAmount: string;
  smartContractId: number;
}
export interface MetaData {
  id: number;
  images: string;
  name: string;
}

export interface PaymasterResponse {
  success: boolean;
  result: string; // Adjust the type of 'result' as needed
}

