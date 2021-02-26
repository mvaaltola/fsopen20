const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')
const testUsers = require('./user_api.test')

describe('get from blog api', ()  => {

  beforeEach(async () => {
    await testUsers.addTestUser()

    await Blog.deleteMany({})
    const initialBlogs = await helper.initialBlogs()
    for (const blog of initialBlogs) {
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
    const initialBlogs = await helper.initialBlogs()
    expect(response.body).toHaveLength(initialBlogs.length)
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
    await testUsers.addTestUser()

    await Blog.deleteMany({})
    const initialBlogs = await helper.initialBlogs()
    for (const blog of initialBlogs) {
      let blogObject = new Blog(blog)
      await blogObject.save()
    }
  })

  test('new blog is added', async () => {
    const newBlog = {
      title: 'new blog from test',
      author: 'mv',
      url: 'full-stacks.org',
      likes: 11,
      userId: await helper.getUserId()
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
      userId: await helper.getUserId()
    }
    const response = await api.post('/api/blogs').send(newBlog)
    expect(response.body.likes).toBe(0)
  })

  test('new blog with missing title/url returns error', async () => {
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

  test('new blog with missing userId returns error', async () => {
    const newBlog = {
      title: 'new blog from test without creator',
      author: 'mv',
      url: 'full-stacks.org',
      likes: 11,
    }
    let response = await api.post('/api/blogs').send(newBlog)
    expect(response.statusCode).toBe(400)
    expect(response.body.error).toBeDefined()
  })
})

describe('deletes from blog api', function () {

  beforeAll(async () => {
    await Blog.deleteMany({})
    const initialBlogs = await helper.initialBlogs()
    for (const blog of initialBlogs) {
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

describe('update blogs', function () {

  beforeEach(async () => {
    await Blog.deleteMany({})
    const initialBlogs = await helper.initialBlogs()
    for (const blog of initialBlogs) {
      let blogObject = new Blog(blog)
      await blogObject.save()
    }
  })

  test('blog is updated after put', async function () {
    const blogsBeforePut = await helper.blogsInDb()
    const originalBlog = blogsBeforePut[0]
    const updatedBlog = originalBlog
    updatedBlog.title = 'new and improved blog title from test'
    updatedBlog.author = 'new author as well'
    updatedBlog.likes = 1337

    const response = await api.put(`/api/blogs/${originalBlog.id}`).send(updatedBlog)
    expect(response.type).toBe('application/json')
    expect(response.statusCode).toBe(200)
    expect(response.body.title).toBe(updatedBlog.title)
    expect(response.body.author).toBe(updatedBlog.author)
    expect(response.body.url).toBe(originalBlog.url)
    expect(response.body.likes).toBe(originalBlog.likes)

    const blogsAfterPut = await helper.blogsInDb()
    expect(blogsAfterPut.length).toBe(blogsBeforePut.length)
    expect(blogsAfterPut[0].id).toBe(blogsBeforePut[0].id)
    expect(blogsAfterPut[0].title).toBe(updatedBlog.title)
    expect(blogsAfterPut[0].author).toBe(updatedBlog.author)
    expect(blogsAfterPut[0].likes).toBe(updatedBlog.likes)
    expect(blogsAfterPut[0].url).toBe(originalBlog.url)
  })

  test('likes set to 0 if undefined in put', async function () {
    const blogsBeforePut = await helper.blogsInDb()
    const blog = blogsBeforePut[0]
    delete blog.likes

    const response = await api.put(`/api/blogs/${blog.id}`).send(blog)
    expect(response.statusCode).toBe(200)
    expect(response.body.likes).toBe(0)

  })

})

afterAll(() => {
  mongoose.connection.close()
})
