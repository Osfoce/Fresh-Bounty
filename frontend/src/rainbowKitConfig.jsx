import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { supportedChains } from "./rainbowChains";

// Environment Variables
const projectId = import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID;

// Contract Address
export const CONTRACT_ADDRESS = "0xc49c0457c656B901324cB7f9b6736D80f1DBD28B";

// RainbowKit Configuration
export default getDefaultConfig({
  appName: "Fresh Bounty",
  projectId: projectId,
  chains: supportedChains,
  ssr: true,
});
