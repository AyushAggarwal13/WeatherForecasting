import React from 'react';
import './ForecastCard.css';

function ForecastCard({ day }) {
  const tempUnit = day.units === 'imperial' ? '°F' : '°C';
  return (
    <div className="forecast-card">
      <div className="date">{day.date}</div>
      <img
        src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
        alt={day.condition}
        className="forecast-icon"
      />
      <div className="temp">{Math.round(day.temp)}{tempUnit}</div>
      <div className="condition">{day.condition}</div>
    </div>
  );
}

export default ForecastCard;
