import axios from "axios";

const API_BASE_URL = "/api/public-flights";
const APP_ID = "41fea23e";
const APP_KEY = "5b4e7c5a918002f3244a0c793ac4be75";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: "application/json",
    app_id: APP_ID,
    app_key: APP_KEY,
    ResourceVersion: "v4",
  },
});

export const getFlights = async (params) => {
    try {
      const response = await api.get('/flights', { params });
      return response.data;
  
    } catch (error) {
      console.error("Error fetching flights:", error);
      throw error;
    }
  };
  

export const filterFlights = async (date, direction) => {
  const params = {
    scheduleDate: date,
    flightDirection: direction,
  };
  return getFlights(params);
};
