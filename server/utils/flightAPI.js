const axios = require('axios');

const API_BASE_URL = "https://api.schiphol.nl/public-flights";
const APP_ID = "41fea23e";
const APP_KEY = "5b4e7c5a918002f3244a0c793ac4be75";

const schipholAPI = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: "application/json",
    resourceversion: "v4",
    app_id: APP_ID,
    app_key: APP_KEY
  }
});

const getFlights = async (params) => {
  try {
    const response = await schipholAPI.get('/flights', {
      params: {
        ...params,
        includedelays: false,
        page: 0,
        sort: "+scheduleTime"
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching flights:', error.response ? error.response.data : error.message);
    throw error;
  }
};

module.exports = { getFlights };