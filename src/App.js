import React, { useState, useEffect } from "react";

const LocationSelector = () => {
  // State variables
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const [error, setError] = useState("");

  // Fetch all countries
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(
          "https://crio-location-selector.onrender.com/countries"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch countries");
        }
        const data = await response.json();
        setCountries(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchCountries();
  }, []);

  // Fetch states for the selected country
  const fetchStates = async (country) => {
    if (!country) return;
    try {
      const response = await fetch(
        `https://crio-location-selector.onrender.com/country=${country}/states`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch states");
      }
      const data = await response.json();
      setStates(data);
      setCities([]); // Reset cities when country changes
    } catch (err) {
      setError(err.message);
    }
  };

  // Fetch cities for the selected state
  const fetchCities = async (country, state) => {
    if (!country || !state) return;
    try {
      const response = await fetch(
        `https://crio-location-selector.onrender.com/country=${country}/state=${state}/cities`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch cities");
      }
      const data = await response.json();
      setCities(data);
    } catch (err) {
      setError(err.message);
    }
  };

  // Handle country change
  const handleCountryChange = (event) => {
    const country = event.target.value;
    setSelectedCountry(country);
    setSelectedState("");
    setSelectedCity("");
    fetchStates(country);
  };

  // Handle state change
  const handleStateChange = (event) => {
    const state = event.target.value;
    setSelectedState(state);
    setSelectedCity("");
    fetchCities(selectedCountry, state);
  };

  // Handle city change
  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  return (
    <div>
      <h1>Select Location</h1>

      {/* Dropdown for Countries */}
      <select
        value={selectedCountry}
        onChange={handleCountryChange}
        disabled={!countries.length}
      >
        <option value="">Select Country</option>
        {countries.map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </select>

      {/* Dropdown for States */}
      <select
        value={selectedState}
        onChange={handleStateChange}
        disabled={!selectedCountry || !states.length}
      >
        <option value="">Select State</option>
        {states.map((state) => (
          <option key={state} value={state}>
            {state}
          </option>
        ))}
      </select>

      {/* Dropdown for Cities */}
      <select
        value={selectedCity}
        onChange={handleCityChange}
        disabled={!selectedState || !cities.length}
      >
        <option value="">Select City</option>
        {cities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>

      {/* Display selected location */}
      {selectedCity && (
        <p>
          You selected <strong>{selectedCity}</strong>, {selectedState},{" "}
          {selectedCountry}.
        </p>
      )}

      {/* Error handling */}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
    </div>
  );
};

export default LocationSelector;
