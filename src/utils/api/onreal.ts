import { offchainApi as api } from "../../config/axios/index.ts";
import { AxiosError } from "axios";
import { Auction, Property, TokenMeta } from "../interfaces/interfaces.ts";

class OnRealAPIError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public response?: any
  ) {
    super(message);
    this.name = "OnRealAPIError";
  }
}

class OnRealAPI {
  private handleError(error: AxiosError, defaultMessage: string): never {
    const statusCode = error.response?.status;
    const message =
      (error.response?.data as { message?: string })?.message ||
      error.message ||
      defaultMessage;
    throw new OnRealAPIError(message, statusCode, error.response?.data);
  }

  // Properties
  async createProperty(property: Property): Promise<void> {
    try {
      return await api.post("/properties", property);
    } catch (error) {
      this.handleError(error as AxiosError, "Failed to create property");
      throw error;
    }
  }

  async getProperties(): Promise<Property[]> {
    try {
      const response = await api.get("/properties");
      return response.data;
    } catch (error) {
      this.handleError(error as AxiosError, "Failed to get properties");
    }
  }

  async getPropertyById(id: number): Promise<Property> {
    try {
      const response = await api.get(`/properties/${id}`);
      return response.data;
    } catch (error) {
      this.handleError(error as AxiosError, "Failed to get property");
    }
  }

  async getPropertiesByOwner(address: string): Promise<Property[]> {
    try {
      const response = await api.get(`/PropertiesByOwner/${address}`);
      return response.data;
    } catch (error) {
      this.handleError(
        error as AxiosError,
        "Failed to get properties by owner"
      );
    }
  }

  // Token Meta
  async createTokenMeta(tokenMeta: TokenMeta): Promise<void> {
    try {
      const resp = await api.post("/tokenmeta", tokenMeta);
      return resp.data;
    } catch (error) {
      this.handleError(error as AxiosError, "Failed to create token metadata");
    }
  }

  async getTokenMetaById(id: number): Promise<TokenMeta> {
    try {
      const response = await api.get(`/tokenmeta/${id}`);
      return response.data;
    } catch (error) {
      this.handleError(error as AxiosError, "Failed to get token metadata");
    }
  }

  // Auctions
  async createAuction(auction: Auction): Promise<void> {
    try {
      await api.post("/auction", auction);
    } catch (error) {
      this.handleError(error as AxiosError, "Failed to create auction");
    }
  }

  async getAuctions(): Promise<Auction[]> {
    try {
      const response = await api.get("/auction");
      return response.data;
    } catch (error) {
      this.handleError(error as AxiosError, "Failed to get auctions");
    }
  }

  async getAuctionsByAddress(address: string): Promise<Auction[]> {
    try {
      const response = await api.get(`/auction/${address}`);
      return response.data;
    } catch (error) {
      this.handleError(
        error as AxiosError,
        "Failed to get auctions by address"
      );
    }
  }

  async getAuctionById(auctionId: number): Promise<Auction> {
    try {
      const response = await api.get(`/auction/byId/${auctionId}`);
      return response.data;
    } catch (error) {
      this.handleError(error as AxiosError, "Failed to get auction by ID");
    }
  }

  async getAuctionBySmartContractId(smartContractId: number): Promise<Auction> {
    try {
      const response = await api.get(`/auction/bysId/${smartContractId}`);
      return response.data;
    } catch (error) {
      this.handleError(
        error as AxiosError,
        "Failed to get auction by smart contract ID"
      );
    }
  }

  async payBid(smartContractId: number): Promise<void> {
    try {
      await api.post(`/payBid?smartContractId=${smartContractId}`);
    } catch (error) {
      this.handleError(error as AxiosError, "Failed to pay bid");
    }
  }

  // Additional Endpoints
  async getBySmartId(smartId: number): Promise<any> {
    try {
      const response = await api.get(`/getbysmartId/${smartId}`);
      return response.data;
    } catch (error) {
      this.handleError(error as AxiosError, "Failed to get by smart ID");
    }
  }

  async getToken(id: number): Promise<any> {
    try {
      const response = await api.get(`/token/${id}`);
      return response.data;
    } catch (error) {
      this.handleError(error as AxiosError, "Failed to get token");
    }
  }
}

export default OnRealAPI;
