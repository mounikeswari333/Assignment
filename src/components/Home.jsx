import { useEffect, useMemo, useState } from "react";
import SearchForm from "./SearchForm";
import FlightList from "./FlightList";
import "./Home.css";

const dummyFlights = [
  {
    id: 1,
    airline: "Air India",
    flightNumber: "IX 2879 TC",
    from: "Hyderabad",
    to: "Goa",
    date: "2026-03-12",
    departureTime: "11:30",
    arrivalTime: "18:55",
    duration: "04h 30m",
    via: "1 Stop | via BOM",
    stops: 0,
    refundable: true,
    classType: "Economy",
    handBaggage: "7 Kg",
    checkInBaggage: "15 Kg",
    fareOptions: [
      { price: 13300, tag: "SME", selected: true },
      { price: 105300, tag: "Publish", selected: false },
    ],
    price: 13300,
  },
  {
    id: 2,
    airline: "IndiGo",
    flightNumber: "6E 426 SM",
    from: "Hyderabad",
    to: "Goa",
    date: "2026-03-12",
    departureTime: "20:50",
    arrivalTime: "06:20",
    duration: "09h 30m",
    via: "1 Stop | via PNQ",
    stops: 1,
    refundable: false,
    classType: "Economy",
    handBaggage: "7 Kg",
    checkInBaggage: "15 Kg",
    fareOptions: [
      { price: 13300, tag: "SME", selected: true },
      { price: 14300, tag: "Publish", selected: false },
    ],
    price: 13300,
  },
  {
    id: 3,
    airline: "Star Air",
    flightNumber: "S5 212 TQ2",
    from: "Hyderabad",
    to: "Goa",
    date: "2026-03-12",
    departureTime: "09:50",
    arrivalTime: "17:55",
    duration: "08h 25m",
    via: "1 Stop | via RQY",
    stops: 1,
    refundable: true,
    classType: "Premium Economy",
    handBaggage: "7 Kg",
    checkInBaggage: "15 Kg",
    fareOptions: [
      { price: 13300, tag: "Regular", selected: true },
      { price: 14300, tag: "Flexi", selected: false },
      { price: 15300, tag: "Comfort", selected: false },
    ],
    price: 13300,
  },
  {
    id: 4,
    airline: "Air India Express",
    flightNumber: "IX 2879 TC",
    from: "Hyderabad",
    to: "Goa",
    date: "2026-03-12",
    departureTime: "12:05",
    arrivalTime: "13:30",
    duration: "01h 25m",
    via: "Direct",
    stops: 0,
    refundable: true,
    classType: "Economy",
    handBaggage: "7 Kg",
    checkInBaggage: "15 Kg",
    fareOptions: [
      { price: 13300, tag: "Publish", selected: true },
      { price: 29144, tag: "ExpressBiz", selected: false },
    ],
    price: 13300,
  },
  {
    id: 5,
    airline: "Vistara",
    flightNumber: "UK 701",
    from: "Delhi",
    to: "Kolkata",
    date: "2026-03-20",
    departureTime: "15:10",
    arrivalTime: "17:25",
    duration: "2h 15m",
    via: "Direct",
    stops: 0,
    refundable: true,
    classType: "Business",
    handBaggage: "7 Kg",
    checkInBaggage: "20 Kg",
    fareOptions: [
      { price: 12800, tag: "Business", selected: true },
      { price: 14500, tag: "Flex", selected: false },
    ],
    price: 12800,
  },
  {
    id: 6,
    airline: "Qatar Airways",
    flightNumber: "QR 521",
    from: "Delhi",
    to: "Goa",
    date: "2026-03-12",
    departureTime: "06:40",
    arrivalTime: "09:20",
    duration: "2h 40m",
    via: "Direct",
    stops: 1,
    refundable: false,
    classType: "Economy",
    handBaggage: "7 Kg",
    checkInBaggage: "15 Kg",
    fareOptions: [
      { price: 7600, tag: "Saver", selected: true },
      { price: 9200, tag: "Flex", selected: false },
    ],
    price: 7600,
  },
  {
    id: 7,
    airline: "IndiGo",
    flightNumber: "6E 6142",
    from: "Hyderabad",
    to: "Mumbai",
    date: "2026-03-19",
    departureTime: "19:20",
    arrivalTime: "20:55",
    duration: "1h 35m",
    via: "Direct",
    stops: 0,
    refundable: true,
    classType: "Economy",
    handBaggage: "7 Kg",
    checkInBaggage: "15 Kg",
    fareOptions: [
      { price: 6800, tag: "Saver", selected: true },
      { price: 7800, tag: "Flex", selected: false },
    ],
    price: 6800,
  },
];

const availableAirlines = Array.from(
  new Set(dummyFlights.map((flight) => flight.airline)),
);

const toMinutes = (timeValue) => {
  const [hours, minutes] = timeValue.split(":").map(Number);
  return hours * 60 + minutes;
};

const toClock = (minutesValue) => {
  const minutesInDay = 24 * 60;
  const normalized =
    ((minutesValue % minutesInDay) + minutesInDay) % minutesInDay;
  const hours = String(Math.floor(normalized / 60)).padStart(2, "0");
  const minutes = String(normalized % 60).padStart(2, "0");
  return `${hours}:${minutes}`;
};

