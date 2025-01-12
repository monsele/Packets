import { createPublicClient, http, PublicClient } from "viem";
import { baseSepolia } from "viem/chains";

const RPC_URL = `https://base-sepolia.g.alchemy.com/v2/rEYE-8dcbVFNNd5dlyvS1tLywyh-fOGf`;
export const client = createPublicClient({
  chain: baseSepolia,
  transport: http(
    RPC_URL
  ),
}) as PublicClient;
