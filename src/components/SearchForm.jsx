import "./SearchForm.css";

const SearchForm = ({ searchData, onInputChange, onSearch }) => {
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

      <select
        className="search-select"
        name="passengers"
        value={searchData.passengers}
        onChange={onInputChange}
      >
        <option value="1 Adult">1 Adult</option>
        <option value="2 Adults">2 Adults</option>
        <option value="2 Adults, 1 Child">2 Adults, 1 Child</option>
        <option value="2 Adults, 2 Children">2 Adults, 2 Children</option>
        <option value="3 Adults">3 Adults</option>
      </select>

      <button className="search-button" type="submit">
        Search Flights
      </button>
    </form>
  );
};

export default SearchForm;
