const express = require("express");
const cors = require("cors");
const { getFlights } = require("./utils/flightAPI"); // Import the API logic

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/flights", async (req, res) => {
  try {
    const flights = await getFlights(); // Call the API function
    res.json(JSON.parse(flights)); // Send the flights data as JSON
  } catch (error) {
    console.error("Error fetching flights:", error);
    res.status(500).send("Error fetching flights");
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