const shiftTime = (timeValue, offset) => toClock(toMinutes(timeValue) + offset);

const isTimeInSlot = (timeValue, slot) => {
  if (slot === "any") {
    return true;
  }

  const minutes = toMinutes(timeValue);

  if (slot === "morning") {
    return minutes >= 300 && minutes < 720;
  }

  if (slot === "afternoon") {
    return minutes >= 720 && minutes < 1020;
  }

  if (slot === "evening") {
    return minutes >= 1020 && minutes < 1260;
  }

  return minutes >= 1260 || minutes < 300;
};

const Home = () => {
  const skeletonCards = [1, 2, 3];

  const [activeHolidayTab, setActiveHolidayTab] = useState("Indian Holidays");
  const [activePackageTab, setActivePackageTab] = useState(
    "Package with Flights",
  );
  const [searchData, setSearchData] = useState({
    from: "",
    to: "",
    departDate: "",
    returnDate: "",
    passengers: {
      adults: 2,
      children: 2,
      infants: 0,
    },
  });
  const [appliedSearch, setAppliedSearch] = useState(searchData);
  const [maxPrice, setMaxPrice] = useState(20000);
  const [selectedStops, setSelectedStops] = useState("all");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("any");
  const [selectedAirlines, setSelectedAirlines] = useState([]);
  const [sortBy, setSortBy] = useState("recommended");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 700);

    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSearchData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearch = (event) => {
    event.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setAppliedSearch(searchData);
      setIsLoading(false);
    }, 450);
  };

  const handlePassengerChange = (type, delta) => {
    setSearchData((prev) => {
      const nextValue = Math.max(0, prev.passengers[type] + delta);

      return {
        ...prev,
        passengers: {
          ...prev.passengers,
          [type]: nextValue,
        },
      };
    });
  };

  const handleSwap = () => {
    setSearchData((prev) => ({
      ...prev,
      from: prev.to,
      to: prev.from,
    }));
  };

  const handleAirlineToggle = (airlineName) => {
    setSelectedAirlines((prev) => {
      if (prev.includes(airlineName)) {
        return prev.filter((name) => name !== airlineName);
      }

      return [...prev, airlineName];
    });
  };

  const resetFilters = () => {
    setMaxPrice(20000);
    setSelectedStops("all");
    setSelectedTimeSlot("any");
    setSelectedAirlines([]);
    setSortBy("recommended");
  };

  const filteredFlights = useMemo(() => {
    const baseMatches = dummyFlights.filter((flight) => {
      const fromMatch =
        !appliedSearch.from ||
        flight.from.toLowerCase().includes(appliedSearch.from.toLowerCase());

      const toMatch =
        !appliedSearch.to ||
        flight.to.toLowerCase().includes(appliedSearch.to.toLowerCase());

      return fromMatch && toMatch;
    });

    let searched = baseMatches;

    if (appliedSearch.departDate) {
      const sameDateFlights = baseMatches.filter(
        (flight) => flight.date === appliedSearch.departDate,
      );

      searched =
        sameDateFlights.length > 0
          ? sameDateFlights
          : baseMatches.map((flight) => ({
              ...flight,
              date: appliedSearch.departDate,
            }));
    }

    const filtered = searched.filter((flight) => {
      const priceMatch = flight.price <= maxPrice;
      const airlineMatch =
        selectedAirlines.length === 0 ||
        selectedAirlines.includes(flight.airline);

      const stopsMatch =
        selectedStops === "all" ||
        (selectedStops === "nonstop" && flight.stops === 0) ||
        (selectedStops === "1stop" && flight.stops === 1) ||
        (selectedStops === "2plus" && flight.stops >= 2);

      const timeMatch = isTimeInSlot(flight.departureTime, selectedTimeSlot);

      return priceMatch && airlineMatch && stopsMatch && timeMatch;
    });

    if (sortBy === "priceLow") {
      return [...filtered].sort((a, b) => a.price - b.price);
    }

    if (sortBy === "priceHigh") {
      return [...filtered].sort((a, b) => b.price - a.price);
    }

    if (sortBy === "departure") {
      return [...filtered].sort(
        (a, b) => toMinutes(a.departureTime) - toMinutes(b.departureTime),
      );
    }

    return filtered;
  }, [
    appliedSearch,
    maxPrice,
    selectedAirlines,
    selectedStops,
    selectedTimeSlot,
    sortBy,
  ]);

  const returnFlights = useMemo(
    () =>
      filteredFlights.map((flight) => ({
        ...flight,
        id: `${flight.id}-return`,
        from: flight.to,
        to: flight.from,
        date: appliedSearch.returnDate || flight.date,
        departureTime: shiftTime(flight.departureTime, 80),
        arrivalTime: shiftTime(flight.arrivalTime, 90),
        price: flight.price,
      })),
    [appliedSearch.returnDate, filteredFlights],
  );

  if (isLoading) {
    return (
      <section
        className="dashboard-card dashboard-skeleton"
        aria-label="Loading dashboard"
      >
        <div className="skeleton-tab-row">
          <div className="skeleton-pill" />
          <div className="skeleton-pill" />
        </div>

        <div className="skeleton-package-row">
          <div className="skeleton-pill" />
          <div className="skeleton-pill" />
        </div>

        <div className="skeleton-search-grid">
          <div className="skeleton-input" />
          <div className="skeleton-input" />
          <div className="skeleton-input" />
          <div className="skeleton-input" />
          <div className="skeleton-input" />
          <div className="skeleton-button" />
        </div>

        <div className="skeleton-filters-grid">
          <div className="skeleton-filter" />
          <div className="skeleton-filter" />
          <div className="skeleton-filter" />
          <div className="skeleton-filter" />
          <div className="skeleton-filter" />
        </div>

        <div className="skeleton-chip-row">
          {skeletonCards.concat([4, 5, 6]).map((item) => (
            <div key={`chip-${item}`} className="skeleton-chip" />
          ))}
        </div>

        <div className="loading-skeleton">
          <div className="skeleton-summary" />
          <div className="skeleton-columns">
            <div className="skeleton-column">
              {skeletonCards.map((item) => (
                <div key={`left-${item}`} className="skeleton-card" />
              ))}
            </div>
            <div className="skeleton-column">
              {skeletonCards.map((item) => (
                <div key={`right-${item}`} className="skeleton-card" />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="dashboard-card">
      <div className="tab-row">
        <button
          className={`tab-button ${
            activeHolidayTab === "Indian Holidays" ? "active" : ""
          }`}
          onClick={() => setActiveHolidayTab("Indian Holidays")}
          type="button"
        >
          Indian Holidays
        </button>
        <button
          className={`tab-button ${
            activeHolidayTab === "International Holidays" ? "active" : ""
          }`}
          onClick={() => setActiveHolidayTab("International Holidays")}
          type="button"
        >
          International Holidays
        </button>
      </div>

      <div className="package-row">
        <button
          className={`package-button ${
            activePackageTab === "Package with Flights" ? "active" : ""
          }`}
          onClick={() => setActivePackageTab("Package with Flights")}
          type="button"
        >
          Package with Flights
        </button>
        <button
          className={`package-button ${
            activePackageTab === "Package without Flights" ? "active" : ""
          }`}
          onClick={() => setActivePackageTab("Package without Flights")}
          type="button"
        >
          Package without Flights
        </button>
      </div>

      <SearchForm
        searchData={searchData}
        onInputChange={handleInputChange}
        onSearch={handleSearch}
        onSwap={handleSwap}
        onPassengerChange={handlePassengerChange}
      />

      <div className="filters-toolbar">
        <div className="filter-block">
          <label htmlFor="max-price">
            Price up to: INR {maxPrice.toLocaleString()}
          </label>
          <input
            id="max-price"
            type="range"
            min="5000"
            max="20000"
            step="500"
            value={maxPrice}
            onChange={(event) => setMaxPrice(Number(event.target.value))}
          />
        </div>

        <div className="filter-block filter-inline">
          <label htmlFor="stops">Stops</label>
          <select
            id="stops"
            value={selectedStops}
            onChange={(event) => setSelectedStops(event.target.value)}
          >
            <option value="all">All</option>
            <option value="nonstop">Non-stop</option>
            <option value="1stop">1 Stop</option>
            <option value="2plus">2+ Stops</option>
          </select>
        </div>

        <div className="filter-block filter-inline">
          <label htmlFor="time-slot">Departure</label>
          <select
            id="time-slot"
            value={selectedTimeSlot}
            onChange={(event) => setSelectedTimeSlot(event.target.value)}
          >
            <option value="any">Any time</option>
            <option value="morning">Morning</option>
            <option value="afternoon">Afternoon</option>
            <option value="evening">Evening</option>
            <option value="night">Night</option>
          </select>
        </div>

        <div className="filter-block filter-inline">
          <label htmlFor="sort-by">Sort by</label>
          <select
            id="sort-by"
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
          >
            <option value="recommended">Recommended</option>
            <option value="priceLow">Price: Low to High</option>
            <option value="priceHigh">Price: High to Low</option>
            <option value="departure">Departure time</option>
          </select>
        </div>

        <button
          className="clear-filter-button"
          type="button"
          onClick={resetFilters}
        >
          Clear Filters
        </button>
      </div>

      <div className="airline-filters">
        {availableAirlines.map((airlineName) => {
          const isChecked = selectedAirlines.includes(airlineName);

          return (
            <label
              key={airlineName}
              className={`airline-chip ${isChecked ? "checked" : ""}`}
            >
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => handleAirlineToggle(airlineName)}
              />
              {airlineName}
            </label>
          );
        })}
      </div>

      {filteredFlights.length > 0 ? (
        <FlightList
          outboundFlights={filteredFlights}
          returnFlights={returnFlights}
          passengers={appliedSearch.passengers}
        />
      ) : (
        <div className="no-flights">
          No flights match this search and filter combination.
        </div>
      )}
    </section>
  );
};

export default Home;
