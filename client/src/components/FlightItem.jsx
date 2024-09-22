import React from 'react';

function FlightItem({ flight }) {
  return (
    <div className="border rounded-lg p-4 shadow-md">
      <h3 className="text-lg font-semibold">{flight.flightName || flight.name}</h3>
      <p>Flight Number: {flight.flightNumber || flight.number}</p>
      <p>Departure: {flight.scheduleTime || flight.departureTime}</p>
      <p>Destination: {flight.route.destinations[0] || flight.destination}</p>
      <button
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={() => {/* Implement reservation logic */}}
      >
        Reserve
      </button>
    </div>
  );
}

export default FlightItem;
