const express = require("express");
const {
  createBounty,
  getBounty,
  getBounties,
  updateBounty,
  deleteBounty,
} = require("../controller/bounty.controller");

const router = express.Router();

// create routes
router.route("/create").post(createBounty);
router.route("/bounty/:id").get(getBounty);
router.route("/bounties").get(getBounties);
router.route("/update/:id").patch(updateBounty);
router.route("/delete/:id").delete(deleteBounty)

module.exports = router;
