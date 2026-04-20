// chains.js
import { sepolia, baseSepolia } from "viem/chains";
import { createPublicClient, http } from "viem";

export const CHAINS = {
  11155111: {
    chain: sepolia,
    rpc: process.env.SEPOLIA_RPC,
  },
  84532: {
    chain: baseSepolia,
    rpc: process.env.BASE_RPC,
  },
  5611: {
    chain: {
      id: 5611,
      name: "opBNB Testnet",
      nativeCurrency: { name: "BNB", symbol: "BNB", decimals: 18 },
      rpcUrls: { default: { http: ["https://opbnb-testnet-rpc"] } },
    },
    rpc: process.env.OPBNB_RPC,
  },
  1439: {
    chain: {
      id: 1439,
      name: "Injective Testnet",
      nativeCurrency: { name: "INJ", symbol: "INJ", decimals: 18 },
      rpcUrls: {
        default: {
          http: ["https://k8s.testnet.json-rpc.injective.network/"],
        },
      },
    },
    rpc: "https://k8s.testnet.json-rpc.injective.network/",
  },
};

export const getPublicClient = (chainId) => {
  const config = CHAINS[chainId];

  if (!config) {
    throw new Error(`Unsupported chainId: ${chainId}`);
  }

  return createPublicClient({
    chain: config.chain,
    transport: http(config.rpc),
  });
};
