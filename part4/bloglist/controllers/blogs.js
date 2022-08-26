const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const { validBlog } = require('../utils/validation_helper')

blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate('user')
    response.json(blogs)
  } catch(exception) {
    next(exception)
  }
})

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body
  if (!validBlog(body)) return response.status(400).end()

  // Find user that created this blog
  const user = await User.findOne({})

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user? user._id : null
  })

  try {
    // Save blog to db
    const savedBlog = await blog.save()
    // Save blog id to user.blogs array
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
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