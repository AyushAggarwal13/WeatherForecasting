import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import WeatherCard from './components/WeatherCard';
import ForecastCard from './components/ForecastCard';
import SearchHistory from './components/SearchHistory';
import Skeleton from './components/Skeleton';
import CityAutocomplete from './components/CityAutocomplete';
import WeatherAnimation from './components/WeatherAnimation';
import './App.css';

const API_URL = 'https://weatherforecasting-mvmh.onrender.com/api/weather';
const HISTORY_URL = 'https://weatherforecasting-mvmh.onrender.com/api/history';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [history, setHistory] = useState([]);
  const [units, setUnits] = useState('metric'); 

  const fetchHistory = useCallback(async () => {
    try {
      const res = await axios.get(HISTORY_URL);
      setHistory(res.data || []);
    } catch {
      setHistory([]);
    }
  }, []);

  const fetchWeather = useCallback(
    async (cityName, customUnits = units) => {
      if (!cityName) return;

      setLoading(true);
      setError('');

      try {
        const res = await axios.get(
          `${API_URL}?city=${cityName}&units=${customUnits}`
        );
        setWeather(res.data);
        await fetchHistory();
      } catch (err) {
        setWeather(null);
        setError(err.response?.data?.error || 'Failed to fetch weather');
      } finally {
        setLoading(false);
      }
    },
    [units, fetchHistory]
  );

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  useEffect(() => {
    if (!weather || !city) return;

    const timer = setInterval(() => {
      fetchWeather(city);
    }, 300000); 

    return () => clearInterval(timer);
  }, [weather, city, fetchWeather]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeather(city);
  };

  const handleHistorySelect = (cityName) => {
    setCity(cityName);
    fetchWeather(cityName);
  };

  const handleUnitToggle = () => {
    const newUnits = units === 'metric' ? 'imperial' : 'metric';
    setUnits(newUnits);

    if (city) {
      fetchWeather(city, newUnits);
    }
  };

  let bgClass = 'bg-default';
  if (weather?.condition) {
    const cond = weather.condition.toLowerCase();
    if (cond.includes('rain')) bgClass = 'bg-rain';
    else if (cond.includes('cloud')) bgClass = 'bg-cloud';
    else if (cond.includes('clear')) bgClass = 'bg-clear';
    else if (cond.includes('snow')) bgClass = 'bg-snow';
    else if (cond.includes('storm') || cond.includes('thunder'))
      bgClass = 'bg-storm';
  }

  let animCondition = '';
  if (weather?.condition) {
    const cond = weather.condition.toLowerCase();
    if (cond.includes('rain')) animCondition = 'rain';
    else if (cond.includes('cloud')) animCondition = 'cloud';
    else if (cond.includes('clear')) animCondition = 'clear';
    else if (cond.includes('snow')) animCondition = 'snow';
  }

  return (
    <>
      <WeatherAnimation condition={animCondition} />

      <div className={`app-container ${bgClass}`}>
        <h1 className="title">Live Weather Forecast</h1>

        <div style={{ textAlign: 'center', marginBottom: 12 }}>
          <button
            className="button"
            style={{ padding: '6px 16px', minWidth: 90 }}
            onClick={handleUnitToggle}
          >
            {units === 'metric' ? 'Show °F' : 'Show °C'}
          </button>
        </div>

        <form onSubmit={handleSubmit} className="search-form">
          <CityAutocomplete
            value={city}
            onChange={setCity}
            onSelect={(cityName) => {
              setCity(cityName);
              fetchWeather(cityName);
            }}
          />
          <button type="submit" className="button" disabled={loading}>
            {loading ? 'Loading...' : 'Get Weather'}
          </button>
        </form>

        {error && (
          <div className="error">
            <span role="img" aria-label="error" style={{ fontSize: '1.5em', marginRight: 8 }}>
              ⚠️
            </span>
            {error}
          </div>
        )}

        {loading && (
          <>
            <Skeleton type="weather" />
            <h2 className="forecast-title">5-Day Forecast</h2>
            <div className="forecast-list">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} type="forecast" />
              ))}
            </div>
          </>
        )}

        {!loading && weather && (
          <>
            <WeatherCard weather={weather} />
            <h2 className="forecast-title">5-Day Forecast</h2>
            <div className="forecast-list">
              {weather.forecast.map((day) => (
                <ForecastCard
                  key={day.date}
                  day={{ ...day, units: weather.units }}
                />
              ))}
            </div>
            <SearchHistory
              history={history.slice(0, 5)}
              onSelect={handleHistorySelect}
            />
          </>
        )}
      </div>
    </>
  );
}

export default App;
