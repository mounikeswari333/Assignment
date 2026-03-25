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

const FlightList = ({ outboundFlights, returnFlights, passengers }) => {
  const outboundTotal = outboundFlights.reduce(
    (sum, flight) => sum + flight.price,
    0,
  );
  const returnTotal = returnFlights.reduce(
    (sum, flight) => sum + flight.price,
    0,
  );

  return (
    <section className="roundtrip-section">
      <div className="roundtrip-summary">
        <div className="summary-block">
          <div className="summary-label">Departure Total</div>
          <div className="summary-value">
            INR {outboundTotal.toLocaleString()}
          </div>
        </div>
        <div className="summary-block">
          <div className="summary-label">Return Total</div>
          <div className="summary-value">
            INR {returnTotal.toLocaleString()}
          </div>
        </div>
        <div className="summary-block total">
          <div className="summary-label">for {passengers.toLowerCase()}</div>
          <div className="summary-value">
            INR {(outboundTotal + returnTotal).toLocaleString()}
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
              <FlightCard key={flight.id} flight={flight} direction="Return" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FlightList;
