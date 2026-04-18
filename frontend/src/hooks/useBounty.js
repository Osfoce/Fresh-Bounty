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
    const config = getClaimableConfig({ bountyId, user, chainId });
    return useReadContract({
      ...config,
      query: { enabled: !!bountyId && !!user && !!chainId && !!config.address },
    });
  };

  const useClaimedStatus = (bountyId, user) => {
    const config = getClaimedConfig({ bountyId, user, chainId });
    return useReadContract({
      ...config,
      query: { enabled: !!bountyId && !!user && !!chainId && !!config.address },
    });
  };

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

  return {
    // States
    isPending,
    isConfirming,
    txHash,
    txError,
    // Read hooks
    useClaimableReward,
    useClaimedStatus,
    // Write actions
    createBounty,
    claimReward,
    assignSingleWinner,
    assignMultipleWinners,
    submitSolution,
    // Helpers
    formatReward,
  };
};
