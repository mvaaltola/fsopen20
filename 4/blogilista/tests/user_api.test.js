const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)

const addTestUser = async () => {
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({ username: 'root', passwordHash })

  await user.save()
}

describe('when there is initially one user at db', () => {

  beforeEach(async () => {
    await addTestUser()
  })

  test('get request returns the user', async function () {
    const response = await api.get('/api/users')
    expect(response.body.length).toBe(1)
    expect(response.body[0].username).toBe('root')
    expect(response.body[0].passwordHash).toBeUndefined()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'm_vaaltola',
      name: 'Mikael Vaaltola',
      password: 'top-secret',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })
})

afterAll(() => {
  mongoose.connection.close()
})


module.exports = { addTestUser }
