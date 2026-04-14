import { sepolia, baseSepolia, opBNBTestnet } from "viem/chains";

const injectiveTestnetRpcUrl =
  "https://k8s.testnet.json-rpc.injective.network/";
const injectiveTestnetExplorerUrl =
  "https://testnet.explorer.injective.network/";

// Injective Testnet Configuration
export const injectiveTestnet = {
  id: 1439,
  name: "INJ Testnet",
  nativeCurrency: { name: "Injective", symbol: "INJ", decimals: 18 },
  rpcUrls: {
    default: { http: [injectiveTestnetRpcUrl] },
  },
  blockExplorers: {
    default: {
      name: "Injective Explorer",
      url: injectiveTestnetExplorerUrl,
    },
  },
  testnet: true,
};

export const supportedChains = [
  sepolia,
  baseSepolia,
  opBNBTestnet,
  injectiveTestnet,
];
