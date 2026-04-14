require("dotenv").config();
const { MongoClient } = require("mongodb");

let dbConnection;

const uri = process.env.MONGODB_URI;

const connectToDb = async (callback) => {
  try {
    const client = await MongoClient.connect(uri);
    dbConnection = client.db("Happy-Bounty"); // you can pass db name if needed
    console.log("Connected to MongoDB");
    callback();
  } catch (err) {
    console.error("Failed to connect to database", err);
    callback(err);
  }
};

const getDb = () => {
  if (!dbConnection) {
    throw new Error("Database not initialized");
  }
  return dbConnection;
};

module.exports = { connectToDb, getDb };
