const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
    .populate('user', { username: 1, name: 1 })
  return response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async (request, response) => {
  if (!(request.body.title && request.body.url)) {
    return response.status(400).json({ error: 'missing title/url' })
  }
  if (request.body.userId === undefined) {
    return response.status(400).json({ error: 'missing userId' })
  }
  if (request.body.likes === undefined) {request.body.likes = 0}

  const blog = new Blog(request.body)
  const user = await User.findById(request.body.userId)
  blog.user = user._id

  const result = await blog.save()
  user.blogs = user.blogs.concat(result._id)
  await user.save()

  response.status(201).json(result.toJSON())
})

blogsRouter.delete('/:id', async(request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async(request, response) => {
  const body = request.body
  let likes = 0
  if (body.likes !== undefined) { likes = body.likes }
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: likes
  }
  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id, blog, { new: true })
  response.json(updatedBlog)
})

module.exports = blogsRouter
