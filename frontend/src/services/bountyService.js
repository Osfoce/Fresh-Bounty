import { parseEther, formatEther } from "viem";
import { BOUNTY_ABI, CONTRACT_ADDRESSES } from "contract";
// import { CONTRACT_ADDRESSES } from "";
import { getTokenType, getPayoutType } from "../utils/enums";

/**
 * Get contract address dynamically
 */
export const getBountyContract = (chainId) => {
  return CONTRACT_ADDRESSES[chainId]?.bounty;
};

/**
 * Create bounty (prepared config for wagmi)
 */
export const prepareCreateBountyTx = ({ bountyData, account, chainId }) => {
  const address = getBountyContract(chainId);

  const tokenType = getTokenType(bountyData.token);
  const payoutType = getPayoutType(
    bountyData.winnersAllowed,
    bountyData.payoutType,
  );

  const rewardWei = parseEther(bountyData.reward.toString());

  return {
    address,
    abi: BOUNTY_ABI,
    functionName: "createBounty",
    args: [tokenType, rewardWei, payoutType],
    account,
    value: tokenType === 0 ? rewardWei : undefined, // ETH only
  };
};

/**
 * Claim reward (prepared config)
 */
export const prepareClaimTx = ({ bountyId, account, chainId }) => {
  return {
    address: getBountyContract(chainId),
    abi: BOUNTY_ABI,
    functionName: "claimReward",
    args: [BigInt(bountyId)],
    account,
  };
};

/**
 * Read claimable reward (for viem OR wagmi)
 */
export const getClaimableConfig = ({ bountyId, user, chainId }) => {
  return {
    address: getBountyContract(chainId),
    abi: BOUNTY_ABI,
    functionName: "claimableRewards",
    args: [BigInt(bountyId), user],
  };
};

/**
 * Format reward safely
 */
export const formatReward = (value) => {
  if (!value) return "0";
  return formatEther(value);
};

// Asigning single winner
export const prepareAssignSingleWinnerTx = ({
  bountyId,
  winner,
  account,
  chainId,
}) => {
  return {
    address: getBountyContract(chainId),
    abi: BOUNTY_ABI,
    functionName: "assignSingleWinner",
    args: [BigInt(bountyId), winner],
    account,
  };
};

// Assign multiple winner
export const prepareAssignMultipleWinnersTx = ({
  bountyId,
  winners,
  percentages,
  account,
  chainId,
}) => {
  return {
    address: getBountyContract(chainId),
    abi: BOUNTY_ABI,
    functionName: "assignMultipleWinners",
    args: [BigInt(bountyId), winners, percentages],
    account,
  };
};

// submission onchain
export const prepareSubmitTx = ({ bountyId, link, account, chainId }) => {
  return {
    address: getBountyContract(chainId),
    abi: BOUNTY_ABI,
    functionName: "submit",
    args: [BigInt(bountyId), link],
    account,
  };
};

// claimed ststus onchain
export const getClaimedConfig = ({ bountyId, user, chainId }) => {
  return {
    address: getBountyContract(chainId),
    abi: BOUNTY_ABI,
    functionName: "claimed",
    args: [BigInt(bountyId), user],
  };
};
