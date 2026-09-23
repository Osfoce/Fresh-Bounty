const express = require("express");
const { submit, getUserSubmission } = require("../controller/submission.controller");
const { upload } = require('../middleware/upload'); // Path to your multer setup
const router = express.Router();



// create routes
router.route("/bounty/submit").post(upload.single('image'), submit);
router.route("/bounty/submissions/:wallet").get(getUserSubmission);

module.exports = router;