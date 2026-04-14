require("dotenv").config();
const express = require("express");
const { ObjectId } = require("mongodb");
const { connectToDb, getDb } = require("./config/db");
const cors = require("cors");

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.json({ message: "API working" });
});

// Example: GET data
app.get("/bounty", async (req, res) => {
  try {
    const db = getDb();
    const users = await db.collection("bounty").find().toArray();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// Start server AFTER DB connects
connectToDb((err) => {
  if (!err) {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  }
});
