import React, { useState, useEffect } from 'react'
import Filter from './components/filter'
import Newperson from './components/newperson'
import Numbers from './components/numbers'
import axios from 'axios'

const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNr, setNewNr ] = useState('')
  const [ searchName, setSearchName ] = useState('')
  const [ filteredPersons, setFilteredPersons ] = useState(persons)

  useEffect(() => {
    axios.get('http://localhost:3001/persons')
      .then(response => setPersons(response.data))
  }, [])

  const addName = (event) => {
    event.preventDefault()
    let found = false
    if (persons.filter(person => person.name === newName).length !== 0) {
      found = true
    }
    if (found) {
      alert(`${newName} is already added to phonebook`)
      setNewName('')
      setNewNr('')
      return
    }
    const newPerson = {
      name: newName,
      number: newNr
    }
    setPersons(persons.concat(newPerson))
    setNewName('')
    setNewNr('')
  }

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNrChange = (event) => setNewNr(event.target.value)
  const handleSearchNameChange = (event) => setSearchName(event.target.value)

  const filter = () => {
    let fp = persons.filter(n => n.name.toLowerCase().includes(searchName.toLowerCase()))
    setFilteredPersons(fp)
  }

  useEffect(filter, [searchName, persons])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        searchName={searchName}
        handleSearchNameChange={handleSearchNameChange} />
      <Newperson
        addName={addName}
        newName={newName}
        handleNameChange={handleNameChange}
        newNr={newNr}
        handleNrChange={handleNrChange} />
      <Numbers
        persons={persons}
        filteredPersons={filteredPersons} />
    </div>
  )
}

export default App