const express = require('express');
const router = express.Router();
const flightAPI = require('../utils/FlightAPI');
const getFlights = flightAPI.getFlights;


router.get('/flights', async (req, res) => {
  try {
    const flightData = await getFlights(req.query);
    res.json(flightData);
  } catch (error) {
    console.error('Error in flight route:', error);
    res.status(500).json({ error: 'An error occurred while fetching flights', details: error.message });
  }
});

module.exports = router;