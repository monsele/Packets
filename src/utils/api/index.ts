import {api} from '../../config/axios/index.ts';
import  { AxiosError } from "axios";
import { BuyPlotRequest, CreateAssetRequest, CreateAuctionRequest, PayBidRequest } from '../interfaces/interfaces.ts';


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
  async createAuction(params: CreateAuctionRequest): Promise<any> {
    try {
      const response = await api.post("/auction", params);
      return response.data;
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

  /**
   * Handle API errors consistently
   * @param error - The caught error
   * @param defaultMessage - Default error message
   */
  private handleError(error: AxiosError, defaultMessage: string): never {
    const statusCode = error.response?.status;
    const message: string =
      (error.response?.data && typeof error.response?.data === 'object' && 'message' in error.response?.data)
        ? String(error.response.data.message)
        : String(error.message || defaultMessage);

    throw new PaymasterError(message, statusCode, error.response?.data);
  }
}

// Example usage with TypeScript:
// async function example() {
//   const paymasterAPI = new PaymasterAPI();
//
//   try {
//     // Create an asset
//     const asset = await paymasterAPI.createAsset({
//       propertyTitle: "On-Shore",
//       totalUnits: 1000,
//       totalUnitsNumber: 1000,
//       category: 1,
//       userAddress: "0x52926814b40B8cCa233B5D926911A9f9A4820F6B"
//     });
//
//     // Buy a plot
//     const plot = await paymasterAPI.buyPlot({
//       tokenId: 1,
//       purchaseAmt: 10,
//       payAmount: 20000,
//       userAddress: "0x90139066A44A0eD1E335CA08fdC0218eaE8D7C7f",
//       currencyCode: "NGN"
//     });
//
//     // Create an auction
//     const auction = await paymasterAPI.createAuction({
//       tokenId: 1,
//       amount: 5,
//       userAddress: "0x90139066A44A0eD1E335CA08fdC0218eaE8D7C7f"
//     });
//
//     // Pay for a bid
//     const bid = await paymasterAPI.payBid({
//       auctionId: 1,
//       amount: 12000,
//       currencyCode: "NGN",
//       userAddress: "0x133bC7a7EA1E1A5B03D67c1Fe09039c9520D5104"
//     });
//   } catch (error) {
//     if (error instanceof PaymasterError) {
//       console.error(
//         `Error (${error.statusCode}):`,
//         error.message,
//         error.response
//       );
//     } else {
//       console.error('Unexpected error:', error);
//     }
//   }
// }

export default PaymasterAPI;