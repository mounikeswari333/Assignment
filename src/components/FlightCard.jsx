import "./FlightCard.css";
import { FiBriefcase, FiInfo, FiShoppingBag } from "react-icons/fi";

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

const airlineLogos = {
  "Air India":
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwy-zEp6nsnbnA9ypdUN6ieyBVc9yQsg9euQ&s",
  "Star Air":
    "https://media.licdn.com/dms/image/v2/D560BAQEUM3byn6W-Ag/company-logo_200_200/company-logo_200_200/0/1711456284066?e=2147483647&v=beta&t=fD-XxHsoRsPZ8wRDdoqoRq9siTo20x9P_lSIwYC7qZY",
  IndiGo:
    "https://i.pinimg.com/736x/2d/06/2c/2d062c935dde7754fa80bf011a9dbdc7.jpg",
  "Air India Express":
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5k6b_6aYg6rc2ikLX_76gijGx5HQO1_nf0g&s",
  Vistara: "https://download.logo.wine/logo/Vistara/Vistara-Logo.wine.png",
  "Qatar Airways":
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-2gy3RQl6-FOuZOIn-HbnX5bSRRwWxlONFQ&s",
};

const FlightCard = ({ flight, direction, isSelected, onSelect }) => {
  const stopsLabel =
    flight.stops === 0 ? "Direct" : flight.via || `${flight.stops} Stop`;
  const logoUrl = airlineLogos[flight.airline];

  return (
    <article
      className={`flight-card ${isSelected ? "selected" : ""}`}
      role="button"
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onSelect();
        }
      }}
    >
      <div className="flight-grid-row">
        <div className="airline-block">
          <div className="airline-logo">
            {logoUrl ? (
              <img
                src={logoUrl}
                alt={`${flight.airline} logo`}
                className="airline-logo-img"
              />
            ) : (
              flight.airline.slice(0, 1)
            )}
          </div>
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
        <span className="service-item">
          <FiShoppingBag /> Hand Baggage - {flight.handBaggage || "7 Kg"}
        </span>
        <span className="service-item">
          <FiBriefcase /> Check-In Baggage - {flight.checkInBaggage || "15 Kg"}
        </span>
        <span className="service-item">
          <FiInfo /> {flight.refundable ? "Refundable" : "Non-refundable"}
        </span>
        <span className="service-item">
          <FiInfo /> Rules
        </span>
      </div>
    </article>
  );
};

export default FlightCard;
