function DisplayWeather({ weatherData, units }) {
    return (
        <div className="weather-display">
            <h2>{weatherData.name}</h2>
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
                </div>
            </div>
            <div className="weather-deatils">
                <p>Humidity: {weatherData.main.humidity}%</p>
                <p>Wind Speed: {Math.round(weatherData.wind.speed)} {units === 'imperial' ? 'mph' : 'm/s'}</p>
                <p>Visibility: {(weatherData.visibility / 1000).toFixed(1)} km</p>
                <p>Pressure: {weatherData.main.pressure} hPa</p>
            </div>
        </div>
    );
}

export default DisplayWeather;