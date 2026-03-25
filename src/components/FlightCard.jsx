import "./FlightCard.css";

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

const FlightCard = ({ flight, direction }) => {
  const stopsLabel =
    flight.stops === 0 ? "Direct" : flight.via || `${flight.stops} Stop`;

  return (
    <article className="flight-card">
      <div className="flight-grid-row">
        <div className="airline-block">
          <div className="airline-logo">{flight.airline.slice(0, 1)}</div>
          <div>
            <h3 className="flight-airline">{flight.airline}</h3>
            <p className="flight-number">
              {flight.flightNumber || `${direction} Flight`}
            </p>
          </div>
        </div>

        <div className="time-col">
          <div className="time-value">{flight.departureTime}</div>
          <div className="time-code">{getCode(flight.from)}</div>
        </div>

        <div className="duration-col">
          <div className="duration-pill">{flight.duration}</div>
          <div className="duration-line" />
          <div className="duration-via">{stopsLabel}</div>
        </div>

        <div className="time-col arrival">
          <div className="time-value">{flight.arrivalTime}</div>
          <div className="time-code">{getCode(flight.to)}</div>
        </div>
      </div>

      <div className="fare-row">
        {(
          flight.fareOptions || [
            { price: flight.price, tag: "Publish", selected: true },
          ]
        ).map((fareOption, index) => (
          <label className="fare-option" key={`${flight.id}-fare-${index}`}>
            <input type="checkbox" checked={fareOption.selected} readOnly />
            <span className="fare-amount">
              INR {fareOption.price.toLocaleString()}
            </span>
            <span className="fare-tag">{fareOption.tag}</span>
          </label>
        ))}
      </div>

      <div className="service-row">
        <span>Hand Baggage - {flight.handBaggage || "7 Kg"}</span>
        <span>Check-In Baggage - {flight.checkInBaggage || "15 Kg"}</span>
        <span>{flight.refundable ? "Refundable" : "Non-refundable"}</span>
        <span>Rules</span>
      </div>
    </article>
  );
};

export default FlightCard;
