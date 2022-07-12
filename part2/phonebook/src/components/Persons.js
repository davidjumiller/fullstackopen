import personService from '../services/persons'

const Persons = ({ personsToShow, persons, updatePersons, filterValue }) => {
    const handleDelete = (id) => {
        personService.remove(id)
            .then(() => {
                const newPersons = persons.filter(person => person.id !== id)
                updatePersons(newPersons, filterValue)
            })
    }

    return personsToShow.map((person) => {
        return (
            <div key={person.id}>
                {person.name} {person.number} 
                <button onClick={() => handleDelete(person.id)}>delete</button>
            </div>
        )
    })
}

export default Persons