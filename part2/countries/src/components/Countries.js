import { useState } from 'react'
import axios from 'axios'

const apikey = process.env.REACT_APP_API_KEY

const Countries = ({ countries, updateSearch }) => {
    const [ countrySelected, setCountrySelected ] = useState('')
    const [ weather, setWeather] = useState({
        temperature: null,
        windSpeed: null,
        icon: null
    })

    const getWeatherData = (country) => {
        axios
        .get("http://api.openweathermap.org/geo/1.0/direct?q=" + country.capital + ", " + country.cca2 + "&limit=1&appid=" + apikey)
        .then(response => {
            const lat = response.data[0].lat
            const lon = response.data[0].lon
    
            axios
            .get("https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon="+ lon + "&units=metric&appid=" + apikey)
            .then(response => {
                const newWeather = {
                    temperature: response.data.main.temp,
                    windSpeed: response.data.wind.speed,
                    icon: response.data.weather[0].icon
                }
                setWeather(newWeather)
            })
        })
        .catch(error => alert(error))
    }

    if (countries.length > 10) {
        return(<div>Too many matches, specify another filter</div>)
    } else if (countries.length === 0) {
        return(<div>No countries found</div>)
    } else if (countries.length === 1) {
        const country = countries[0]
        if (countrySelected !== country.name.common){
            getWeatherData(country)
            setCountrySelected(country.name.common)
        }
        return(
        <div>
            <h1>{country.name.common}</h1>
            <div>capital: {country.capital}</div>
            <div>area: {country.area} km</div>

            <h3>languages:</h3>
            <ul>
            {Object.values(country.languages).map((language, index) => <li key={index}>{language}</li>)}
            </ul>
            <img src={country.flags.png} alt={"Flag of " + country.name.common}></img>

            <h2>Weather in {country.capital}</h2>
            <div>temperature {weather.temperature} Celcius</div>
            <img src={"http://openweathermap.org/img/wn/" + weather.icon + "@2x.png"} alt="Weather icon"></img>
            <div>wind {weather.windSpeed} m/s</div>
        </div>
        )
    } else {
        return (
        <div>
            {countries.map((country, index) => <div key={index}>{country.name.common}<button onClick={() => updateSearch(country.name.common)}>show</button></div>)}
        </div>
        )
    }
}

export default Countries