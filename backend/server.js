// server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectToDb } = require("./config/db");
const startStatusUpdateJob = require("./jobs/updateStatusJob");

// Import routes
const bountyRoutes = require("./routes/bountyRoutes");
const userRoutes = require("./routes/userRoutes");
const submissionRoutes = require("./routes/submissionRoutes");
const enrollmentRoutes = require("./routes/enrollmentRoutes");
const rewardRoutes = require("./routes/rewardRoutes");

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors()); // For production, restrict origins as needed
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Routes
app.use("/api", bountyRoutes);
app.use("/api", userRoutes);
app.use("/api", submissionRoutes);
app.use("/api", enrollmentRoutes);
app.use("/api", rewardRoutes);

// Test route
app.get("/", (req, res) => {
  res.json({ message: "API working" });
});

// Connect to DB and start server
connectToDb(async (err) => {
  if (err) {
    console.error("Database connection failed:", err);
    process.exit(1);
  }
  console.log("Connected to database");

  // Start the cron job (only after DB is ready)
  startStatusUpdateJob();

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});
