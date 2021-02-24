
const dummy = (_) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => {
    return sum + blog.likes
  }
  return blogs.reduce(reducer, 0)

}

const favoriteBlog = (blogs) => {
  // inspired by https://stackoverflow.com/a/34087850
  return blogs.reduce(function(prev, current) {
    return (prev.likes > current.likes)
      ? { title: prev.title,
        author: prev.author,
        likes: prev.likes }
      : { title: current.title,
        author: current.author,
        likes: current.likes }
  }, {})
}

module.exports = {
  dummy,
  favoriteBlog,
  totalLikes
}
