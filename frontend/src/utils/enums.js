// ===============================
// 1. Contract Enum (Solidity mapping)
// ===============================
export const TokenType = {
  NATIVE: 0,
  USDC: 1,
};

// ===============================
// 2. Internal Canonical Tokens
// ===============================
export const TOKENS = {
  NATIVE: "NATIVE",
  USDC: "USDC",
};

// ===============================
// 3. UI → Internal Normalization Map
// (what your select input sends)
// ===============================
export const UI_TOKEN_MAP = {
  INJ: TOKENS.NATIVE,
  ETH: TOKENS.NATIVE,
  BNB: TOKENS.NATIVE,
  USDC: TOKENS.USDC,
};

// ===============================
// 4. Internal → Contract Enum Mapping
// ===============================
export const TOKEN_TYPE_MAP = {
  [TOKENS.NATIVE]: TokenType.NATIVE,
  [TOKENS.USDC]: TokenType.USDC,
};

// ===============================
// 5. Normalize UI token
// ===============================
export const normalizeToken = (uiToken) => {
  if (!uiToken) throw new Error("Token is required");

  const normalized = UI_TOKEN_MAP[uiToken.toUpperCase()];

  if (!normalized) {
    throw new Error(`Unsupported UI token: ${uiToken}`);
  }

  return normalized;
};

// ===============================
// 6. Get contract enum from internal token
// ===============================
export const getTokenType = (token) => {
  const type = TOKEN_TYPE_MAP[token];

  if (type === undefined) {
    throw new Error(`Unsupported token: ${token}`);
  }

  return type;
};

// ===============================
// 7. One-step resolver (UI → enum)
// ===============================
export const resolveTokenType = (uiToken) => {
  const normalized = normalizeToken(uiToken);
  return getTokenType(normalized);
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
