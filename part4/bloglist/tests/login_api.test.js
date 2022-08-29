const mongoose = require('mongoose')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const { app, server } = require('../index')
const supertest = require('supertest')

const api = supertest(app)

describe('POST /api/login', () => {
  beforeEach(async () => {
    User.deleteMany({})
    const password = 'passwordtest'
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = {
      username: 'test',
      name: 'test',
      passwordHash: hashedPassword
    }
    const user = new User(newUser)
    await user.save()
  })
  test('if password is correct, status 200', async () => {
    const newUser = {
      username: 'test',
      name: 'test',
      password: 'passwordtest'
    }
    await api.post('/api/login').send(newUser).expect(200)
  })
  test('if password is incorrect, status 401', async () => {
    const newUser = {
      username: 'test',
      name: 'test',
      password: 'wrongPassword'
    }
    await api.post('/api/login').send(newUser).expect(401)
  })
  test('proper return value, with token', async () => {
    const newUser = {
      username: 'test',
      name: 'test',
      password: 'passwordtest'
    }
    const response = await api
      .post('/api/login')
      .send(newUser)
      .expect(200)

    const body = response.body
    expect(body).toBeTruthy()
    expect(body.token).toBeTruthy()
    expect(body.username).toBe(newUser.username)
    expect(body.name).toBe(newUser.name)
  })
})

afterAll(async () => {
  await User.deleteMany({})
  mongoose.connection.close()
  server.close()
})