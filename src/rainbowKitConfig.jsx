import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { sepolia } from "viem/chains";

// Environment Variables
const projectId = import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID;
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

// Contract Address
export const CONTRACT_ADDRESS = "0xc49c0457c656B901324cB7f9b6736D80f1DBD28B";

// RainbowKit Configuration
export default getDefaultConfig({
  appName: "Fresh Bounty",
  projectId: projectId,
  chains: [injectiveTestnet, sepolia],
  ssr: true,
});
