const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const { validBlog } = require('../utils/validation_helper')

blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({})
    response.json(blogs)
  } catch(exception) {
    next(exception)
  }
})

blogsRouter.post('/', async (request, response, next) => {
  const blog = new Blog(request.body)

  if (!validBlog(blog)) return response.status(400).end()

  try {
    const result = await blog.save()
    response.status(201).json(result)
  } catch(exception) {
    next(exception)
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  try {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(200).end()
  } catch(exception) {
    response.status(404).end()
  }
})

blogsRouter.patch('/:id', async (request, response, next) => {
  const id = request.params.id
  const update = request.body
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(id, update, { returnDocument: 'after' })
    response.status(200).send(updatedBlog)
  } catch(exception) {
    next(exception)
  }
})

module.exports = blogsRouter