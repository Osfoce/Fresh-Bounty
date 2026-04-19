// hooks/useBounty.js
import {
  useWriteContract,
  useWaitForTransactionReceipt,
  useReadContract,
  useAccount,
  useChainId,
  usePublicClient,
} from "wagmi";
import { useState, useEffect } from "react";
import { parseEventLogs } from "viem";
import toast from "react-hot-toast";
import {
  prepareCreateBountyTx,
  prepareClaimTx,
  getClaimableConfig,
  prepareAssignSingleWinnerTx,
  prepareAssignMultipleWinnersTx,
  prepareSubmitTx,
  getClaimedConfig,
  getBountyInfoConfig,
  getAvailableBountiesConfig,
  getBountiesByCreatorConfig,
  getUserSubmissionsConfig,
  getTotalEthFeesConfig,
  getTotalUsdcFeesConfig,
  getFeePercentConfig,
  getMaxWinnersConfig,
  getOwnerConfig,
  prepareWithdrawTx,
  formatReward,
} from "../services/bountyService";
import { BOUNTY_ABI } from "contract";

export const useBounty = () => {
  const { address: account } = useAccount();
  const chainId = useChainId();
  const publicClient = usePublicClient();

  // Transaction states
  const [isPending, setIsPending] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [txHash, setTxHash] = useState(null);
  const [txError, setTxError] = useState(null);

  // Wagmi write hook
  const { writeContractAsync } = useWriteContract();

  // Wait for transaction receipt (for UI feedback)
  const { isLoading: isWaiting, isSuccess } = useWaitForTransactionReceipt({
    hash: txHash,
  });

  useEffect(() => {
    if (isWaiting) {
      setIsConfirming(true);
      setIsPending(false);
    } else if (isSuccess) {
      setIsConfirming(false);
      setTxHash(null);
      // Toast success is already shown inside executeTx, but we keep this for consistency
    }
  }, [isWaiting, isSuccess]);

  // Core transaction executor with event parsing
  const executeTx = async (prepareFn, params, options = {}) => {
    const { successMessage = "Transaction successful", eventName } = options;

    if (!account) {
      toast.error("Please connect your wallet");
      throw new Error("No account connected");
    }
    if (!chainId) {
      toast.error("No network detected");
      throw new Error("No chain ID");
    }

    const txConfig = prepareFn({ ...params, account, chainId });
    if (!txConfig.address) {
      toast.error("Contract not deployed on this network");
      throw new Error("Contract address missing");
    }

    setIsPending(true);
    setTxError(null);
    try {
      // Send transaction
      const hash = await writeContractAsync(txConfig);
      setTxHash(hash);
      toast.loading("Transaction sent. Waiting for confirmation...", {
        id: hash,
      });

      // Wait for receipt using public client
      const receipt = await publicClient.waitForTransactionReceipt({ hash });
      console.log("Receipt logs:", receipt.logs);
      console.log("Full receipt:", receipt);
      if (receipt.status !== "success") {
        throw new Error("Transaction reverted");
      }

      // Success toast
      toast.success(successMessage, { id: hash });

      // Parse event if requested
      let eventData = null;
      if (eventName && receipt.logs.length > 0) {
        const events = parseEventLogs({
          abi: BOUNTY_ABI,
          logs: receipt.logs,
          eventName: eventName,
        });

        const matched = events.find((e) => e.eventName === eventName);

        if (matched) {
          eventData = matched.args;
        }
      }

      return { hash, receipt, eventData };
    } catch (err) {
      console.error(err);
      setTxError(err);
      toast.error(err.message || "Transaction failed");
      throw err;
    } finally {
      setIsPending(false);
    }
  };

  // ---------- Public read hooks (using useReadContract) ----------
  const useClaimableReward = (bountyId, user) => {
    return useReadContract({
      ...(bountyId && user && chainId
        ? getClaimableConfig({ bountyId, user, chainId })
        : {}),
      query: {
        enabled: !!bountyId && !!user && !!chainId,
      },
    });
  };

  const useClaimedStatus = (bountyId, user) => {
    return useReadContract({
      ...(bountyId && user && chainId
        ? getClaimedConfig({ bountyId, user, chainId })
        : {}),
      query: {
        enabled: !!bountyId && !!user && !!chainId,
      },
    });
  };

  const useBountyInfo = (bountyId) => {
    const config =
      bountyId && chainId ? getBountyInfoConfig({ bountyId, chainId }) : null;
    return useReadContract({
      ...config,
      query: { enabled: !!bountyId && !!chainId && !!config?.address },
    });
  };

  const useAvailableBounties = () => {
    const config = chainId ? getAvailableBountiesConfig({ chainId }) : null;
    return useReadContract({
      ...config,
      query: { enabled: !!chainId && !!config?.address },
    });
  };

  const useBountiesByCreator = (creator) => {
    const config =
      creator && chainId
        ? getBountiesByCreatorConfig({ creator, chainId })
        : null;
    return useReadContract({
      ...config,
      query: { enabled: !!creator && !!chainId && !!config?.address },
    });
  };

  const useUserSubmissions = (user) => {
    const config =
      user && chainId ? getUserSubmissionsConfig({ user, chainId }) : null;
    return useReadContract({
      ...config,
      query: { enabled: !!user && !!chainId && !!config?.address },
    });
  };

  const useTotalEthFees = () => {
    const config = chainId ? getTotalEthFeesConfig({ chainId }) : null;
    return useReadContract({
      ...config,
      query: { enabled: !!chainId && !!config?.address },
    });
  };

  const useTotalUsdcFees = () => {
    const config = chainId ? getTotalUsdcFeesConfig({ chainId }) : null;
    return useReadContract({
      ...config,
      query: { enabled: !!chainId && !!config?.address },
    });
  };

  const useFeePercent = () => {
    const config = chainId ? getFeePercentConfig({ chainId }) : null;
    return useReadContract({
      ...config,
      query: { enabled: !!chainId && !!config?.address },
    });
  };

  const useMaxWinners = () => {
    const config = chainId ? getMaxWinnersConfig({ chainId }) : null;
    return useReadContract({
      ...config,
      query: { enabled: !!chainId && !!config?.address },
    });
  };

  const useOwner = () => {
    const config = chainId ? getOwnerConfig({ chainId }) : null;
    return useReadContract({
      ...config,
      query: { enabled: !!chainId && !!config?.address },
    });
  };

  // Then add all these to the return object.

  // ---------- Write actions with event parsing ----------
  const createBounty = async (bountyData) => {
    return executeTx(
      prepareCreateBountyTx,
      { bountyData },
      {
        successMessage: "Bounty created!",
        eventName: "BountyCreated",
      },
    );
  };

  const claimReward = async (bountyId) => {
    return executeTx(
      prepareClaimTx,
      { bountyId },
      {
        successMessage: "Reward claimed!",
        eventName: "RewardClaimed",
      },
    );
  };

  const assignSingleWinner = async (bountyId, winner) => {
    return executeTx(
      prepareAssignSingleWinnerTx,
      { bountyId, winner },
      {
        successMessage: "Winner assigned!",
        eventName: "RewardsAssigned",
      },
    );
  };

  const assignMultipleWinners = async (bountyId, winners, percentages) => {
    return executeTx(
      prepareAssignMultipleWinnersTx,
      { bountyId, winners, percentages },
      {
        successMessage: "Winners assigned!",
        eventName: "RewardsAssigned",
      },
    );
  };

  const submitSolution = async (bountyId, link) => {
    return executeTx(
      prepareSubmitTx,
      { bountyId, link },
      {
        successMessage: "Solution submitted!",
        eventName: "SubmissionCreated",
      },
    );
  };

  //   only admin can call this function, so we don't need to expose it in the UI for now
  const withdrawFees = async (tokenType, recipient) => {
    return executeTx(
      prepareWithdrawTx,
      { tokenType, recipient },
      { successMessage: "Fees withdrawn!" },
    );
  };

  return {
    // States
    isPending,
    isConfirming,
    txHash,
    txError,
    // Read hooks
    useClaimableReward,
    useClaimedStatus,
    useBountyInfo,
    useAvailableBounties,
    useBountiesByCreator,
    useUserSubmissions,
    useTotalEthFees,
    useTotalUsdcFees,
    useFeePercent,
    useMaxWinners,
    useOwner,
    // Write actions
    createBounty,
    claimReward,
    assignSingleWinner,
    assignMultipleWinners,
    submitSolution,
    withdrawFees,
    // Helpers
    formatReward,
  };
};
