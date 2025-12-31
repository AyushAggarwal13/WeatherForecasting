import React, { useState } from 'react';
import './CityAutocomplete.css';

// A small static list for demo; replace with a public city API for production
const CITY_LIST = [
  'New York', 'London', 'Paris', 'Tokyo', 'Delhi', 'Sydney', 'Moscow', 'Beijing', 'Cairo', 'Rio de Janeiro',
  'Los Angeles', 'Toronto', 'Berlin', 'Madrid', 'Rome', 'Istanbul', 'Dubai', 'Singapore', 'Bangkok', 'Seoul'
];

function CityAutocomplete({ value, onChange, onSelect }) {
  const [show, setShow] = useState(false);
  const [filtered, setFiltered] = useState([]);

  const handleInput = e => {
    const val = e.target.value;
    onChange(val);
    if (val.length > 1) {
      const matches = CITY_LIST.filter(city => city.toLowerCase().startsWith(val.toLowerCase()));
      setFiltered(matches);
      setShow(true);
    } else {
      setShow(false);
    }
  };

  const handleSelect = city => {
    onSelect(city);
    setShow(false);
  };

  return (
    <div className="autocomplete-container">
      <input
        type="text"
        value={value}
        onChange={handleInput}
        placeholder="Enter city name"
        className="input"
        autoComplete="off"
      />
      {show && filtered.length > 0 && (
        <ul className="autocomplete-list">
          {filtered.map(city => (
            <li key={city} onClick={() => handleSelect(city)}>{city}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CityAutocomplete;
