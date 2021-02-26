const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')

describe('get from blog api', ()  => {

  beforeAll(async () => {
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

  test('identifier is called id', async () => {
    const blogs = await api.get('/api/blogs')
    expect(blogs.body[0].id).toBeDefined()
  })
})

describe('post to blog api', () =>{

  beforeEach(async () => {
    await Blog.deleteMany({})
    for (const blog of helper.initialBlogs) {
      let blogObject = new Blog(blog)
      await blogObject.save()
    }
  })

  test('new blog is added', async () => {
    const newBlog = {
      title: 'new blog from test',
      author: 'mv',
      url: 'full-stacks.org',
      likes: 11
    }
    const blogsBeforePost = await helper.blogsInDb()

    const response = await api.post('/api/blogs').send(newBlog)
    expect(response.statusCode).toBe(201)

    const blogsAfterPost = await helper.blogsInDb()
    expect(blogsAfterPost.length).toBe(blogsBeforePost.length + 1)
    expect(blogsAfterPost[blogsAfterPost.length - 1].title).toBe(newBlog.title)

  })

  test('undefined likes set to zero', async () => {
    const newBlog = {
      title: 'unliked blog',
      author: 'mv',
      url: 'full-stacks.org',
    }
    const response = await api.post('/api/blogs').send(newBlog)
    expect(response.body.likes).toBe(0)
  })

  test('new blog with missing title/url returns 400', async () => {
    const noUrlBlog = {
      title: 'no url',
    }
    const noTitleBlog = {
      url: 'no-title.fi'
    }
    let response = await api.post('/api/blogs').send(noUrlBlog)
    expect(response.statusCode).toBe(400)
    expect(response.body.error).toBeDefined()

    response = await api.post('/api/blogs').send(noTitleBlog)
    expect(response.statusCode).toBe(400)
    expect(response.body.error).toBeDefined()
  })
})

describe('delete from blog api', function () {

  beforeAll(async () => {
    await Blog.deleteMany({})
    for (const blog of helper.initialBlogs) {
      let blogObject = new Blog(blog)
      await blogObject.save()
    }
  })

  test('less blogs after delete', async () => {
    const blogsBeforeDelete = await helper.blogsInDb()
    const deleted_id = blogsBeforeDelete[0].id

    const response = await api.delete(`/api/blogs/${deleted_id}`)

    const blogsAfterDelete = await helper.blogsInDb()
    expect(blogsAfterDelete.length).toBe(blogsBeforeDelete.length - 1)
  })

  test('invalid id results in error', async () => {
    let response = await api.delete('/api/blogs/1234')

    expect(response.statusCode).toBe(400)
    expect(response.body.error).toBe('malformatted id')
  })

})

afterAll(() => {
  mongoose.connection.close()
})
