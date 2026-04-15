// utils/bountyUtils.js
const { getDb } = require("../config/db");

function calculateBountyStatus(startDate, deadline) {
  const now = new Date();
  const start = new Date(startDate);
  const end = new Date(deadline);

  if (now < start) return "upcoming";
  if (now >= start && now <= end) return "active";
  return "completed";
}

async function updateBountyStatuses() {
  try {
    const db = getDb();
    const bounties = await db.collection("bounty").find({}).toArray();
    let updatedCount = 0;

    for (const bounty of bounties) {
      const newStatus = calculateBountyStatus(
        bounty.startDate,
        bounty.deadline,
      );
      if (bounty.status !== newStatus) {
        await db
          .collection("bounty")
          .updateOne({ _id: bounty._id }, { $set: { status: newStatus } });
        updatedCount++;
      }
    }
    console.log(
      `[Status Update] Updated ${updatedCount} bounties at ${new Date().toISOString()}`,
    );
  } catch (err) {
    console.error("Error updating bounty statuses:", err);
  }
}

module.exports = { calculateBountyStatus, updateBountyStatuses };
