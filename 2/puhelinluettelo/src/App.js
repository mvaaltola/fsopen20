import React, { useState, useEffect } from 'react'
import Filter from './components/filter'
import Newperson from './components/newperson'
import Numbers from './components/numbers'
import personsapi from './services/persons'

const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNr, setNewNr ] = useState('')
  const [ searchName, setSearchName ] = useState('')
  const [ filteredPersons, setFilteredPersons ] = useState(persons)

  useEffect(() => {
    personsapi.getAll().then(persondata => {setPersons(persondata)})
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
    personsapi.create(newPerson).then(response => {
      setPersons(persons.concat(response))
      setNewName('')
      setNewNr('')
    }).catch(error => {
      console.log(error)
    })
  }

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNrChange = (event) => setNewNr(event.target.value)
  const handleSearchNameChange = (event) => setSearchName(event.target.value)

  const filter = () => {
    let fp = persons.filter(n => n.name.toLowerCase().includes(searchName.toLowerCase()))
    setFilteredPersons(fp)
  }

  useEffect(filter, [searchName, persons])

  const delButton = (key) => {
    return () => {
      const p = persons.filter(person => person.id === key)
      if (window.confirm(`Delete ${p[0].name}?`)) {
        personsapi.remove(key).then(response => {
          setPersons(persons.filter(person => person.id !== key))
        }).catch(response => console.log(response))
      }
    }
  }

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
        filteredPersons={filteredPersons}
        delButton={delButton} />
    </div>
  )
}

export default App