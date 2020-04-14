import React from 'react';
import axios from 'axios'


const CountriesList = ({ countries, filterTerm }) => {

  if (!filterTerm) {
    return <p>Enter search term.</p>
  }

  if (countries.length === 1) {
    const [country] = countries
    return <CountryBio country={country} />
  } else if (countries.length >= 10) {
    return <p>Too many matches, specify another filter</p>
  }

  return countries.map(country => {
    return (
      <div key={country.name}>
        <span>{country.name} </span>
        <ToggleBio key={country} country={country} />
      </div>
    )
  })
}

const CountryBio = ({ country }) => {

  return (
    <div key={country.name}>
      <h1>{country.name}</h1>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h2>languages</h2>
      {<ul>
        {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
      </ul>}
      <img src={country.flag} alt="Country Flag" width="100" />
      <WeatherInfo country={country} />
    </div>
  )
}

const ToggleBio = ({ country }) => {
  const [show, setNewShow] = React.useState(false)

  return (
    <>
      <button onClick={() => setNewShow(!show)}>{show ? 'Hide' : 'Show'}</button>
      {show ? <CountryBio country={country} /> : null}
    </>
  )
}

const WeatherInfo = ({ country }) => {
  const [weather, setWeather] = React.useState({})
  const accessKey = process.env.REACT_APP_WEATHER_API_KEY
  
  React.useEffect(() => {
    axios
      .get(`http://api.weatherstack.com/current?access_key=${accessKey}&query=${country.capital}&units=m`)
      .then(response => setWeather(response.data))
      .catch(error => setWeather({}))
  }, [country.capital, accessKey])

  return Object.keys(weather).length > 0 ? (
    <div>
      <h2>Weather in {weather.location.name}</h2>
      <p><strong>temperature: </strong>{weather.current.temperature} Celsius</p>
      <img src={weather.current.weather_icons[0]} alt="Weather Icon" />
      <p><strong>wind: </strong>{weather.current.wind_speed} m/s direction {weather.current.wind_dir}</p>
    </div>
  ) : null
}

const App = () => {
  const [countries, setNewCountries] = React.useState([])
  const [filterTerm, setNewFilterTerm] = React.useState('')
  const [filteredCountries, setNewFilteredCountries] = React.useState([])

  React.useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => setNewCountries(response.data))
  }, [])

  const handleChange = (e) => {
    setNewFilterTerm(e.target.value.toLowerCase())
    setNewFilteredCountries(countries
      .filter(country => country.name.toLowerCase().includes(filterTerm)))
  }

  return (
    <div>
      find countries <input onChange={handleChange} />
      <CountriesList countries={filteredCountries} filterTerm={filterTerm} />
    </div>
  )
}

export default App;
