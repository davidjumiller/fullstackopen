const Persons = ({ personsToShow }) => personsToShow.map((person) => <div key={person.name}>{person.name} {person.number}</div>)

export default Persons