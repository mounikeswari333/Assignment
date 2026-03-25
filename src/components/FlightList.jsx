import { useEffect, useMemo, useState } from "react";
import FlightCard from "./FlightCard";
import "./FlightList.css";

const cityCodeMap = {
  Hyderabad: "HYD",
  Goa: "GOI",
  Delhi: "DEL",
  Kolkata: "CCU",
  Mumbai: "BOM",
  Chennai: "MAA",
  Bengaluru: "BLR",
};

const getCode = (cityName) =>
  cityCodeMap[cityName] || cityName.slice(0, 3).toUpperCase();

const getPassengerSummary = (passengers) => {
  if (typeof passengers === "string") {
    return passengers.toLowerCase();
  }

  const adults = passengers?.adults || 0;
  const children = passengers?.children || 0;
  const infants = passengers?.infants || 0;

  return `${adults} adult${adults === 1 ? "" : "s"}, ${children} child${children === 1 ? "" : "ren"}, ${infants} infant${infants === 1 ? "" : "s"}`;
};

const FlightList = ({ outboundFlights, returnFlights, passengers }) => {
  const passengerSummary = getPassengerSummary(passengers);
  const [selectedOutboundId, setSelectedOutboundId] = useState(null);
  const [selectedReturnId, setSelectedReturnId] = useState(null);

  useEffect(() => {
    if (outboundFlights.length === 0) {
      setSelectedOutboundId(null);
      return;
    }

    const hasSelectedOutbound = outboundFlights.some(
      (flight) => flight.id === selectedOutboundId,
    );

    if (!hasSelectedOutbound) {
      setSelectedOutboundId(outboundFlights[0].id);
    }
  }, [outboundFlights, selectedOutboundId]);

  useEffect(() => {
    if (returnFlights.length === 0) {
      setSelectedReturnId(null);
      return;
    }

    const hasSelectedReturn = returnFlights.some(
      (flight) => flight.id === selectedReturnId,
    );

    if (!hasSelectedReturn) {
      setSelectedReturnId(returnFlights[0].id);
    }
  }, [returnFlights, selectedReturnId]);

  const selectedOutboundFlight = useMemo(
    () =>
      outboundFlights.find((flight) => flight.id === selectedOutboundId) ||
      outboundFlights[0],
    [outboundFlights, selectedOutboundId],
  );

  const selectedReturnFlight = useMemo(
    () =>
      returnFlights.find((flight) => flight.id === selectedReturnId) ||
      returnFlights[0],
    [returnFlights, selectedReturnId],
  );

  const outboundFare = selectedOutboundFlight?.price || 0;
  const returnFare = selectedReturnFlight?.price || 0;

  return (
    <section className="roundtrip-section">
      <div className="roundtrip-summary">
        <div className="summary-block">
          <div className="summary-label">Departure Total</div>
          <div className="summary-value">
            INR {outboundFare.toLocaleString()}
          </div>
        </div>
        <div className="summary-block">
          <div className="summary-label">Return Total</div>
          <div className="summary-value">INR {returnFare.toLocaleString()}</div>
        </div>
        <div className="summary-block total">
          <div className="summary-label">for {passengerSummary}</div>
          <div className="summary-value">
            INR {(outboundFare + returnFare).toLocaleString()}
          </div>
        </div>
      </div>

      <div className="flight-columns">
        <div className="flight-column">
          <div className="column-title">
            Outbound: {outboundFlights[0]?.from} (
            {getCode(outboundFlights[0]?.from || "")})
          </div>
          <div className="column-head-row">
            <span>Airline</span>
            <span>Departure</span>
            <span>Duration</span>
            <span>Arrival</span>
          </div>
          <div className="flight-list">
            {outboundFlights.map((flight) => (
              <FlightCard
                key={flight.id}
                flight={flight}
                direction="Departure"
                isSelected={flight.id === selectedOutboundId}
                onSelect={() => setSelectedOutboundId(flight.id)}
              />
            ))}
          </div>
        </div>

        <div className="flight-column">
          <div className="column-title">
            Return: {returnFlights[0]?.from} (
            {getCode(returnFlights[0]?.from || "")})
          </div>
          <div className="column-head-row">
            <span>Airline</span>
            <span>Departure</span>
            <span>Duration</span>
            <span>Arrival</span>
          </div>
          <div className="flight-list">
            {returnFlights.map((flight) => (
              <FlightCard
                key={flight.id}
                flight={flight}
                direction="Return"
                isSelected={flight.id === selectedReturnId}
                onSelect={() => setSelectedReturnId(flight.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FlightList;
