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
    await api.get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const blogs = await helper.blogsInDb()
    expect(blogs).toHaveLength(helper.initialBlogs.length)
  })

  test('first blog is by me', async () => {
    const blogs = await helper.blogsInDb()
    expect(blogs[0].author).toBe('Mikael')
  })

  afterAll(() => {
    mongoose.connection.close()
  })

})
