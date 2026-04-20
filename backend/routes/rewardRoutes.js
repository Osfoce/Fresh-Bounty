// handles distribute, claim, winners, claimable, has‑claimed
// routes/rewardRoutes.js
const express = require("express");
const { ObjectId } = require("mongodb");
const { getDb } = require("../config/db");
import { formatEther, parseEventLogs } from "viem";
import { getPublicClient } from "../config/chains";
import { BOUNTY_ABI } from "../config/abi";

const router = express.Router();

router.post("/task/:id/distribute", async (req, res) => {
  const id = req.params.id;
  const { txHash, blockchainId, chainId, bountyContract } = req.body;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid bounty ID" });
  }

  if (!txHash || !blockchainId || !chainId || !bountyContract) {
    return res.status(400).json({ error: "All fields required" });
  }

  try {
    const db = getDb();

    const bounty = await db
      .collection("bounty")
      .findOne({ _id: new ObjectId(id) });

    if (!bounty) {
      return res.status(404).json({ error: "Bounty not found" });
    }

    // 🔥 STEP 1: Get receipt
    const publicClient = getPublicClient(chainId);

    const receipt = await publicClient.getTransactionReceipt({
      hash: txHash,
    });

    if (receipt.status !== "success") {
      throw new Error("Transaction failed on-chain");
    }

    // 🔥 STEP 2: Parse event
    const events = parseEventLogs({
      abi: BOUNTY_ABI,
      logs: receipt.logs,
      eventName: "RewardsAssigned",
    });

    if (!events.length) {
      throw new Error("RewardsAssigned event not found");
    }

    const event = events[0];
    const winners = event.args.winners;

    // 🔥 STEP 3: Fetch real amounts from contract
    const winnerDetails = await Promise.all(
      winners.map(async (winner) => {
        const amount = await publicClient.readContract({
          address: bountyContract,
          abi: BOUNTY_ABI,
          functionName: "claimableRewards",
          args: [BigInt(blockchainId), winner],
        });

        return {
          address: winner,
          amount: formatEther(amount), // convert later properly if needed
        };
      }),
    );

    // 🔥 STEP 4: Store
    const updateData = {
      winners: {
        assigned: winnerDetails,
        claimed: [],
        assignedAt: new Date().toISOString(),
        distributionTxHash: txHash,
      },
      rewardsAssignedOnChain: true,
      updatedAt: new Date().toISOString(),
    };

    await db
      .collection("bounty")
      .updateOne({ _id: new ObjectId(id) }, { $set: updateData });

    // 🔥 STEP 5: Update users
    await Promise.all(
      winnerDetails.map((winner) =>
        db.collection("users").updateOne(
          { walletAddress: winner.address },
          {
            $inc: { totalEarnings: winner.amount },
            $set: { lastUpdated: new Date().toISOString() },
            $push: {
              earnedFrom: {
                bountyId: id,
                bountyTitle: bounty.title,
                amount: winner.amount,
                earnedAt: new Date().toISOString(),
              },
            },
          },
          { upsert: true },
        ),
      ),
    );

    res.status(200).json({
      message: "Distribution synced from blockchain",
      winners: winnerDetails,
      chainId,
      txHash,
    });
  } catch (err) {
    console.error("🔥 DISTRIBUTION ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

// GET /task/:id/winners
router.get("/task/:id/winners", async (req, res) => {
  const id = req.params.id;
  if (!ObjectId.isValid(id))
    return res.status(400).json({ error: "Invalid bounty ID" });
  try {
    const db = getDb();
    const bounty = await db
      .collection("bounty")
      .findOne({ _id: new ObjectId(id) });
    if (!bounty) return res.status(404).json({ error: "Bounty not found" });
    res.status(200).json({
      winners: bounty.winners?.assigned || [],
      claimed: bounty.winners?.claimed || [],
      distributedAt: bounty.winners?.assignedAt || null,
      isDistributed: bounty.winners?.assigned?.length > 0,
      payoutType: bounty.winners?.payoutType || null,
    });
  } catch (err) {
    console.error("Failed to fetch winners:", err);
    res.status(500).json({ error: "Failed to fetch winners" });
  }
});

// GET /task/:id/claimable/:userAddress
router.get("/task/:id/claimable/:userAddress", async (req, res) => {
  const id = req.params.id;
  const userAddress = req.params.userAddress;
  if (!ObjectId.isValid(id))
    return res.status(400).json({ error: "Invalid bounty ID" });
  if (!userAddress || !userAddress.startsWith("0x")) {
    return res.status(400).json({ error: "Invalid user address" });
  }
  try {
    const db = getDb();
    const bounty = await db
      .collection("bounty")
      .findOne({ _id: new ObjectId(id) });
    if (!bounty) return res.status(404).json({ error: "Bounty not found" });
    if (!bounty.winners?.assigned || bounty.winners.assigned.length === 0) {
      return res
        .status(200)
        .json({ claimable: 0, message: "Rewards not yet distributed" });
    }
    const winner = bounty.winners.assigned.find(
      (w) => w.address.toLowerCase() === userAddress.toLowerCase(),
    );
    if (!winner)
      return res.status(200).json({ claimable: 0, message: "Not a winner" });
    const alreadyClaimed = bounty.winners.claimed?.some(
      (c) => c.address.toLowerCase() === userAddress.toLowerCase(),
    );
    if (alreadyClaimed)
      return res.status(200).json({ claimable: 0, message: "Already claimed" });
    res
      .status(200)
      .json({ claimable: winner.amount, message: "Reward available to claim" });
  } catch (err) {
    console.error("Failed to get claimable amount:", err);
    res.status(500).json({ error: "Failed to get claimable amount" });
  }
});

// POST /task/:id/claim
router.post("/task/:id/claim", async (req, res) => {
  const id = req.params.id;
  const { winnerAddress, txHash } = req.body;
  if (!ObjectId.isValid(id))
    return res.status(400).json({ error: "Invalid bounty ID" });
  if (!winnerAddress)
    return res.status(400).json({ error: "Winner address is required" });
  try {
    const db = getDb();
    const bounty = await db
      .collection("bounty")
      .findOne({ _id: new ObjectId(id) });
    if (!bounty) return res.status(404).json({ error: "Bounty not found" });
    if (!bounty.winners?.assigned || bounty.winners.assigned.length === 0) {
      return res.status(400).json({ error: "Rewards not yet distributed" });
    }
    const winner = bounty.winners.assigned.find(
      (w) => w.address.toLowerCase() === winnerAddress.toLowerCase(),
    );
    if (!winner) return res.status(404).json({ error: "You are not a winner" });
    const alreadyClaimed = bounty.winners.claimed?.some(
      (c) => c.address.toLowerCase() === winnerAddress.toLowerCase(),
    );
    if (alreadyClaimed)
      return res.status(400).json({ error: "Reward already claimed" });

    await db.collection("bounty").updateOne(
      { _id: new ObjectId(id) },
      {
        $push: {
          "winners.claimed": {
            address: winnerAddress,
            amount: winner.amount,
            claimedAt: new Date().toISOString(),
            txHash: txHash,
          },
        },
        $set: { updatedAt: new Date().toISOString() },
      },
    );
    await db.collection("users").updateOne(
      { walletAddress: winnerAddress },
      {
        $push: {
          claimedRewards: {
            bountyId: id,
            bountyTitle: bounty.title,
            amount: winner.amount,
            claimedAt: new Date().toISOString(),
          },
        },
      },
      { upsert: true },
    );
    res.status(200).json({
      message: "Reward claimed successfully",
      amount: winner.amount,
      claimedAt: new Date().toISOString(),
    });
  } catch (err) {
    console.error("Failed to claim reward:", err);
    res.status(500).json({ error: "Failed to claim reward" });
  }
});

// GET /task/:id/has-claimed/:userAddress
router.get("/task/:id/has-claimed/:userAddress", async (req, res) => {
  const id = req.params.id;
  const userAddress = req.params.userAddress;
  if (!ObjectId.isValid(id))
    return res.status(400).json({ error: "Invalid bounty ID" });
  if (!userAddress || !userAddress.startsWith("0x")) {
    return res.status(400).json({ error: "Invalid user address" });
  }
  try {
    const db = getDb();
    const bounty = await db
      .collection("bounty")
      .findOne({ _id: new ObjectId(id) });
    if (!bounty) return res.status(404).json({ error: "Bounty not found" });
    const hasClaimed =
      bounty.winners?.claimed?.some(
        (c) => c.address.toLowerCase() === userAddress.toLowerCase(),
      ) || false;
    res.status(200).json({ hasClaimed });
  } catch (err) {
    console.error("Failed to check claim status:", err);
    res.status(500).json({ error: "Failed to check claim status" });
  }
});

module.exports = router;
