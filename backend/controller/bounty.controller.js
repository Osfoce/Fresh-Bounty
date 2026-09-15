const Bounty = require("../modules/bounty.module");
const buildBountyFilter = require("../utils/buildBountyFilter");
const paginate = require("../utils/paginate");
const buildSortQuery = require("../utils/buildSortQuery");

const createBounty = async (req, res) => {
  try {
    let {
      title,
      description,
      category,
      tags,
      creator,
      startDate,
      deadline,
      originLink,
      network,
      reward,
      token,
      winnersAllowed,
      payoutType,
      percentages,
    } = req.body;

    if (!title) return res.status(400).json({ message: "Title is required" });

    tags = (tags || []).map((tag) => tag.trim().toLowerCase());
    tags = [...new Set(tags)];

    startDate = new Date(startDate);
    deadline = new Date(deadline);
    reward = Number(reward);

    if (isNaN(startDate.getTime()) || isNaN(deadline.getTime())) {
      return res.status(400).json({ message: "Invalid dates" });
    }

    const bounty = await Bounty.create({
      title,
      description,
      category,
      tags,
      creator,
      startDate,
      deadline,
      originLink,
      network,
      reward,
      token,
      winnersAllowed,
      payoutType,
      percentages,
    });

    res.status(201).json({
      message: "Bountycreated sucessfully",
      bounty: {
        _id: bounty.id,
        title: bounty.title,
        creator: bounty.creator,
      },
    });
  } catch (error) {
    console.error("Failed to create Bounty:", error, "path:", error.name);
    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: "Validation failed",
        errors: Object.values(error.errors).map((e) => ({
          field: e.path,
          message: e.message,
        })),
      });
    }

    // Mongoose cast error (e.g. bad ObjectId) → 400
    if (error.name === "CastError") {
      return res.status(400).json({
        message: `Invalid value for ${error.path}`,
        value: error.value,
      });
    }

    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// get single bounty
const getBounty = async (req, res) => {
  try {
    const bounty = await Bounty.findOne(req.params.id);
    if (!bounty) return res.status(400).json({ message: "Invalid Id" });

    bounty.status = bounty.currentStatus;

    res.status(200).json({
      message: "Sucess",
      bounty: { title: bounty.title, creator: bounty.creator },
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server errr", error });
  }
};

const getBounties = async (req, res) => {
  try {
    // Build MongoDB filter
    const filter = buildBountyFilter(req.query);

    // Build pagination
    const { page, limit, skip } = paginate(req.query);

    // Build sorting
    const sort = buildSortQuery(req.query);

    const total = await Bounty.countDocuments(filter);

    const bounties = await Bounty.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      bounties,

      pagination: {
        page,
        limit,
        total,

        pages: Math.ceil(total / limit),

        hasNext: page * limit < total,

        hasPrev: page > 1,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch bounties",
      error: error.message,
    });
  }
};

const updateBounty = async (req, res) => {
  try {
    const { id } = req.params;

    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        message: "Request body is empty",
      });
    }

    const updates = {};

    const allowedFields = ["title", "description", "originLink"];

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    }

    const bounty = await Bounty.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!bounty) {
      return res.status(404).json({
        message: "Bounty not found",
      });
    }

    res.status(200).json({
      message: "Bounty updated successfully",
      bounty,
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).json({
        message: err.message,
      });
    }

    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const deleteBounty = async (req, res) => {
  bounty = await Bounty.findByIdAndDelete(req.params.id);
  if (!bounty) return res.status(404).json({ message: "Bounty not found" });

  res.status(200).json({ message: "Deleted sucessfully" });
};

module.exports = {
  createBounty,
  getBounty,
  getBounties,
  updateBounty,
  deleteBounty,
};
