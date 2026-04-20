import { parseEther, formatEther, parseEventLogs } from "viem";
import { BOUNTY_ABI, CONTRACT_ADDRESSES } from "contract";
import { resolveTokenType, getPayoutType } from "../utils/enums";

/**
 * Get contract address dynamically
 */
export const getBountyContract = (chainId) => {
  return CONTRACT_ADDRESSES[chainId]?.bounty;
};

/**
 * Create bounty (prepared config for wagmi)
 * make sure to check for chain ID to be sure the contract is deployed on that network
 */
export const prepareCreateBountyTx = ({ bountyData, account, chainId }) => {
  const address = getBountyContract(chainId);

  const tokenType = resolveTokenType(bountyData.token);
  const payoutType = getPayoutType(
    bountyData.winnersAllowed,
    bountyData.payoutType,
  );
  console.log(`Payout type: ${payoutType} (0 for single, 1 for multiple)`);

  const feePercent = 5; // or fetch from contract
  const fee = (bountyData.reward * feePercent) / 100;

  const total = bountyData.reward + fee;

  const rewardWei = parseEther(bountyData.reward.toString());
  const totalWei = parseEther(total.toString());

  return {
    address,
    abi: BOUNTY_ABI,
    functionName: "createBounty",
    args: [tokenType, rewardWei, payoutType],
    account,
    value: tokenType === 0 ? totalWei : undefined, // ETH only
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
  console.log(
    `Getting claimable rewards for bountyId: ${bountyId}, user: ${user}, chainId: ${chainId}`,
  );
  return {
    address: getBountyContract(chainId),
    abi: BOUNTY_ABI,
    functionName: "claimableRewards",
    args: [BigInt(bountyId), user],
  };
};

// /**
//  * Get bountyId from a transaction hash by parsing the BountyCreated event
//  * @param {string} txHash - Transaction hash
//  * @param {object} publicClient - Viem public client
//  * @returns {Promise<number|null>} - Bounty ID or null if not found
//  */
// export const getBountyIdFromTxHash = async (txHash, publicClient) => {
//   try {
//     const receipt = await publicClient.getTransactionReceipt({ hash: txHash });
//     if (receipt.status !== "success") return null;

//     const events = parseEventLogs({
//       abi: BOUNTY_ABI,
//       logs: receipt.logs,
//       eventName: "BountyCreated",
//     });

//     if (events.length > 0) {
//       return Number(events[0].args.bountyId);
//     }
//     return null;
//   } catch (error) {
//     console.error("Error fetching bountyId from txHash:", error);
//     return null;
//   }
// };

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

// Get full bounty info (read)
export const getBountyInfoConfig = ({ bountyId, chainId }) => ({
  address: getBountyContract(chainId),
  abi: BOUNTY_ABI,
  functionName: "getBountyInfo",
  args: [BigInt(bountyId)],
});

// Get all available bounty IDs
export const getAvailableBountiesConfig = ({ chainId }) => ({
  address: getBountyContract(chainId),
  abi: BOUNTY_ABI,
  functionName: "availableBounties",
  args: [],
});

// Get bounties by creator
export const getBountiesByCreatorConfig = ({ creator, chainId }) => ({
  address: getBountyContract(chainId),
  abi: BOUNTY_ABI,
  functionName: "bountiesByCreator",
  args: [creator],
});

// Get user submissions
export const getUserSubmissionsConfig = ({ user, chainId }) => ({
  address: getBountyContract(chainId),
  abi: BOUNTY_ABI,
  functionName: "userSubmissions",
  args: [user],
});

// Get all bounty IDs (historical)
export const getAllBountyIdsConfig = ({ chainId }) => ({
  address: getBountyContract(chainId),
  abi: BOUNTY_ABI,
  functionName: "allBountyIds",
  args: [],
});

// Get total fees
export const getTotalEthFeesConfig = ({ chainId }) => ({
  address: getBountyContract(chainId),
  abi: BOUNTY_ABI,
  functionName: "totalEthFees",
  args: [],
});

export const getTotalUsdcFeesConfig = ({ chainId }) => ({
  address: getBountyContract(chainId),
  abi: BOUNTY_ABI,
  functionName: "totalUsdcFees",
  args: [],
});

// Get constants
export const getFeePercentConfig = ({ chainId }) => ({
  address: getBountyContract(chainId),
  abi: BOUNTY_ABI,
  functionName: "FEE_PERCENT",
  args: [],
});

export const getBasisPointsConfig = ({ chainId }) => ({
  address: getBountyContract(chainId),
  abi: BOUNTY_ABI,
  functionName: "BASIS_POINTS",
  args: [],
});

export const getMaxWinnersConfig = ({ chainId }) => ({
  address: getBountyContract(chainId),
  abi: BOUNTY_ABI,
  functionName: "MAX_WINNERS",
  args: [],
});

export const getOwnerConfig = ({ chainId }) => ({
  address: getBountyContract(chainId),
  abi: BOUNTY_ABI,
  functionName: "owner",
  args: [],
});

export const getUsdcTokenConfig = ({ chainId }) => ({
  address: getBountyContract(chainId),
  abi: BOUNTY_ABI,
  functionName: "usdcToken",
  args: [],
});

// fees withdrawal
export const prepareWithdrawTx = ({
  tokenType,
  recipient,
  account,
  chainId,
}) => {
  return {
    address: getBountyContract(chainId),
    abi: BOUNTY_ABI,
    functionName: "withdraw",
    args: [tokenType, recipient],
    account,
  };
};
