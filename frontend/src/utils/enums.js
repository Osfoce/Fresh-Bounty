export const TokenType = {
  ETH: 0,
  WINJ: 1,
};

export const PayoutType = {
  SINGLE: 0,
  MULTIPLE: 1,
};

export const getTokenType = (token) => {
  if (token === "WINJ") return TokenType.WINJ;
  return TokenType.ETH;
};

export const getPayoutType = ({ winnersAllowed, payoutType }) => {
  if (winnersAllowed === 1) return PayoutType.SINGLE;

  if (!["equal", "percentage"].includes(payoutType)) {
    throw new Error("Invalid payout type");
  }

  return PayoutType.MULTIPLE;
};
