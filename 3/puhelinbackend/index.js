const express = require('express')
const app = express()
const morgan = require('morgan')
const token = morgan.token('postprinter', (req, res) => { return JSON.stringify(req.body) })
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :postprinter'))

let persons = [
    {
      "name": "Arto Hellas",
      "number": "040-123456",
      "id": 1
    },
    {
      "name": "Ada Lovelace",
      "number": "39-44-5323523",
      "id": 2
    },
    {
      "name": "Dan Abramov",
      "number": "12-43-234345",
      "id": 3
    },
    {
      "name": "Mary Poppendieck",
      "number": "39-23-6423122",
      "id": 4
    }
]

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(p => p.id === id )
  if (person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(p => p.id !== id)
  res.status(204).end()
})

app.post('/api/persons', (req, res) => {
  const maxId = persons.length > 0
    ? Math.round(Math.random() * 1000)
    : 0
  const person = req.body
  let validPerson = true
  let errorMsg = ''
  if (!person.name) {
    errorMsg = 'no name included'
    validPerson = false
  } else if (!person.number) {
    errorMsg = 'no number included'
    validPerson = false
  } else if (persons.find(p => p.name === person.name)) {
    errorMsg = 'name must be unique'
    validPerson = false
  }
  if (!validPerson) {
    return res.status(400).json({error: errorMsg})
  }
  person.id = maxId + 1
  persons = persons.concat(person)
  res.json(person)
})

app.get('/info', (req, res) => {
  res.send(`Phonebook has info for ${persons.length} people <br>\
  ${new Date()}`)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})