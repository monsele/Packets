import {api} from '../../config/axios/index.ts';
import  { AxiosError } from "axios";
import { AuctionResponse, BuyPlotRequest, CreateAssetRequest, CreateAuctionRequest, MintCurr, PayBidRequest, PaymasterResponse } from '../interfaces/interfaces.ts';


// Custom error class
class PaymasterError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public response?: any
  ) {
    super(message);
    this.name = "PaymasterError";
  }
}

class PaymasterAPI {
  /**
   * Creates a new asset
   * @param params - Asset creation parameters
   * @returns Promise with the created asset data
   */
  async createAsset(params: CreateAssetRequest): Promise<any> {
    try {
      const response = await api.post("/create-asset", params);
      return response.data;
    } catch (error) {
      this.handleError(error as AxiosError, "Failed to create asset");
    }
  }

  /**
   * Purchases a plot
   * @param params - Plot purchase parameters
   * @returns Promise with the purchase confirmation
   */
  async buyPlot(params: BuyPlotRequest): Promise<any> {
    try {
      const response = await api.post("/buy-plot", params);
      return response.data;
    } catch (error) {
      this.handleError(error as AxiosError, "Failed to buy plot");
    }
  }

  /**
   * Creates a new auction
   * @param params - Auction creation parameters
   * @returns Promise with the created auction data
   */
  async createAuction(params: CreateAuctionRequest): Promise<AuctionResponse> {
    try {
      const response = await api.post("/auction", params);
      return response.data as AuctionResponse;
    } catch (error) {
      this.handleError(error as AxiosError, "Failed to create auction");
    }
  }

  /**
   * Pays for a bid in an auction
   * @param params - Bid payment parameters
   * @returns Promise with the payment confirmation
   */
  async payBid(params: PayBidRequest): Promise<any> {
    try {
      const response = await api.post("/pay-bid", params);
      return response.data;
    } catch (error) {
      this.handleError(error as AxiosError, "Failed to pay bid");
    }
  }

  async mintCurrency(params: MintCurr): Promise<PaymasterResponse> {
    try {
      const response = await api.post("/mint", params);
      return response.data;
    } catch (error) {
      this.handleError(error as AxiosError, "Failed to pay bid");
    }
  }

  /**
   * Handle API errors consistently
   * @param error - The caught error
   * @param defaultMessage - Default error message
   */
  private handleError(error: AxiosError, defaultMessage: string): never {
    const statusCode = error.response?.status;
    const message: string =
      error.response?.data &&
      typeof error.response?.data === "object" &&
      "message" in error.response?.data
        ? String(error.response.data.message)
        : String(error.message || defaultMessage);

    throw new PaymasterError(message, statusCode, error.response?.data);
  }
}

export default PaymasterAPI;