

import { contractABI, contractAddress } from '../../abi/EstatePool';
import { client } from '../../config/viem';
import { UserTokenData } from '../interfaces/interfaces';

// View Functions Implementation
export const EstatePoolView = {
  // Get auction counter
  getAuctionCounter: async () => {
    return await client.readContract({
      address: contractAddress,
      abi: contractABI,
      functionName: "getAuctionCounter",
    });
  },

  // Get auction data for a specific token
  getAuctionData: async (tokenId: bigint) => {
    return await client.readContract({
      address: contractAddress,
      abi: contractABI,
      functionName: "getAuctionData",
      args: [tokenId],
    });
  },

  // Get all auctions
  getAuctions: async () => {
    return await client.readContract({
      address: contractAddress,
      abi: contractABI,
      functionName: "getAuctions",
    });
  },

  // Get available token amount
  getAvailableTokenAmount: async (tokenId: bigint) => {
    return await client.readContract({
      address: contractAddress,
      abi: contractABI,
      functionName: "getAvailableTokenAmount",
      args: [tokenId],
    });
  },

  // Get meta mapping data
  getMetaMapping: async (metaId: number) => {
    return await client.readContract({
      address: contractAddress,
      abi: contractABI,
      functionName: "getMetaMapping",
      args: [metaId],
    });
  },

  // Get token counter
  getTokenCounter: async () => {
    return await client.readContract({
      address: contractAddress,
      abi: contractABI,
      functionName: "getTokenCounter",
    });
  },

  // Get token data
  getTokenData: async (tokenId: bigint) => {
    return await client.readContract({
      address: contractAddress,
      abi: contractABI,
      functionName: "getTokenData",
      args: [tokenId],
    });
  },

  // Get user balance
  getUserBalance: async (shortForm: string, userAddress: `0x${string}`) => {
    return await client.readContract({
      address: contractAddress,
      abi: contractABI,
      functionName: "getUserBalance",
      args: [shortForm, userAddress],
    });
  },

  // Get user tokens data
  getUserTokensData: async (userAddress: `0x${string}`) => {
    return await client.readContract({
      address: contractAddress,
      abi: contractABI,
      functionName: "getUserTokensData",
      args: [userAddress],
    }) as UserTokenData[];
  },

  // Get user TVL (Total Value Locked)
  getUserTvl: async (userAddress: `0x${string}`) => {
    return await client.readContract({
      address: contractAddress,
      abi: contractABI,
      functionName: "getUserTvl",
      args: [userAddress],
    });
  },

  // Get user yields
  getUserYields: async (userAddress: `0x${string}`) => {
    return await client.readContract({
      address: contractAddress,
      abi: contractABI,
      functionName: "getUserYields",
      args: [userAddress],
    });
  },

  // Check if approved for all
  //   isApprovedForAll: async (account: string, operator: string) => {
  //     return await client.readContract({
  //       address: contractAddress,
  //       abi: contractABI,
  //       functionName: "isApprovedForAll",
  //       args: [account, operator],
  //     });
  //   },

  // Get balance of
  balanceOf: async (account: `0x${string}`, id: bigint) => {
    return await client.readContract({
      address: contractAddress,
      abi: contractABI,
      functionName: "balanceOf",
      args: [account, id],
    });
  },

  // Get balance of batch
  balanceOfBatch: async (accounts: `0x${string}`[], ids: bigint[]) => {
    return await client.readContract({
      address: contractAddress,
      abi: contractABI,
      functionName: "balanceOfBatch",
      args: [accounts, ids],
    });
  },

  // Check interface support
  //   supportsInterface: async (interfaceId: string) => {
  //     return await client.readContract({
  //       address: contractAddress,
  //       abi: contractABI,
  //       functionName: "supportsInterface",
  //       args: [interfaceId],
  //     });
  //   },

  // Get URI
  uri: async (tokenId: bigint) => {
    return await client.readContract({
      address: contractAddress,
      abi: contractABI,
      functionName: "uri",
      args: [tokenId],
    });
  },
};