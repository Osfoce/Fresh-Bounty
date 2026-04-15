// Handles /user/:wallet, /dashboard/:wallet, /categories, /tags
// routes/userRoutes.js
const express = require("express");
const { getDb } = require("../config/db");
const { calculateBountyStatus } = require("../utils/bountyUtils");

const router = express.Router();

// GET /user/:wallet
router.get("/user/:wallet", async (req, res) => {
  const wallet = req.params.wallet;
  try {
    const db = getDb();
    let user = await db.collection("users").findOne({ walletAddress: wallet });
    if (!user) {
      const newUser = {
        walletAddress: wallet,
        reputationScore: 0,
        totalEarnings: "0",
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        stats: {
          tasksCreated: 0,
          tasksCompleted: 0,
          submissions: { pending: 0, accepted: 0, rejected: 0 },
        },
        earnedFrom: [],
        claimedRewards: [],
      };
      const result = await db.collection("users").insertOne(newUser);
      user = { ...newUser, _id: result.insertedId };
    } else {
      await db
        .collection("users")
        .updateOne(
          { walletAddress: wallet },
          { $set: { lastLogin: new Date().toISOString() } },
        );
    }
    const createdBounties = await db
      .collection("bounty")
      .find({ creator: wallet })
      .toArray();
    const submissions = await db
      .collection("submissions")
      .find({ user: wallet })
      .toArray();
    res.status(200).json({ user, createdBounties, submissions });
  } catch (err) {
    console.error("Failed to fetch user", err);
    res.status(500).json({ error: "Failed to fetch user" });
  }
});

// GET /dashboard/:wallet
router.get("/dashboard/:wallet", async (req, res) => {
  const wallet = req.params.wallet;
  try {
    const db = getDb();
    const user = await db
      .collection("users")
      .findOne({ walletAddress: wallet });
    const createdBounties = await db
      .collection("bounty")
      .find({ creator: wallet })
      .toArray();
    const submissions = await db
      .collection("submissions")
      .find({ user: wallet })
      .toArray();

    const bountyStats = {
      active: createdBounties.filter(
        (b) => calculateBountyStatus(b.startDate, b.deadline) === "active",
      ).length,
      completed: createdBounties.filter(
        (b) => calculateBountyStatus(b.startDate, b.deadline) === "completed",
      ).length,
      total: createdBounties.length,
    };
    const submissionStats = {
      pending: submissions.filter((s) => s.status === "pending").length,
      accepted: submissions.filter((s) => s.status === "accepted").length,
      rejected: submissions.filter((s) => s.status === "rejected").length,
      total: submissions.length,
    };
    let totalEarnings = 0;
    submissions
      .filter((s) => s.status === "accepted")
      .forEach((s) => {
        const bounty = createdBounties.find(
          (b) => b._id.toString() === s.bountyId.toString(),
        );
        if (bounty) totalEarnings += bounty.reward || 0;
      });

    res.status(200).json({
      user: {
        walletAddress: wallet,
        reputationScore: user?.reputationScore || 0,
        totalEarnings: totalEarnings.toString(),
      },
      bounties: bountyStats,
      submissions: submissionStats,
    });
  } catch (err) {
    console.error("Failed to fetch dashboard stats", err);
    res.status(500).json({ error: "Failed to fetch dashboard stats" });
  }
});

// GET /categories
router.get("/categories", async (req, res) => {
  try {
    const db = getDb();
    const categories = await db.collection("bounty").distinct("category");
    res.status(200).json(categories);
  } catch (err) {
    console.error("Failed to fetch categories", err);
    res.status(500).json({ error: "Failed to fetch categories" });
  }
});

// GET /tags
router.get("/tags", async (req, res) => {
  try {
    const db = getDb();
    const tags = await db.collection("bounty").distinct("tags");
    const allTags = [...new Set(tags.flat())];
    res.status(200).json(allTags);
  } catch (err) {
    console.error("Failed to fetch tags", err);
    res.status(500).json({ error: "Failed to fetch tags" });
  }
});

module.exports = router;
