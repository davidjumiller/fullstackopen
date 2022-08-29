const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.get('/', async (request, response, next) => {
  try {
    const users = await User.find({}).populate('blogs', { title: 1, author: 1, url: 1, id: 1 })
    response.json(users)
  } catch(exception) {
    next(exception)
  }
})

usersRouter.get('/:username', async (request, response, next) => {
  try {
    const username = request.params.username
    const user = await User.findOne({ username: username}).populate('blogs', { title: 1, author: 1, url: 1, id: 1 })
    if (!user) return response.status(404).end()
    response.json(user)
  } catch(exception) {
    next(exception)
  }
})

usersRouter.post('/', async (request, response, next) => {
    const { username, name, password } = request.body

    // Validation checking
    if (username.length < 3) 
      return response.status(400).json({ error: 'username must be longer than 2 characters' })
    if (password.length < 3) 
      return response.status(400).json({ error: 'password must be longer than 2 characters' })
    const usernameExists = await User.findOne({ username: username })
    if (usernameExists) return response.status(400).json({ error: 'username must be unique' })
  
    // Hashing password
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
      username,
      name,
      passwordHash,
    })

  try {
    const savedUser = await user.save()
    response.status(201).json(savedUser)
  } catch(exception) {
    next(exception)
  }
})

module.exports = usersRouter