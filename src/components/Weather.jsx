import React from 'react';
import { useState, useEffect } from 'react';
import DisplayWeather from './DisplayWeather';
import './Weather.css';

function Weather() {
    const [zipCode, setZipCode] = useState('');
    const [units, setUnits] = useState('imperial');
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [appState, setAppState] = useState('initial');

    const API_KEY = '03de325d485e014f0dcffbc4d03e0e00';

    useEffect(() => {
        const savedZipCode = localStorage.getItem('lastZipCode');
        if (savedZipCode) {
            setZipCode(savedZipCode);
        }
    }, []);

    const fetchWeather = async () => {
        setLoading(true);
        setAppState('loading');
        setError(null);

        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&units=${units}&appid=${API_KEY}`);
            const data = await response.json();

            if (data.cod !== 200) {
                throw new Error(data.message || 'Failed to fetch weather data');
            }
            setWeatherData(data);
            setAppState('success');

            localStorage.setItem('lastZipCode', zipCode);
        }
        catch (err) {
            setError(err.message);
            setAppState('error');
            console.error('Error fetching weather data:', err);
        }
        finally {
            setLoading(false);
        }
     };


    const handleSubmit = (e) => {
        e.preventDefault();
        fetchWeather();
    };

    // Function to determine the background color based on weather condition
    const getBackgroundClass = () => {
        if (!weatherData) return '';

        const condition = weatherData.weather[0].main.toLowerCase();
        const temp = weatherData.main.temp;
        const isDay = weatherData.weather[0].icon.includes('d');

        if (condition.includes('rain') || condition.includes('drizzle')) {
            return 'bg-rain';
        } else if (condition.includes('cloud')) {
            return 'bg-cloudy';
        } else if (condition.includes('snow')) {
            return 'bg-snow';
        }
        else if (condition.includes('clear') && isDay) {
            return 'bg-clear-day';
        } else if (condition.includes('clear') && !isDay) {
            return 'bg-clear-night';
        } else if (temp > 80) {
            return 'bg-hot';
        } else if (temp < 60) {
            return 'bg-cold';
        }
    }

    return (
        <div className={`weather-container ${weatherData ? getBackgroundClass() : ''}`}>
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

              <button type="submit" disabled={loading}>{loading ? 'Loading...' : 'Get Weather'}</button>
            </form>

            <div className="result-container">
                {appState === 'initial' && (
                    <div className="initial-state">
                    <p>Enter a zip code to get started!</p>
                    </div>
                )}
                {appState === 'loading' && (
                    <div className="loading-state">
                        <p>Loading weather data...</p>
                        <div className="loader"></div>
                    </div>
                )}
                {appState === 'error' && (
                    <div className="error-state">
                        <p>Error: {error}</p>
                        <button onClick={fetchWeather}>Try Again</button>
                    </div>
                )}

                {appState === 'success' && weatherData && (
                    <DisplayWeather weatherData={weatherData} units={units} />
                )}
            </div>

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