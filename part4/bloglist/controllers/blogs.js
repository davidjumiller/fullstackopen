const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const { validBlog } = require('../utils/validation_helper')

blogsRouter.get('/', async (request, response) => {
  try {
    const blogs = await Blog.find({})
    response.json(blogs)
  } catch(exception) {
    next(exception)
  }
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  if (!validBlog(blog)) return response.status(400).end()

  try {
    const result = await blog.save()
    response.status(201).json(result)
  } catch(exception) {
    next(exception)
  }
})

module.exports = blogsRouter