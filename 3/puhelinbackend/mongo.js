const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://mikael:${password}@cluster0-lihiw.mongodb.net/test?retryWrites=true&w=majority`

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
  Person.find({}).then(result => {
    result.forEach(p => {
      console.log(p)
    })
    mongoose.connection.close()
  })
  return
} else if (process.argv.length === 5) {
  const p = new Person({
    name: process.argv[3],
    number: process.argv[4]
  })

  p.save().then(response => {
    console.log(`added ${process.argv[3]} number ${process.argv[4]} to phonebook`)
    mongoose.connection.close()
  })
}
