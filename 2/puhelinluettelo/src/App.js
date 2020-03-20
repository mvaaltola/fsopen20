import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123-4567' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNr, setNewNr ] = useState('')

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

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit ={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
          number: <input value={newNr} onChange={handleNrChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map(person =>
          <p key={person.name}>{person.name} {person.number}</p>)}
      </div>
    </div>
  )

}

export default App