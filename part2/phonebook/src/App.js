import { useEffect, useState } from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

import personsService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [personsToShow, setPersonsToShow] = useState([...persons])
  const [filterValue, setFilterValue] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)

  useEffect(() => {
    personsService
      .getAll()
      .then(persons => {
        updatePersons(persons, filterValue)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)

  const handleFilterChange = (event) => {
    setFilterValue(event.target.value)
    updatePersons(persons, event.target.value)
  }

  const handleDelete = (id, name) => {
    personsService.remove(id)
        .then(() => {
            const newPersons = persons.filter(person => person.id !== id)
            updatePersons(newPersons, filterValue)
            showNotification({ text: `Removed ${name}`, success: true })
        })
        .catch(error => {
            showNotification({ text: `Could not remove ${name}`, success: false })
        })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    
    let nameOccurences = persons.reduce((prev, curr) => {
      let match = curr.name === newName
      return prev + match
    }, 0)

    if (nameOccurences > 0) {
      const replace = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      if (replace) {
        const newPerson = persons.find(person => person.name === newName)
        newPerson.number = newNumber
        personsService.update(newPerson)
          .then(updatedPerson => {
            updatePersons(persons.map(person => person.id === updatedPerson.id? updatedPerson : person), filterValue)
            showNotification({ text: `Updated ${updatedPerson.name}`, success: true })
          })
          .catch(error => {
            showNotification({ text: `Could not update ${newPerson.name}`, success: false })
          })
      }
      setNewName('')
      setNewNumber('')
    } else {
      const newPerson = { name: newName, number: newNumber, id: persons.length+1 }
      personsService.add(newPerson)
        .then(newPerson => {
          updatePersons(persons.concat(newPerson), filterValue)
          showNotification({ text: `Added ${newPerson.name}`, success: true })
        })
        .catch(error =>{
          showNotification({ text: `Could not add ${newPerson.name} to database`, success: false })
        })
      setNewName('')
      setNewNumber('')
    }
  }

  const showNotification = (message) => {
    setNotificationMessage(message)
    setTimeout(() => {
        setNotificationMessage(null)
    }, 5000)
  }

  const updatePersons = (newPersons, filter) => {
    setPersons(newPersons)
    setPersonsToShow(newPersons.filter((person) => person.name.toLowerCase().includes(filter.toLowerCase())))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage}/>
      <Filter value={filterValue} onChange={handleFilterChange}/>
      <h2>add a new</h2>
      <PersonForm onSubmit={handleSubmit} newName={newName} onNameChange={handleNameChange} newNumber={newNumber} onNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} handleDelete={handleDelete}/>
    </div>
  )
}

export default App