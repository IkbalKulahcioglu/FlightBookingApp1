const express = require("express");
// const db = require("../config/db"); // Your MongoDB configuration
const router = express.Router();

// Save flight reservation to MongoDB
router.post("/reservations", async (req, res) => {
  try {
    const flight = req.body; // Get the flight data from the request body
    const savedFlight = await db.collection("reservations").insertOne(flight); // Save flight to MongoDB
    res.status(201).json(savedFlight); // Return saved flight data
  } catch (error) {
    console.error("Error saving reservation:", error);
    res.status(500).send("Could not save reservation.");
  }
});

module.exports = router;
