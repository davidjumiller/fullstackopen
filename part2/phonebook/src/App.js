import { useState } from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [personsToShow, setPersonsToShow] = useState([...persons])
  const [filterValue, setFilterValue] = useState('')

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
      const newPersons = persons.concat({ name: newName, number: newNumber })
      setPersons(newPersons)
      setNewName('')
      setNewNumber('')
      setPersonsToShow(newPersons.filter((person) => person.name.toLowerCase().includes(filterValue.toLowerCase())))
    }
  }

  const handleFilterChange = (event) => {
    setFilterValue(event.target.value)
    setPersonsToShow(persons.filter((person) => person.name.toLowerCase().includes(event.target.value.toLowerCase())))
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