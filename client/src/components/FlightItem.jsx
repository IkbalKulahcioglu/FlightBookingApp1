import React from "react";

function FlightItem({ flight }) {
  console.log(flight);
  return (
    <div className="border rounded-lg p-4 shadow-md">
      <h3 className="text-lg font-semibold">
        {flight.flightName || flight.name}
      </h3>
      <p>Flight Number: {flight.flightNumber || flight.number}</p>
      <p>Departure: {flight.scheduleTime || flight.departureTime}</p>
      <p>Destination: {flight.route.destinations[0] || flight.destination}</p>
      <div class="flex justify-end">
        <button
          className="mt-2 bg-purple-800 text-white p-2 px-4 rounded  hover:bg-grey-600"
          onClick={() => {
            /* Implement reservation logic */
          }}
        >
          Reserve
        </button>
      </div>
    </div>
  );
}

export default FlightItem;
