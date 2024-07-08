import React from 'react';


const WeatherCard = ({ weather }) => {
    const iconUrl = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
  return (
    <div className="weather-card">
      <div className='card'>
        <h2>Current Weather in {weather.name}</h2>
        <p className='para'>{Math.round(weather.main.temp)}°C</p>
        <p className='para1'>{weather.weather[0].description}</p>
      </div>
      <img src={iconUrl} alt={weather.weather[0].description} />
    </div>
  );
};

export default WeatherCard;
