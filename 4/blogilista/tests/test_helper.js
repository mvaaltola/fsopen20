const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'My very first test blog',
    author: 'Mikael',
    url: 'http://vaalto.la',
    likes: 123,
  },
  {
    title: 'another one',
    author: 'miglu',
    url: 'mvaaltola.org',
    likes: 101
  },
  {
    title: 'vim is my IDE',
    author: 'linus',
    url: 'foss.fi',
    likes: 9999,
  }
]


const blogsInDb = async() => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, blogsInDb
}
