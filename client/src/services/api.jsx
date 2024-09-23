import axios from "axios";

const API_BASE_URL = "http://localhost:5000"; // Adjust this if your backend runs on a different port

// Function to fetch flights from the backend
export const getFlights = async (params) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/flights`, { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching flights:", error);
    throw error;
  }
};

// Function to save flight reservations
export const saveReservation = async (flight) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/reservations`, flight);
    return response.data;
  } catch (error) {
    console.error("Error saving reservation:", error);
    throw error;
  }
};