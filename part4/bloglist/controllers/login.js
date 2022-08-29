const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config

const loginRouter = require('express').Router()

loginRouter.post('/', async (request, response, next) => {
  const { username, password } = request.body

  const user = await User.findOne({ username })
  const credentialsCorrect = user === null? false : await bcrypt.compare(password, user.passwordHash)

  if (!credentialsCorrect) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  }

  const token = jwt.sign(userForToken, process.env.SECRET)
  const bearerToken = 'bearer ' + token
  
  response.status(200).send({ token: bearerToken, username: user.username, name: user.name })
})

module.exports = loginRouter