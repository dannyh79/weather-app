// Credit: https://www.youtube.com/watch?v=GuA0_Z1llYU

import React, { useState, useEffect } from 'react';

const api = {
  key: '664eac603809f1426027912a55140749',
  urlBase: 'https://api.openweathermap.org/data/2.5/weather'
}

function App() {
  const defaultCity = 'Taipei'
  const [city, setCity] = useState(defaultCity)
  const [cityInfo, setCityInfo] = useState({})
  useEffect(() => {
    if (city !== '') {
      fetch(`${api.urlBase}?q=${city}&units=metric&APPID=${api.key}`)
        .then((response) => {
          if (response.status === 200) {
            return response.json()
          } else {
            throw new Error(`${response.statusText}: ${city}`);
          }
        })
        .then((result) => {
          setCityInfo(result)
          setCity('')
        })
        .catch((error) => alert(error))
    }
  }, [city])

  function dateBuilder(d) {
    const months = [
      'January', 'February', 'March',
      'April', 'May', 'June', 'July',
      'August', 'September', 'October',
      'November', 'December'
    ]
    const weekdays = [
      'Sunday', 'Monday', 'Tuesday',
      'Wednesday', 'Thursday', 'Friday',
      'Saturday'
    ]

    const weekday = weekdays[d.getDay()]
    const date = d.getDate()
    const month = months[d.getMonth()]
    const year = d.getFullYear()

    return `${weekday} ${date} ${month} ${year}`
  }

  function shouldNotBeEmpty(object) {
    return Object.keys(object).length !== 0
  }

  function shouldWeatherBeWarm(temp) {
    const coldTemp = 20
    return temp > coldTemp ? 'warm' : ''
  }

  return (
    <div className={
      `app ${shouldNotBeEmpty(cityInfo) && shouldWeatherBeWarm(cityInfo.main.temp)}`
    }>
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Type and press Enter to search..."
            onKeyPress={(e) => e.key === 'Enter' ? setCity(e.target.value) : ''}
          />
        </div>
        {shouldNotBeEmpty(cityInfo) && (
          <>
            <div className="location-box">
              <div className="location">
                {`${cityInfo.name}, ${cityInfo.sys.country}`}
              </div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">
                {`${Math.round(cityInfo.main.temp)}°c`}
              </div>
              <div className="weather">
                {cityInfo.weather[0].main}
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
