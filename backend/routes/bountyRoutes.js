// All bounties
// routes/bountyRoutes.js
const express = require("express");
const { ObjectId } = require("mongodb");
const { getDb } = require("../config/db");
const { calculateBountyStatus } = require("../utils/bountyUtils");

const router = express.Router();

// GET /task - with filtering & pagination
router.get("/task", async (req, res) => {
  try {
    const db = getDb();
    const { status, category, tags, page = 0, limit = 6 } = req.query;

    let filter = {};
    if (category) filter.category = category;
    if (tags) {
      const tagArray = tags.split(",").map((t) => t.trim());
      filter.tags = { $in: tagArray };
    }

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = pageNum * limitNum;
    const now = new Date();

    // Build status filter based on real dates
    let statusFilter = {};
    if (status && status !== "all") {
      if (status === "active") {
        statusFilter = {
          startDate: { $lte: now.toISOString() },
          deadline: { $gte: now.toISOString() },
        };
      } else if (status === "upcoming") {
        statusFilter = { startDate: { $gt: now.toISOString() } };
      } else if (status === "completed") {
        statusFilter = { deadline: { $lt: now.toISOString() } };
      }
    }

    const finalFilter = { ...filter, ...statusFilter };
    const totalCount = await db
      .collection("bounty")
      .countDocuments(finalFilter);
    const bounties = await db
      .collection("bounty")
      .find(finalFilter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum)
      .toArray();

    // Add real-time status and update DB if stale
    const bountiesWithStatus = bounties.map((bounty) => {
      const currentStatus = calculateBountyStatus(
        bounty.startDate,
        bounty.deadline,
      );
      if (bounty.status !== currentStatus) {
        db.collection("bounty")
          .updateOne({ _id: bounty._id }, { $set: { status: currentStatus } })
          .catch((err) => console.error("Status update error:", err));
      }
      return { ...bounty, status: currentStatus };
    });

    res.status(200).json({
      bounties: bountiesWithStatus,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total: totalCount,
        pages: Math.ceil(totalCount / limitNum),
        hasNext: (pageNum + 1) * limitNum < totalCount,
        hasPrev: pageNum > 0,
      },
    });
  } catch (err) {
    console.error("Error fetching bounties:", err);
    res.status(500).json({ error: "Failed to fetch bounties" });
  }
});

// POST /task - create new bounty
router.post("/task", async (req, res) => {
  const newBounty = req.body;
  if (!newBounty.title) {
    return res.status(400).json({ error: "Title is required" });
  }

  try {
    const db = getDb();
    newBounty.status = calculateBountyStatus(
      newBounty.startDate,
      newBounty.deadline,
    );
    newBounty.createdAt = new Date().toISOString();
    newBounty.submissions = newBounty.submissions || {
      count: 0,
      maxSubmissions: 100,
      ids: [],
    };
    newBounty.winners = newBounty.winners || { assigned: [], claimed: [] };

    const result = await db.collection("bounty").insertOne(newBounty);
    res.status(201).json({
      message: "Bounty created successfully",
      _id: result.insertedId,
      bounty: newBounty,
    });
  } catch (err) {
    console.error("Insert error:", err);
    res.status(500).json({ error: "Could not create a new bounty" });
  }
});

// GET /task/:id - single bounty
router.get("/task/:id", async (req, res) => {
  const id = req.params.id;
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid bounty ID" });
  }
  try {
    const db = getDb();
    const bounty = await db
      .collection("bounty")
      .findOne({ _id: new ObjectId(id) });
    if (!bounty) return res.status(404).json({ error: "Bounty not found" });

    bounty._id = bounty._id.toString();
    bounty.status = calculateBountyStatus(bounty.startDate, bounty.deadline);
    res.status(200).json(bounty);
  } catch (err) {
    console.error("Failed to fetch bounty", err);
    res.status(500).json({ error: "Failed to fetch bounty" });
  }
});

// PATCH /task/:id - update bounty
router.patch("/task/:id", async (req, res) => {
  const id = req.params.id;
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid bounty ID" });
  }
  try {
    const db = getDb();
    const updates = req.body;
    if (updates.startDate || updates.deadline) {
      const bounty = await db
        .collection("bounty")
        .findOne({ _id: new ObjectId(id) });
      const startDate = updates.startDate || bounty.startDate;
      const deadline = updates.deadline || bounty.deadline;
      updates.status = calculateBountyStatus(startDate, deadline);
    }
    updates.updatedAt = new Date().toISOString();

    const result = await db
      .collection("bounty")
      .updateOne({ _id: new ObjectId(id) }, { $set: updates });
    if (result.matchedCount === 0)
      return res.status(404).json({ error: "Bounty not found" });
    res.status(200).json({
      message: "Bounty updated successfully",
      modified: result.modifiedCount > 0,
    });
  } catch (err) {
    console.error("Failed to update bounty", err);
    res.status(500).json({ error: "Failed to update bounty" });
  }
});

// DELETE /task/:id
router.delete("/task/:id", async (req, res) => {
  const id = req.params.id;
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid bounty ID" });
  }
  try {
    const db = getDb();
    const result = await db
      .collection("bounty")
      .deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0)
      return res.status(404).json({ error: "Bounty not found" });
    res.status(200).json({ message: "Bounty deleted successfully" });
  } catch (err) {
    console.error("Failed to delete bounty", err);
    res.status(500).json({ error: "Failed to delete bounty" });
  }
});

module.exports = router;
