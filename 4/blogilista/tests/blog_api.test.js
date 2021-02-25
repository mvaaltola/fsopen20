const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')

describe('blog api', ()  => {

  beforeEach(async () => {
    await Blog.deleteMany({})

    for (const blog of helper.initialBlogs) {
      let blogObject = new Blog(blog)
      await blogObject.save()
    }
  })

  test('blogs are returned as json', async () => {
    const response = await api.get('/api/blogs')
    expect(response.statusCode).toBe(200)
    expect(response.type).toBe('application/json')
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('first blog is by me', async () => {
    const blogs = await api.get('/api/blogs')
    expect(blogs.body[0].author).toBe('Mikael')
  })

  afterAll(() => {
    mongoose.connection.close()
  })

})
