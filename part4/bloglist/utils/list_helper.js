const lodash = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((prevValue, currValue) => prevValue + currValue.likes, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((prevValue, currValue) => currValue.likes > prevValue.likes? currValue : prevValue)
}

const mostBlogs = (blogs) => {
  const groupByAuthor = (blog) => blog.author
  const blogsByAuthor = lodash.groupBy(blogs, groupByAuthor)

  let authorBlogCounts = []
  lodash.forOwn(blogsByAuthor, (blogList, author) => {
    const count = blogList.length
    const newAuthorCountObj = { 
      author: author, 
      blogs: count 
    }
    authorBlogCounts.push(newAuthorCountObj)
  })

  return authorBlogCounts.reduce((prevValue, currValue) => currValue.blogs > prevValue.blogs? currValue : prevValue)
}

const mostLikes = (blogs) => {
  const groupByAuthor = (blog) => blog.author
  const blogsByAuthor = lodash.groupBy(blogs, groupByAuthor)

  let authorLikeCounts = []
  lodash.forOwn(blogsByAuthor, (blogList, author) => {
    const count = blogList.reduce((prevValue, currValue) => prevValue + currValue.likes, 0)
    const newAuthorCountObj = { 
      author: author, 
      likes: count 
    }
    authorLikeCounts.push(newAuthorCountObj)
  })
  
  return authorLikeCounts.reduce((prevValue, currValue) => currValue.likes > prevValue.likes? currValue : prevValue)
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}