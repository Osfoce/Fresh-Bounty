// bounty Enrollment
// routes/enrollmentRoutes.js
const express = require("express");
const { ObjectId } = require("mongodb");
const { getDb } = require("../config/db");

const router = express.Router();

// POST /enroll
router.post("/enroll", async (req, res) => {
  const { bountyId, user } = req.body;
  if (!bountyId || !user) {
    return res.status(400).json({ error: "Missing bountyId or user" });
  }
  try {
    const db = getDb();
    const existing = await db.collection("enrollments").findOne({
      bountyId: new ObjectId(bountyId),
      user,
    });
    if (existing) return res.status(400).json({ error: "Already enrolled" });

    const enrollment = {
      bountyId: new ObjectId(bountyId),
      user,
      enrolledAt: new Date().toISOString(),
    };
    const result = await db.collection("enrollments").insertOne(enrollment);
    res
      .status(201)
      .json({ message: "Enrolled successfully", _id: result.insertedId });
  } catch (err) {
    console.error("Enrollment error:", err);
    res.status(500).json({ error: "Failed to enroll" });
  }
});

// GET /enrollments/user/:wallet
router.get("/enrollments/user/:wallet", async (req, res) => {
  const wallet = req.params.wallet;
  try {
    const db = getDb();
    const enrollments = await db
      .collection("enrollments")
      .find({ user: wallet })
      .toArray();
    const formatted = enrollments.map((e) => ({
      ...e,
      _id: e._id.toString(),
      bountyId: e.bountyId.toString(),
    }));
    res.status(200).json({ enrollments: formatted });
  } catch (err) {
    console.error("Error fetching enrollments:", err);
    res.status(500).json({ error: "Failed to fetch enrollments" });
  }
});

module.exports = router;
