import React from "react";
import FlightItem from "./FlightItem";

function FlightList({ flights, loading }) {
  if (loading) {
    return <div className="text-center">Loading flights...</div>;
  }

  if (flights.length === 0) {
    return <div className="text-center">No flights available.</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols- gap-4">
      {flights.map((flight) => (
        <FlightItem key={flight.id} flight={flight} />
      ))}
    </div>
  );
}

export default FlightList;
