import React from 'react';
import { useState } from 'react';

function Weather() {
    const [zipCode, setZipCode] = useState('');
    const [units, setUnits] = useState('imperial');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add API call logic later
        console.log(`Fetching weather for ${zipCode} in ${units} units`);
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
                        placeholder="Enter a %-digit zip code"
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

            {zipCode && <p>Current Zip Code: {zipCode}</p>}
        </div>
    );
}

export default Weather;