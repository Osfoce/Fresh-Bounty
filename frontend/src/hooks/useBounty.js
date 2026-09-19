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
import { parseEventLogs, decodeEventLog, getAbiItem } from "viem";
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
import { BOUNTY_ABI } from "../utils/abi";

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
  const fetchBountyIdFromTx = async (txHash) => {
    if (!txHash) {
      toast.error("Transaction hash is required");
      return null;
    }

    let receipt;
    try {
      receipt = await publicClient.waitForTransactionReceipt({
        hash: txHash,
        // Some chains need more confirmations before logs are available
        confirmations: 1,
        timeout: 60_000,
      });
    } catch (err) {
      console.error("waitForTransactionReceipt failed:", err);
      toast.error("Could not confirm transaction. Please check the explorer.");
      return null;
    }

    if (!receipt || receipt.status !== "success") {
      toast.error("Transaction reverted or not found");
      return null;
    }

    // ── Strategy 1: parseEventLogs with the full ABI (best case) ──
    const bountyIdFromParse = tryParseWithAbi(receipt.logs);
    if (bountyIdFromParse != null) return bountyIdFromParse;

    // ── Strategy 2: raw decode against logs that match the event topic ──
    const bountyIdFromTopic = tryDecodeFromTopics(receipt.logs);
    if (bountyIdFromTopic != null) return bountyIdFromTopic;

    // ── Strategy 3: refetch the receipt (some RPCs lag on logs) ──
    const bountyIdFromRetry = await retryWithBackoff(txHash, 3);
    if (bountyIdFromRetry != null) return bountyIdFromRetry;

    // ── Strategy 4: final fallback — ask user / let caller handle ──
    console.warn(
      "Could not extract bountyId from receipt logs. Chain may not expose event logs via RPC.",
    );
    return null;
  };

  // ─────────────────────────────────────────────
  // Helpers
  // ─────────────────────────────────────────────

  function tryParseWithAbi(logs) {
    try {
      if (!logs?.length) return null;

      const events = parseEventLogs({
        abi: BOUNTY_ABI,
        logs,
        eventName: "BountyCreated",
      });

      const id = events?.[0]?.args?.bountyId;
      return id != null ? Number(id) : null;
    } catch (err) {
      console.warn("parseEventLogs failed:", err);
      return null;
    }
  }

  function tryDecodeFromTopics(logs) {
    try {
      if (!logs?.length) return null;

      // Get the topic hash for BountyCreated from the ABI
      const eventAbi = getAbiItem({ abi: BOUNTY_ABI, name: "BountyCreated" });
      if (!eventAbi) return null;

      // We need the topic0 hash. viem computes it internally, so instead
      // of manually hashing, we just attempt decode on every log and skip failures.
      for (const log of logs) {
        try {
          const decoded = decodeEventLog({
            abi: BOUNTY_ABI,
            data: log.data,
            topics: log.topics,
          });

          if (decoded?.eventName === "BountyCreated") {
            const id = decoded.args?.bountyId;
            if (id != null) return Number(id);
          }
        } catch {
          // Not our event — skip
          continue;
        }
      }
      return null;
    } catch (err) {
      console.warn("decodeEventLog failed:", err);
      return null;
    }
  }

  async function retryWithBackoff(txHash, attempts = 3) {
    for (let i = 0; i < attempts; i++) {
      await new Promise((r) => setTimeout(r, 1500 * (i + 1)));

      try {
        const freshReceipt = await publicClient.getTransactionReceipt({
          hash: txHash,
        });

        const id = tryParseWithAbi(freshReceipt?.logs);
        if (id != null) return id;

        const idFromTopics = tryDecodeFromTopics(freshReceipt?.logs);
        if (idFromTopics != null) return idFromTopics;
      } catch (err) {
        console.warn(`Retry ${i + 1} failed:`, err);
      }
    }
    return null;
  }
  // const fetchBountyIdFromTx = async (txHash) => {
  //   console.log(`Fetching bountyId from txHash: ${txHash}`);
  //   console.log(typeof txHash);
  //   if (!txHash) {
  //     toast.error("Transaction hash is required");
  //     return null;
  //   }

  //   try {
  //     const receipt = await publicClient.waitForTransactionReceipt({
  //       hash: txHash,
  //     });

  //     if (receipt.status !== "success") {
  //       throw new Error("Transaction reverted");
  //     }
  //     console.log("Receipt logs for bountyId fetch:", receipt.logs);
  //     console.log("Full receipt for bountyId fetch:", receipt);
  //     const events = parseEventLogs({
  //       abi: BOUNTY_ABI,
  //       logs: receipt.logs,
  //       eventName: "BountyCreated",
  //     });
  //     console.log(`retrived id ${events?.[0]?.args?.bountyId}`);

  //     return events?.[0]?.args?.bountyId
  //       ? Number(events[0].args.bountyId)
  //       : null;
  //   } catch (error) {
  //     console.error(error);
  //     toast.error("Failed to retrieve bountyId from transaction");
  //     return null;
  //   }
  // };

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
    console.log("creating bounty via contract");
    return executeTx(
      prepareCreateBountyTx,
      { bountyData, account, chainId },
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
      },
    );
  };

  //   only admin can call this function, so we don't need to expose it in the UI for now
  const withdrawFees = async (tokenType, recipient) => {
    return executeTx(
      prepareWithdrawTx,
      { tokenType, recipient },
      { successMessage: "Fees withdrawn!", eventName: "FeeWithdrawn" },
    );
  };

  return {
    // States
    isPending,
    isConfirming,
    txHash,
    txError,
    // Read hooks
    fetchBountyIdFromTx,
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
