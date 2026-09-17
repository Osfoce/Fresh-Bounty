import {
  CHAIN_IDS,
  NATIVE_TOKENS,
  TOKEN_ADDRESSES,
} from "./chains.address";

// // ===============================
// // 1. Contract Enum (Solidity mapping)
// // ===============================
// export const TokenType = {
//   NATIVE: 0,
//   USDC: 1,
// };

// // ===============================
// // 2. Internal Canonical Tokens
// // ===============================
// export const TOKENS = {
//   NATIVE: "NATIVE",
//   USDC: "USDC",
// };

// // ===============================
// // 3. UI → Internal Normalization Map
// // (what your select input sends)
// // ===============================
// export const UI_TOKEN_MAP = {
//   INJ: TOKENS.NATIVE,
//   ETH: TOKENS.NATIVE,
//   tCTC: TOKENS.NATIVE,
//   USDC: TOKENS.USDC,
// };

// // ===============================
// // 4. Internal → Contract Enum Mapping
// // ===============================
// export const TOKEN_TYPE_MAP = {
//   [TOKENS.NATIVE]: TokenType.NATIVE,
//   [TOKENS.USDC]: TokenType.USDC,
// };

// // ===============================
// // 5. Normalize UI token
// // ===============================
// export const normalizeToken = (uiToken) => {
//   if (!uiToken) throw new Error("Token is required");

//   const normalized = UI_TOKEN_MAP[uiToken.toUpperCase()];

//   if (!normalized) {
//     throw new Error(`Unsupported UI token: ${uiToken}`);
//   }

//   return normalized;
// };

// // ===============================
// // 6. Get contract enum from internal token
// // ===============================
// export const getTokenType = (token) => {
//   const type = TOKEN_TYPE_MAP[token];

//   if (type === undefined) {
//     throw new Error(`Unsupported token: ${token}`);
//   }

//   return type;
// };

// // ===============================
// // 7. One-step resolver (UI → enum)
// // ===============================
// export const resolveTokenType = (uiToken) => {
//   const normalized = normalizeToken(uiToken);
//   return getTokenType(normalized);
// };

// Payout types for multiple winners
export const PayoutType = {
  SINGLE: 0,
  MULTI_EQUAL: 1,
  MULTI_PERCENTAGE: 2,
};

// For multiple winners, we have two options: equal split or percentage-based
export const getPayoutType = ({ winnersAllowed, payoutType }) => {
  if (winnersAllowed === 1 || payoutType === "SINGLE") return PayoutType.SINGLE;

  // if (!["MULTI_EQUAL", "MULTI_PERCENTAGE", "SINGLE"].includes(payoutType)) {
  //   throw new Error("Invalid payout type");
  // }

  if (payoutType === "MULTI_EQUAL") return PayoutType.MULTI_EQUAL;
  if (payoutType === "MULTI_PERCENTAGE") return PayoutType.MULTI_PERCENTAGE;

  return PayoutType.SINGLE; // default to single if something's off
};




// ===============================
// 1. Contract Enum (Solidity mapping)
// Must match the Solidity enum order exactly.
// ===============================
export const TokenType = {
  NATIVE: 0, // Solidity: ETH
  USDC: 1,   // Solidity: USDC
  // Add more here if/when the contract enum grows:
  // USDT: 2,
};

// ===============================
// 2. Internal Canonical Tokens
// ===============================
export const TOKENS = {
  NATIVE: "NATIVE",
  USDC: "USDC",
  // USDT: "USDT",
};

// ===============================
// 3. Build per-chain UI → Internal map
// Derives from NATIVE_TOKENS + TOKEN_ADDRESSES.
// ===============================
export const buildUiTokenMap = (chainId) => {
  const map = {};

  // Native token for this chain (INJ, tCTC, ...)
  const native = NATIVE_TOKENS[chainId];
  if (native) {
    // Map both the symbol and the canonical "NATIVE" key
    map[native.symbol.toUpperCase()] = TOKENS.NATIVE;
    map["NATIVE"] = TOKENS.NATIVE;
    // Optional aliases for the UI
    map["INJ"] = TOKENS.NATIVE;
    map["ETH"] = TOKENS.NATIVE;
    map["TCTC"] = TOKENS.NATIVE;
  }

  // ERC20 tokens for this chain
  const erc20s = TOKEN_ADDRESSES[chainId] || {};
  for (const [key, token] of Object.entries(erc20s)) {
    map[key.toUpperCase()] = token.contractTokenType; // e.g. "USDC"
    if (token.symbol) {
      map[token.symbol.toUpperCase()] = token.contractTokenType;
    }
  }

  return map;
};

// ===============================
// 4. Internal → Contract Enum Mapping
// ===============================
export const TOKEN_TYPE_MAP = {
  [TOKENS.NATIVE]: TokenType.NATIVE,
  [TOKENS.USDC]: TokenType.USDC,
  // [TOKENS.USDT]: TokenType.USDT,
};

// ===============================
// 5. Normalize UI token (chain-aware)
// ===============================
export const normalizeToken = (uiToken, chainId) => {
  if (!uiToken) throw new Error("Token is required");
  if (!chainId) throw new Error("chainId is required");

  const uiMap = buildUiTokenMap(chainId);
  const normalized = uiMap[uiToken.toUpperCase()];

  if (!normalized) {
    throw new Error(`Unsupported UI token "${uiToken}" on chain ${chainId}`);
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
// 7. One-step resolver (UI → enum), chain-aware
// ===============================
export const resolveTokenType = (uiToken, chainId) => {
  const normalized = normalizeToken(uiToken, chainId);
  return getTokenType(normalized);
};

// ===============================
// 8. Get token metadata (decimals, address) for a chain
// ===============================
export const getTokenMeta = (uiToken, chainId) => {
  if (!uiToken) throw new Error("Token is required");
  if (!chainId) throw new Error("chainId is required");

  const upper = uiToken.toUpperCase();
  const native = NATIVE_TOKENS[chainId];

  // Native?
  if (native && (upper === native.symbol.toUpperCase() || upper === "NATIVE")) {
    return {
      kind: "native",
      symbol: native.symbol,
      decimals: native.decimals,
      address: null,
      tokenType: TokenType.NATIVE,
    };
  }

  // ERC20?
  const erc20s = TOKEN_ADDRESSES[chainId] || {};
  for (const token of Object.values(erc20s)) {
    if (token.symbol?.toUpperCase() === upper || token.address?.toLowerCase() === uiToken.toLowerCase()) {
      return {
        kind: "erc20",
        symbol: token.symbol,
        decimals: token.decimals,
        address: token.address,
        tokenType: getTokenType(token.contractTokenType),
      };
    }
  }

  throw new Error(`Unknown token "${uiToken}" on chain ${chainId}`);
};

// ===============================
// 9. Convenience: list tokens available on a chain (for UI dropdowns)
// ===============================
export const listTokensForChain = (chainId) => {
  const out = [];

  const native = NATIVE_TOKENS[chainId];
  if (native) {
    out.push({
      key: "NATIVE",
      label: native.symbol,
      kind: "native",
      decimals: native.decimals,
      tokenType: TokenType.NATIVE,
    });
  }

  const erc20s = TOKEN_ADDRESSES[chainId] || {};
  for (const [key, token] of Object.entries(erc20s)) {
    out.push({
      key,
      label: token.symbol || key,
      kind: "erc20",
      decimals: token.decimals,
      address: token.address,
      tokenType: getTokenType(token.contractTokenType),
    });
  }

  return out;
};