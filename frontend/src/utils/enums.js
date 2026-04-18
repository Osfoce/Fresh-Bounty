export const TokenType = {
  NATIVE: 0, // ETH, INJ, BNB (network gas token)
  USDC: 1,
  // add other ERC‑20 tokens here (e.g., DAI: 4)
};

export const TOKENS = {
  NATIVE: "NATIVE",
  USDC: "USDC",
};

export const TOKEN_TYPE_MAP = {
  [TOKENS.NATIVE]: TokenType.NATIVE,
  [TOKENS.USDC]: TokenType.USDC,
};

export const getTokenType = (token) => {
  const type = TOKEN_TYPE_MAP[token];
  if (type === undefined) {
    throw new Error(`Unsupported token: ${token}`);
  }
  return type;
};

// Payout types for multiple winners
export const PayoutType = {
  SINGLE: 0,
  MULTIPLE: 1,
};

// For multiple winners, we have two options: equal split or percentage-based
export const getPayoutType = ({ winnersAllowed, payoutType }) => {
  if (winnersAllowed === 1) return PayoutType.SINGLE;

  if (!["equal", "percentage"].includes(payoutType)) {
    throw new Error("Invalid payout type");
  }

  return PayoutType.MULTIPLE;
};
