import React from 'react';
import { useState } from 'react';
import DisplayWeather from './DisplayWeather';

function Weather() {
    const [zipCode, setZipCode] = useState('');
    const [units, setUnits] = useState('imperial');
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const API_KEY = '03de325d485e014f0dcffbc4d03e0e00';

    const fetchWeather = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&units=${units}&appid=${API_KEY}`);
            const data = await response.json();

            if (data.cod !== 200) {
                throw new Error(data.message || 'Failed to fetch weather data');
            }
            setWeatherData(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
     };


    const handleSubmit = (e) => {
        e.preventDefault();
        fetchWeather();
    };

    return (
        <div className="weather-container">
            <h1>Lester's Weather Room!</h1>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="zipCode">Zip Code:</label>
                    <input
                        type="text"
                        id="zipCode"
                        name="zipCode"
                        placeholder="Enter a 5-digit zip code"
                        pattern="[0-9]{5}"
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Temperature Units:</label>
                    <div className="radio-group">
                        <label>
                            <input
                                type="radio"
                                name="units"
                                value="imperial"
                                checked={units === 'imperial'}
                                onChange={(e) => setUnits(e.target.value)}
                            />
                            Fahrenheit (°F)
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="units"
                                value="metric"
                                checked={units === 'metric'}
                                onChange={(e) => setUnits(e.target.value)}
                            />
                            Celsius (°C)
                        </label>
                </div>
              </div>

              <button type="submit">Get Weather</button>
            </form>

            {/* Display basic weather informatioin */}
            {weatherData && (
                <div className="weather-info">
                    <h2>{weatherData.name}</h2>
                    <p>Temperature: {weatherData.main.temp}°{units === 'imperial' ? 'F' : 'C'}</p>
                    <p>Feels like: {weatherData.main.feels_like}°{units === 'imperial' ? 'F' : 'C'}</p>
                    <p>Weather: {weatherData.weather[0].main} - {weatherData.weather[0].description}</p>
                </div>
            )}

            {loading && <p>Loading Weather Data...</p>}
            {error && <p className="error">Error: {error}</p>}
            {!loading && !error && weatherData && (
                <DisplayWeather weatherData={weatherData} units={units} />
            )}

            {/* Add a button to toggle between Fahrenheit and Celsius */}
            <button onClick={() => setUnits(units === 'imperial' ? 'metric' : 'imperial')}>
                Toggle to {units === 'imperial' ? 'Celsius (°C)' : 'Fahrenheit (°F)'}
            </button>

            {/* Display additional weather information */}
            {zipCode && <p>Current Zip Code: {zipCode}</p>}
        </div>
    );
}

export default Weather;