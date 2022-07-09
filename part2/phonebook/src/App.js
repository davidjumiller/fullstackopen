import { useEffect, useState } from 'react'
import axios from 'axios'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [personsToShow, setPersonsToShow] = useState([...persons])
  const [filterValue, setFilterValue] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3001/persons').then(response => {
      updatePersons(response.data, filterValue)
    })
  }, [])

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)

  const handleSubmit = (event) => {
    event.preventDefault()
    
    let nameOccurences = persons.reduce((prev, curr) => {
      let match = curr.name === newName
      return prev + match
    }, 0)

    if (nameOccurences > 0) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const newPersons = persons.concat({ name: newName, number: newNumber, id: persons.length+1 })
      updatePersons(newPersons, filterValue)
      setNewName('')
      setNewNumber('')
    }
  }

  const updatePersons = (persons, filter) => {
    setPersons(persons)
    setPersonsToShow(persons.filter((person) => person.name.toLowerCase().includes(filter.toLowerCase())))
  }

  const handleFilterChange = (event) => {
    setFilterValue(event.target.value)
    updatePersons(persons, event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filterValue} onChange={handleFilterChange}/>
      <h2>add a new</h2>
      <PersonForm onSubmit={handleSubmit} newName={newName} onNameChange={handleNameChange} newNumber={newNumber} onNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow}/>
    </div>
  )
}

export default App