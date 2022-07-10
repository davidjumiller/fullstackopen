import { useState, useEffect } from 'react'
import axios from 'axios'

const Countries = ({ countries, updateSearch }) => {
  if (countries.length > 10) {
    return(<div>Too many matches, specify another filter</div>)
  } else if (countries.length === 0) {
    return(<div>No countries found</div>)
  } else if (countries.length === 1) {
    const country = countries[0]
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

const App = () => {
  const [ countrySearch, setCountrySearch ] = useState('')
  const [ countriesFound, setCountriesFound ] = useState([])

  const handleSearchChange = (event) => {
    const newSearchValue = event.target.value
    updateSearch(newSearchValue)
  }

  const updateSearch = (newSearchValue) => {
    axios.get('https://restcountries.com/v3.1/name/' + newSearchValue).then(
      response => setCountriesFound(response.data)
    )
    .catch(error => {
      if (error.response) {
        setCountriesFound([])
      } else {
        alert("Server/Connection Error")
      }
    })
    setCountrySearch(newSearchValue)
  }

  return (
    <div>
      <div>find countries <input value={countrySearch} onChange={handleSearchChange}/></div>
      <Countries countries={countriesFound} updateSearch={updateSearch}/>
    </div>
  )
}

export default App;
