import React from 'react';

function DisplayWeather({ weatherData, units }) {
  // Convert epoch time to readable time format
  const formatTime = (epoch) => {
    return new Date(epoch * 1000).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Format sunrise and sunset times
  const sunrise = formatTime(weatherData.sys.sunrise);
  const sunset = formatTime(weatherData.sys.sunset);

  // Get direction from wind degrees
  const getWindDirection = (degrees) => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round(degrees / 45) % 8;
    return directions[index];
  };

  return (
    <div className="weather-display">
      <h2>{weatherData.name}, {weatherData.sys.country}</h2>
      
      <div className="weather-main">
        <div className="temperature">
          <h3>{Math.round(weatherData.main.temp)}°{units === 'imperial' ? 'F' : 'C'}</h3>
          <p>Feels like: {Math.round(weatherData.main.feels_like)}°{units === 'imperial' ? 'F' : 'C'}</p>
        </div>
        
        <div className="weather-icon">
          <img 
            src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} 
            alt={weatherData.weather[0].description} 
          />
          <p>{weatherData.weather[0].main}</p>
          <p>{weatherData.weather[0].description}</p>
        </div>
      </div>
      
      <div className="weather-details">
        <div className="detail-item">
          <p>Humidity</p>
          <p><strong>{weatherData.main.humidity}%</strong></p>
        </div>
        
        <div className="detail-item">
          <p>Wind</p>
          <p>
            <strong>
              {weatherData.wind.speed} {units === 'imperial' ? 'mph' : 'm/s'} {getWindDirection(weatherData.wind.deg)}
            </strong>
          </p>
        </div>
        
        <div className="detail-item">
          <p>Pressure</p>
          <p><strong>{weatherData.main.pressure} hPa</strong></p>
        </div>
        
        <div className="detail-item">
          <p>Visibility</p>
          <p><strong>{(weatherData.visibility / 1000).toFixed(1)} km</strong></p>
        </div>
        
        <div className="detail-item">
          <p>Sunrise</p>
          <p><strong>{sunrise}</strong></p>
        </div>
        
        <div className="detail-item">
          <p>Sunset</p>
          <p><strong>{sunset}</strong></p>
        </div>
      </div>
    </div>
  );
}

export default DisplayWeather;