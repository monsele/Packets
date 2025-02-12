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
  metaId: number;
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
  auctionId: Number;
  amount: Number;
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
export interface AuctionResponse {
  success: boolean;
  result: string;
  auctionCounter: number;
  // Adjust the type of 'result' as needed
}
export interface UserTokenData {
  tokenId: bigint;
  Name: string;
  Description: string;
  amountOwned: bigint;
}
export interface Bid {
  id: number;
  auctionId: number;
  bidAmont: number; // Fixed typo from 'BidAmont'
  bidder?: string;
  bidderAddress?: string;
  isAccept: boolean;
}
export interface BidVm {
  id: number;
  propertyName: string;
  owner: string;
  auctionId: number;
  bidAmont: number;
  bidderAddress: string;
  isAccept: boolean;
}

export interface MintCurr {
  shortForm: string;
  amount: Number;
  user: string;
}
export interface AuctionVM {
  id: number;
  nameOfAsset?: string;
  tokenAssetId?: number;
  initialBid?: string;
  owner?: string;
  completed: boolean;
  tokenAmount?: string;
  location?: string;
  imageUrl?: string;
  bids?: Bid[];
  smartAuctionContractId?: number;
}

export interface BidRequest {
  auctionId: number;
  bidAmont: number;
  bidder: string;
  bidderAddress: string;
}
