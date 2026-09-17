const mongoose = require("mongoose");
// Schema for individual claimed rewards
const claimedRewardSchema = new mongoose.Schema(
  {
    bountyId: {
      type: String,
      required: true,
      trim: true,
    },
    bountyTitle: {
      type: String,
      required: true,
      trim: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    claimedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false },
); // No separate _id for subdocuments


module.exports = claimedRewardSchema;
