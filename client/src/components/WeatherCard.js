import React from 'react';
import './WeatherCard.css';

function WeatherCard({ weather }) {
  const tempUnit = weather.units === 'imperial' ? '°F' : '°C';
  const windUnit = weather.units === 'imperial' ? 'mph' : 'm/s';
  return (
    <div className="weather-card">
      <h2>{weather.city}</h2>
      <div className="weather-main">
        <img
          src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
          alt={weather.condition}
          className="weather-icon"
        />
        <div className="weather-info">
          <div className="temp">{Math.round(weather.temp)}{tempUnit}</div>
          <div className="condition">{weather.condition}</div>
        </div>
      </div>
      <div className="weather-details">
        <span>Humidity: {weather.humidity}%</span>
        <span>Wind: {weather.wind} {windUnit}</span>
      </div>
    </div>
  );
}

export default WeatherCard;
