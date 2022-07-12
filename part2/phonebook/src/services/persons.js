import axios from 'axios'

const getAll = () => {
    return axios
        .get('http://localhost:3001/persons')
        .then(response => response.data)
}

const add = (newPerson) => {
    return axios
        .post('http://localhost:3001/persons', newPerson)
        .then(response => response.data)
}

const update = (newPerson) => {
    return axios
        .put('http://localhost:3001/persons/' + newPerson.id, newPerson)
        .then(response => response.data)
}

const remove = (id) => {
    return axios
        .delete('http://localhost:3001/persons/' + id)
}

const personsService = { getAll, add, update, remove }
export default personsService