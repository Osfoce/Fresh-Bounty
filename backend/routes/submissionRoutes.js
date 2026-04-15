// submission
// routes/submissionRoutes.js
const express = require("express");
const { ObjectId } = require("mongodb");
const { getDb } = require("../config/db");

const router = express.Router();

// POST /submission
router.post(
  "/submission",
  express.json({ limit: "50mb" }),
  async (req, res) => {
    const { bountyId, user, description, projectLink, image } = req.body;
    if (!bountyId || !user || !description || !projectLink) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    try {
      const db = getDb();
      const bounty = await db
        .collection("bounty")
        .findOne({ _id: new ObjectId(bountyId) });
      if (!bounty) return res.status(404).json({ error: "Bounty not found" });

      const existing = await db.collection("submissions").findOne({
        bountyId: new ObjectId(bountyId),
        user: user,
        isSubmitted: true,
      });
      if (existing)
        return res
          .status(400)
          .json({ error: "Already submitted to this bounty" });

      const submission = {
        bountyId: new ObjectId(bountyId),
        bountyTitle: bounty.title,
        user,
        description,
        projectLink,
        image: image || "",
        status: "pending",
        isSubmitted: true,
        submittedAt: new Date().toISOString(),
      };
      const result = await db.collection("submissions").insertOne(submission);

      await db.collection("bounty").updateOne(
        { _id: new ObjectId(bountyId) },
        {
          $inc: { "submissions.count": 1 },
          $push: { "submissions.ids": result.insertedId },
        },
      );
      res
        .status(201)
        .json({
          message: "Submission created successfully",
          _id: result.insertedId,
        });
    } catch (err) {
      console.error("Failed to create submission", err);
      res.status(500).json({ error: "Failed to create submission" });
    }
  },
);

// GET /submissions/user/:wallet
router.get("/submissions/user/:wallet", async (req, res) => {
  const wallet = req.params.wallet;
  try {
    const db = getDb();
    const submissions = await db
      .collection("submissions")
      .find({ user: wallet })
      .sort({ submittedAt: -1 })
      .toArray();
    const formatted = submissions.map((sub) => ({
      ...sub,
      _id: sub._id.toString(),
      bountyId: sub.bountyId.toString(),
    }));
    const stats = {
      pending: formatted.filter((s) => s.status === "pending").length,
      accepted: formatted.filter((s) => s.status === "accepted").length,
      rejected: formatted.filter((s) => s.status === "rejected").length,
    };
    res.status(200).json({ submissions: formatted, stats });
  } catch (err) {
    console.error("Failed to fetch submissions", err);
    res.status(500).json({ error: "Failed to fetch submissions" });
  }
});

module.exports = router;
