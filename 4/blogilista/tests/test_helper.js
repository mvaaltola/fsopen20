const Blog = require('../models/blog')
const User = require('../models/user')

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

const getUserId = async () => {
  const users = await usersInDb()
  return users[0].id
}

const initialBlogs = async () => {
  const userId = await getUserId()
  return [
    {
      title: 'My very first test blog',
      author: 'Mikael',
      url: 'http://vaalto.la',
      likes: 123,
      user: userId
    },
    {
      title: 'another one',
      author: 'miglu',
      url: 'mvaaltola.org',
      likes: 101,
      user: userId
    },
    {
      title: 'vim is my IDE',
      author: 'linus',
      url: 'foss.fi',
      likes: 9999,
      user: userId
    }
  ]
}


const blogsInDb = async() => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, blogsInDb, usersInDb, getUserId
}
