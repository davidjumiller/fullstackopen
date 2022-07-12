import personService from '../services/persons'

const Persons = ({ personsToShow, persons, updatePersons, filterValue, setNotificationMessage }) => {
    const handleDelete = (id, name) => {
        personService.remove(id)
            .then(() => {
                const newPersons = persons.filter(person => person.id !== id)
                updatePersons(newPersons, filterValue)
                setNotificationMessage({ text: `Removed ${name}`, success: true })
                setTimeout(() => {
                    setNotificationMessage(null)
                }, 5000)
            })
            .catch(error => {
                setNotificationMessage({ text: `Could not remove ${name}`, success: false })
                setTimeout(() => {
                    setNotificationMessage(null)
                }, 5000)
            })
    }

    return personsToShow.map((person) => {
        return (
            <div key={person.id}>
                {person.name} {person.number} 
                <button onClick={() => handleDelete(person.id, person.name)}>delete</button>
            </div>
        )
    })
}

export default Persons