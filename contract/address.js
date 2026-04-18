import { sepolia, baseSepolia, opBNBTestnet } from "wagmi/chains";

const injectiveTestnetRpcUrl =
  "https://k8s.testnet.json-rpc.injective.network/";
const injectiveTestnetExplorerUrl =
  "https://testnet.explorer.injective.network/";

// Injective Testnet Configuration
const injectiveTestnet = {
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

export const CONTRACT_ADDRESSES = {
  [sepolia.id]: {
    bounty: "Loading...",
  },
  [baseSepolia.id]: {
    bounty: "Loading...",
  },
  [opBNBTestnet.id]: {
    bounty: "Loading...",
  },
  [injectiveTestnet.id]: {
    bounty: "0xc49c0457c656B901324cB7f9b6736D80f1DBD28B",
  },
};
