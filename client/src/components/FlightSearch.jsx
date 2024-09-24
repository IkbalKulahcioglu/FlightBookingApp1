import { IoAirplane } from "react-icons/io5";
import { BiSolidPlaneLand, BiSolidPlaneTakeOff } from "react-icons/bi";
import { BsCalendarEvent } from "react-icons/bs";
import React, { useState, useEffect } from "react";
import FlightList from "./FlightList";
import { getFlights, saveReservation } from "../services/api";

function FlightSearch() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departDate, setDepartDate] = useState("");
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle flight search
  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Flight search parameters
      const params = {
        scheduleDate: departDate,
        flightDirection: from ? "D" : "A", // 'A' for arrival, 'D' for departure
      };
      // Fetch flights from API
      const flightData = await getFlights(params);
      console.log(flightData);
      setFlights(flightData.flights || []);
    } catch (error) {
      setError("Flights could not be found. Please try again.");
      setFlights([]);
    } finally {
      setLoading(false);
    }
  };

  const handleReservation = async (flight) => {
    try {
      await saveReservation(flight); // Send flight data to MongoDB
      alert("Your flight has been reserved!"); // Notify user
    } catch (error) {
      console.error("Error saving reservation:", error);
      alert("Could not save reservation.");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow mb-6">
      <div className="relative">
        <IoAirplane className="absolute top-1" />
        <h2 className="text-lg font-semibold mb-4 ml-7">BOOK YOUR FLIGHT</h2>
      </div>
  
      <form onSubmit={handleSearch}>
        <div className="flex justify-between">
          <div className="flex">
            <div className="col-span-2 relative ">
              <BiSolidPlaneTakeOff className="absolute top-3 left-2 text-xl text-purple-800" />
              <input
                className="w-full pl-10 p-2 border rounded-l-full"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                required
              />
            </div>
            <div className="col-span-2 relative">
              <BiSolidPlaneLand className="absolute top-3 left-2 text-xl text-purple-800" />
              <input
                className="w-full pl-10 p-2 border rounded-r-full"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                // required
              />
            </div>
          </div>
          <div className="flex">
            <div className="relative">
              <BsCalendarEvent className="absolute top-3 left-2 text-xl text-purple-800" />
              <input
                className="w-full pl-10 p-2 border rounded-full"
                type="date"
                value={departDate}
                onChange={(e) => setDepartDate(e.target.value)}
                required
              />
            </div>
          </div>
        </div>
      
        <button
          type="submit"
          className="mt-4 bg-purple-800 text-white p-2 px-4 rounded"
        >
          {loading ? "Searching..." : "Show flights"}
        </button>
      </form>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {!loading && flights.length > 0 && <FlightList flights={flights} onReserve={handleReservation}/>}

      {loading && <p>Loading flights...</p>}

      {!loading && flights.length === 0 && !error && (
        <p>No flights found. Please try a different search.</p>
      )}
    </div>
  );
}

export default FlightSearch;
