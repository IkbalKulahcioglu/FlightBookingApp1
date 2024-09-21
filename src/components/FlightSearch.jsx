import { IoAirplane } from "react-icons/io5";
import { BiSolidPlaneLand, BiSolidPlaneTakeOff } from "react-icons/bi";
import { BsCalendarEvent } from "react-icons/bs";
import React, { useState } from "react";
import {getFlights} from "../services/api";
import axios from "axios";

function FlightSearch() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departDate, setDepartDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [tripType, setTripType] = useState("round");
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        "https://api.schiphol.nl/public-flights/flights?includedelays=false&page=0&sort=%2BscheduleTime",
        {
          params: {
            from,
            to,
            departDate,
            returnDate: tripType === "round" ? returnDate : null,
            tripType,
          },
        }
      );
      const data = await getFlights(params);
      setFlights(data.flights);
    } catch (err) {
      setError("An error occurred while fetching flights. Please try again.");
      console.error("Error fetching flights:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow mb-6">
      <div className="flex justify-between">
        <div className="relative">
          <IoAirplane className="absolute top-1" />
          <h2 className="text-lg font-semibold mb-4 ml-7">BOOK YOUR FLIGHT</h2>
        </div>
        <div className="flex mb-4">
          <button
            className={`px-6 py-2 rounded-l-full ${
              tripType === "round" ? "bg-purple-800 text-white" : "bg-gray-200"
            }`}
            onClick={() => setTripType("round")}
          >
            Round trip
          </button>
          <button
            className={`px-6 py-2 rounded-r-full ${
              tripType === "one" ? "bg-purple-800 text-white" : "bg-gray-200"
            }`}
            onClick={() => setTripType("one")}
          >
            One way
          </button>
        </div>
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
                required
              />
            </div>
          </div>
          <div className="flex">
            <div className="relative">
              <BsCalendarEvent className="absolute top-3 left-2 text-xl text-purple-800"/>
              <input
                className={`w-full pl-10 p-2 border  ${tripType === "round" ? "rounded-l-full" : "rounded-full"} `}
                type="date"
                value={departDate}
                onChange={(e) => setDepartDate(e.target.value)}
                required
              />
            </div>
            {tripType === "round" && (
              <div className="relative">
                <BsCalendarEvent className="absolute top-3 left-2 text-xl text-purple-800" />
                <input
                  className={`w-full pl-10 p-2 border rounded-r-full ${ 
                    departDate === "" ? "text-transparent" : "text-black"
                  }`}
                  type="date"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  required
                  
                />
              </div>
            )}
          </div>
        </div>
        <div className={tripType === "round" ? "col-span-2" : "col-span-3"}>
          <button
            type="submit"
            className="mt-4 bg-purple-800 text-white p-2 px-4 rounded"
          >
            {loading ? "Searching..." : "Show flights"}
          </button>
        </div>
      </form>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {flights.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Available Flights</h3>
          <ul>
            {flights.map((flight) => (
              <li key={flight.id} className="mb-4 p-4 border rounded">
                <p>
                  From: {flight.from} - To: {flight.to}
                </p>
                <p>Departure: {flight.departureTime}</p>
                <p>Arrival: {flight.arrivalTime}</p>
                <p>Price: ${flight.price}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default FlightSearch;
