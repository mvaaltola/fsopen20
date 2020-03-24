import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = newPerson => {
  const request = axios.post(baseUrl, newPerson)
  return request.then(response =>  response.data)
}

const remove = person => {
  const request = axios.delete(`${baseUrl}/${person}`)
  return request.then(response => response)
}

const update = person => {
  const request = axios.put(`${baseUrl}/${person.id}`, person)
  return request.then(response => response.data)
}

export default { getAll, create, remove, update }