import { useState } from 'react'
import axios from 'axios'

import Countries from './components/Countries'

const App = () => {
  const [ countrySearch, setCountrySearch ] = useState('')
  const [ countriesFound, setCountriesFound ] = useState([])

  const handleSearchChange = (event) => {
    const newSearchValue = event.target.value
    updateSearch(newSearchValue)
  }

  const updateSearch = (newSearchValue) => {
    axios.get('https://restcountries.com/v3.1/name/' + newSearchValue).then(
      response => {
        setCountriesFound(response.data)
      }
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
