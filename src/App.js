import React, { useState, useEffect } from "react";

const LocationSelector = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const [error, setError] = useState("");

  // Fetch countries on initial render
  useEffect(() => {
    fetchCountries();
  }, []);

  // Fetch all countries
  const fetchCountries = async () => {
    try {
      const response = await fetch(
        "https://crio-location-selector.onrender.com/countries"
      );
      const data = await response.json();
      setCountries(data);
    } catch (err) {
      setError("Failed to fetch countries. Please try again.");
    }
  };

  // Fetch states when a country is selected
  const fetchStates = async (country) => {
    try {
      const response = await fetch(
        `https://crio-location-selector.onrender.com/country=${country}/states`
      );
      const data = await response.json();
      setStates(data);
      setCities([]); // Reset cities when a new country is selected
    } catch (err) {
      setError(`Failed to fetch states for ${country}. Please try again.`);
    }
  };

  // Fetch cities when a state is selected
  const fetchCities = async (country, state) => {
    try {
      const response = await fetch(
        `https://crio-location-selector.onrender.com/country=${country}/state=${state}/cities`
      );
      const data = await response.json();
      setCities(data);
    } catch (err) {
      setError(`Failed to fetch cities for ${state}. Please try again.`);
    }
  };

  // Handle country selection
  const handleCountryChange = (event) => {
    const country = event.target.value;
    setSelectedCountry(country);
    setSelectedState("");
    setSelectedCity("");
    if (country) fetchStates(country);
  };

  // Handle state selection
  const handleStateChange = (event) => {
    const state = event.target.value;
    setSelectedState(state);
    setSelectedCity("");
    if (state) fetchCities(selectedCountry, state);
  };

  // Handle city selection
  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  return (
    <div>
      <h2>Location Selector</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Country Dropdown */}
      <select onChange={handleCountryChange} value={selectedCountry}>
        <option value="">Select Country</option>
        {countries.map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </select>

      {/* State Dropdown */}
      <select
        onChange={handleStateChange}
        value={selectedState}
        disabled={!selectedCountry}
      >
        <option value="">Select State</option>
        {states.map((state) => (
          <option key={state} value={state}>
            {state}
          </option>
        ))}
      </select>

      {/* City Dropdown */}
      <select
        onChange={handleCityChange}
        value={selectedCity}
        disabled={!selectedState}
      >
        <option value="">Select City</option>
        {cities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>

      {/* Display Selected Location */}
      <div>
        <h3>Selected Location</h3>
        <p>
          Country: {selectedCountry || "None"}, State: {selectedState || "None"},
          City: {selectedCity || "None"}
        </p>
      </div>
    </div>
  );
};

export default LocationSelector;
