import "./SearchForm.css";
import { FiRefreshCw } from "react-icons/fi";
import { useEffect, useRef, useState } from "react";

const SearchForm = ({
  searchData,
  onInputChange,
  onSearch,
  onSwap,
  onPassengerChange,
}) => {
  const [isPassengerOpen, setIsPassengerOpen] = useState(false);
  const passengerRef = useRef(null);

  const { adults = 0, children = 0, infants = 0 } = searchData.passengers || {};

  const passengerText = [
    `${adults} Adult${adults === 1 ? "" : "s"}`,
    `${children} Child${children === 1 ? "" : "ren"}`,
    `${infants} Infant${infants === 1 ? "" : "s"}`,
  ].join(", ");

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        passengerRef.current &&
        !passengerRef.current.contains(event.target)
      ) {
        setIsPassengerOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <form className="search-form" onSubmit={onSearch}>
      <input
        className="search-input"
        type="text"
        name="from"
        placeholder="From city"
        value={searchData.from}
        onChange={onInputChange}
      />

      <button
        className="swap-button"
        type="button"
        onClick={onSwap}
        aria-label="Swap from and to locations"
      >
        <FiRefreshCw />
      </button>

      <input
        className="search-input"
        type="text"
        name="to"
        placeholder="To city"
        value={searchData.to}
        onChange={onInputChange}
      />

      <div className="search-field">
        <label className="search-label" htmlFor="depart-date">
          Departure Date
        </label>
        <input
          id="depart-date"
          className="search-date"
          type="date"
          name="departDate"
          value={searchData.departDate}
          onChange={onInputChange}
        />
      </div>

      <div className="search-field">
        <label className="search-label" htmlFor="return-date">
          Return Date
        </label>
        <input
          id="return-date"
          className="search-date"
          type="date"
          name="returnDate"
          value={searchData.returnDate}
          onChange={onInputChange}
        />
      </div>

      <div className="passenger-picker" ref={passengerRef}>
        <button
          className="search-select passenger-trigger"
          type="button"
          onClick={() => setIsPassengerOpen((prev) => !prev)}
        >
          {passengerText}
        </button>

        {isPassengerOpen ? (
          <div className="passenger-panel">
            <div className="passenger-row">
              <div>
                <div className="passenger-type">Adults</div>
                <div className="passenger-age">Ages 13 or above</div>
              </div>
              <div className="passenger-actions">
                <button
                  type="button"
                  onClick={() => onPassengerChange("adults", -1)}
                >
                  -
                </button>
                <span>{adults}</span>
                <button
                  type="button"
                  onClick={() => onPassengerChange("adults", 1)}
                >
                  +
                </button>
              </div>
            </div>

            <div className="passenger-row">
              <div>
                <div className="passenger-type">Children</div>
                <div className="passenger-age">Ages 2-12</div>
              </div>
              <div className="passenger-actions">
                <button
                  type="button"
                  onClick={() => onPassengerChange("children", -1)}
                >
                  -
                </button>
                <span>{children}</span>
                <button
                  type="button"
                  onClick={() => onPassengerChange("children", 1)}
                >
                  +
                </button>
              </div>
            </div>

            <div className="passenger-row">
              <div>
                <div className="passenger-type">Infants</div>
                <div className="passenger-age">Under 2</div>
              </div>
              <div className="passenger-actions">
                <button
                  type="button"
                  onClick={() => onPassengerChange("infants", -1)}
                >
                  -
                </button>
                <span>{infants}</span>
                <button
                  type="button"
                  onClick={() => onPassengerChange("infants", 1)}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>

      <button className="search-button" type="submit">
        Search Flights
      </button>
    </form>
  );
};

export default SearchForm;
