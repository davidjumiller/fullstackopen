const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const { validBlog, userExtractor } = require('../utils/request_helper')
require('dotenv').config()

blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1})
    response.json(blogs)
  } catch(exception) {
    next(exception)
  }
})

blogsRouter.post('/', userExtractor, async (request, response, next) => {
  const body = request.body
  console.log(request.user)
  const loggedInUser = await User.findById(request.user)

  if (!validBlog(body)) return response.status(400).end()

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: loggedInUser? loggedInUser._id : null
  })

  try {
    // Save blog to db
    const savedBlog = await blog.save()
    // Save blog id to user.blogs array
    if (loggedInUser) {
      loggedInUser.blogs = loggedInUser.blogs.concat(savedBlog._id)
      await loggedInUser.save()
    }
    response.status(201).json(savedBlog)
  } catch(exception) {
    next(exception)
  }
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const loggedInUserId = request.user

  try {
    const blog = await Blog.findById(request.params.id)
    if (blog.user.toString() !== loggedInUserId.toString()) return response.status(401).end()
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