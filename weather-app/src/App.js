import React, { useState } from 'react';
import './index.css';
import axios from 'axios';


const api = {
  key: "87354ff43eae1d1711cfcccc4b414df3",
  base: "https://api.openweathermap.org/data/2.5/"
}
let date = String(new window.Date())
date = date.slice(0, 15)

function App() {

  const [weather, setWeather] = useState({});
  const [query, setQuery] = useState('');

  const search = evt => {
    if (evt.key === 'Enter') {
      axios.get(`${api.base}weather?zip=${query},us&units=imperial&APPID=${api.key}`)
        .then(response => {
          setWeather(response.data)
          setQuery('')
          console.log(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });

    }
  }

  return (
    <div className={
      (typeof weather.main !== 'undefined')
        ? ((weather.weather[0].main === 'Clouds')
          ? 'app cloudy'
          : 'app')
        : "app"} >
      <main>

        <div className="search-box">
          <input
            type="text"
            className='search-bar'
            placeholder='Enter zipcode'
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main != 'undefined') ? (
          <div>
            <div className="location-box">
              <div className="location">{weather.name}</div>
              <div className="date">{date}</div>
            </div>
            <div className="weather-box">
              <div className="temp animate"> {Math.round(weather.main.temp)}°F  </div>
              <div className="weather"> Highs / Lows </div>
              <div className="highLow">{Math.round(weather.main.temp_min)}°F/{Math.round(weather.main.temp_max)}°F</div>
            </div>
          </div>
        ) : ("")}
      </main>
    </div>
  );
}

export default App;
