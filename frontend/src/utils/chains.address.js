export const CHAIN_IDS = {
  INJECTIVE: 1439,
  CREDITCOIN_TESTNET: 102031,
};

export const CONTRACT_ADDRESSES = {
  [CHAIN_IDS.INJECTIVE]: {
    // old contract: 0xc49c0457c656B901324cB7f9b6736D80f1DBD28B
    bounty: "0x0Cf3F7C12fb7d2796D9789DF8E449BE0740A1094",
  },
  [CHAIN_IDS.CREDITCOIN_TESTNET]: {
    bounty: "0x0E1aEb93cBE1749391f570eB8CE17Cd9BAD0E54c",
  },
};

export const NATIVE_TOKENS = {
  [CHAIN_IDS.INJECTIVE]: {
    symbol: "INJ",
    decimals: 18,
  },
  [CHAIN_IDS.CREDITCOIN_TESTNET]: {
    symbol: "tCTC",
    decimals: 18,
  },
};

export const TOKEN_ADDRESSES = {
  [CHAIN_IDS.INJECTIVE]: {
    WINJ: {
      address: "0x0000000088827d2d103ee2d9A6b781773AE03FfB",
      symbol: "WINJ",
      decimals: 18,
      // On-chain TokenType this UI token maps to
      contractTokenType: "USDC", // or add a new enum value if the contract supports it
    },
  },
  [CHAIN_IDS.CREDITCOIN_TESTNET]: {
    USDC: {
      address: "0x498482e334269a10d0621D3AC5e726734B01DDCe",
      symbol: "ccUSDC",
      decimals: 6,
      contractTokenType: "USDC",
    },
    // USDT: {
    //   address: "0x12E931FfD868dF8b8f31AaD47422674cA158D62c",
    //   symbol: "ccUSDT",
    //   decimals: 6,
    //   contractTokenType: "USDC", // <-- only if your contract has no USDT enum
    // },
  },
};
