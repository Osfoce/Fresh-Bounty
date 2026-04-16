// handles distribute, claim, winners, claimable, has‑claimed
// routes/rewardRoutes.js
const express = require("express");
const { ObjectId } = require("mongodb");
const { getDb } = require("../config/db");

const router = express.Router();

// POST /task/:id/distribute
router.post("/task/:id/distribute", async (req, res) => {
  const id = req.params.id;
  const { winners, payoutType, percentages, txHash } = req.body;
  if (!ObjectId.isValid(id))
    return res.status(400).json({ error: "Invalid bounty ID" });
  if (!winners || !Array.isArray(winners) || winners.length === 0) {
    return res.status(400).json({ error: "Winners array is required" });
  }
  try {
    const db = getDb();
    const bounty = await db
      .collection("bounty")
      .findOne({ _id: new ObjectId(id) });
    if (!bounty) return res.status(404).json({ error: "Bounty not found" });
    if (bounty.winners?.assigned && bounty.winners.assigned.length > 0) {
      return res.status(400).json({ error: "Rewards already distributed" });
    }

    const rewardAmount = bounty.reward;
    let winnerDetails = [];

    if (winners.length === 1) {
      winnerDetails.push({
        address: winners[0],
        amount: rewardAmount,
        percentage: 100,
      });
    } else if (payoutType === "equal") {
      const share = rewardAmount / winners.length;
      winners.forEach((winner) => {
        winnerDetails.push({
          address: winner,
          amount: share,
          percentage: 100 / winners.length,
        });
      });
    } else if (payoutType === "percentage" && percentages) {
      if (percentages.length !== winners.length) {
        return res
          .status(400)
          .json({ error: "Percentages length must match winners length" });
      }
      let total = 0;
      for (let i = 0; i < winners.length; i++) {
        total += percentages[i];
        winnerDetails.push({
          address: winners[i],
          amount: (rewardAmount * percentages[i]) / 100,
          percentage: percentages[i],
        });
      }
      if (total !== 100)
        return res.status(400).json({ error: "Percentages must sum to 100" });
    } else {
      return res.status(400).json({ error: "Invalid payout configuration" });
    }

    const updateData = {
      winners: {
        assigned: winnerDetails,
        claimed: [],
        assignedAt: new Date().toISOString(),
        distributionTxHash: txHash || null,
        payoutType: payoutType,
      },
      rewardsAssignedOnChain: true,
      updatedAt: new Date().toISOString(),
    };
    await db
      .collection("bounty")
      .updateOne({ _id: new ObjectId(id) }, { $set: updateData });

    // Update user stats for each winner
    for (const winner of winnerDetails) {
      await db.collection("users").updateOne(
        { walletAddress: winner.address },
        {
          $inc: { totalEarnings: winner.amount },
          $set: { lastUpdated: new Date().toISOString() },
          $push: {
            earnedFrom: {
              bountyId: id,
              bountyTitle: bounty.title,
              amount: winner.amount,
              percentage: winner.percentage,
              earnedAt: new Date().toISOString(),
            },
          },
        },
        { upsert: true },
      );
    }
    res.status(200).json({
      message: "Rewards distributed successfully",
      winners: winnerDetails,
      distributionTxHash: txHash,
    });
  } catch (err) {
    console.error("Failed to distribute rewards:", err);
    res.status(500).json({ error: "Failed to distribute rewards" });
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
