const axios = require('axios');
const Search = require('../models/Search');

const getWeather = async (req, res) => {
  const city = req.query.city;
  const units = req.query.units === 'imperial' ? 'imperial' : 'metric';
  if (!city) return res.status(400).json({ error: 'City name is required.' });

  try {
    const apiKey = process.env.OPENWEATHER_API_KEY;
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=${units}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${apiKey}&units=${units}`;

    const [weatherRes, forecastRes] = await Promise.all([
      axios.get(weatherUrl),
      axios.get(forecastUrl)
    ]);

    const weather = weatherRes.data;
    const forecast = forecastRes.data;

    const forecastList = forecast.list.filter(item => item.dt_txt.includes('12:00:00')).slice(0, 5).map(item => ({
      date: item.dt_txt.split(' ')[0],
      temp: item.main.temp,
      condition: item.weather[0].main,
      icon: item.weather[0].icon
    }));

    const result = {
      city: weather.name,
      temp: weather.main.temp,
      humidity: weather.main.humidity,
      wind: weather.wind.speed,
      condition: weather.weather[0].main,
      icon: weather.weather[0].icon,
      forecast: forecastList,
      units
    };

    await Search.create({
      city: result.city,
      weather: {
        temp: result.temp,
        humidity: result.humidity,
        wind: result.wind,
        condition: result.condition,
        icon: result.icon
      }
    });

    res.json(result);
  } catch (err) {
    if (err.response && err.response.status === 404) {
      return res.status(404).json({ error: 'City not found.' });
    }
    res.status(500).json({ error: 'Failed to fetch weather data.' });
  }
};

module.exports = { getWeather };
