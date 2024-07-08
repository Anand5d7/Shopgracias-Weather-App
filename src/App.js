import React, { useState } from 'react';
import axios from 'axios';
import WeatherCard from './components/WeatherCard';
import ForecastCard from './components/ForecastCard';
import './App.css';

const API_KEY = '3ac2140d126b3d8b9b215f472b30ed4c'; 

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeatherData = async () => {
    setLoading(true);
    setError(null);
    try {
      const currentWeatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeatherData(currentWeatherResponse.data);

      const dailyData = {};

      forecastResponse.data.list.forEach((forecast) => {
        const date = new Date(forecast.dt * 1000);
        const day = date.toLocaleDateString('en-US', { weekday: 'short' });

        if (!dailyData[day]) {
          dailyData[day] = { 
            temp_min: forecast.main.temp_min, 
            temp_max: forecast.main.temp_max,
            icon: forecast.weather[0].icon,
            description: forecast.weather[0].description,
          };
        } else {
          dailyData[day].temp_min = Math.min(dailyData[day].temp_min, forecast.main.temp_min);
          dailyData[day].temp_max = Math.max(dailyData[day].temp_max, forecast.main.temp_max);
        }
      });

      const dailyForecasts = Object.keys(dailyData).map((day) => ({
        day,
        temp: dailyData[day],
        icon: dailyData[day].icon,
        description: dailyData[day].description,
      }));

      setForecastData(dailyForecasts.slice(0, 5));

    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    fetchWeatherData();
  };

  return (
    <div className="App">
      <h1>Weather Dashboard</h1>
      <div>
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      
      {weatherData && (
        <WeatherCard weather={weatherData} />
      )}

      <h2 className='side-heading'>5-Day Forecast</h2>
      {forecastData && (
        <div className="forecast">
          {forecastData.map((forecast, index) => (
            <ForecastCard key={index} forecast={forecast} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
