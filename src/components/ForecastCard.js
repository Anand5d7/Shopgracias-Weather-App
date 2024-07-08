import React from 'react';


const ForecastCard = ({ forecast }) => {
    const iconUrl = `http://openweathermap.org/img/wn/${forecast.icon}@2x.png`;
  return (
    <div className="forecast-card">
      <p className='head-forecast'>{forecast.day}</p>
      <img src={iconUrl} alt={forecast.description} />
      <p className='para'>High: {Math.round(forecast.temp.temp_max)}°C</p>
      <p className='para1'>Low: {Math.round(forecast.temp.temp_min)}°C</p>
    </div>
  );
};

export default ForecastCard;
