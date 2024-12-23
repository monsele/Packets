import { http, createConfig,createStorage } from "wagmi";
import { baseSepolia } from "wagmi/chains";
import { injected } from "wagmi/connectors";

const config = createConfig({
  chains: [baseSepolia],
  connectors: [injected()],
  transports: {
    [baseSepolia.id]: http(
      `https://base-sepolia.g.alchemy.com/v2/rEYE-8dcbVFNNd5dlyvS1tLywyh-fOGf`
    ),
  },
  ssr: true,
  storage: createStorage({ storage: window.localStorage }),
});

export default config;
