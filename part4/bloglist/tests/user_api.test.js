const mongoose = require('mongoose')
const User = require('../models/user')
const { app, server } = require('../index')
const supertest = require('supertest')
const usersExample = require('./data_examples/users_example')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
})

describe('GET /api/users', () => {
  beforeEach(async () => {
    for (let user of usersExample) {
      user = new User(user)
      await user.save()
    }
  })

  test('returns the correct number of users', async () => {
    const response = await api.get('/api/users')
    expect(response.body.length).toBe(2)
  })

  test('returns empty list when no users in database', async () => {
    await User.deleteMany({})
    const response = await api.get('/api/users')
    expect(response.body.length).toBe(0)
  })
})

describe('GET /api/users/:username', () => {
  beforeEach(async () => {
    for (let user of usersExample) {
      user = new User(user)
      await user.save()
    }
  })

  test('returns public information of user that exists', async () => {
    const username = 'testusername1'
    const response = await api.get(`/api/users/${username}`).expect(200)
    expect(response.body.username).toBe(username)
  })

  test('returns error when username does not exist', async () => {
    const username = 'nonexistantuser'
    const response = await api.get(`/api/users/${username}`).expect(404)
  })
})

describe('POST /api/users', () => {
  const newUser = {
    username: 'testusername',
    name: 'test',
    password: 'Password',
  }

  test('user number increases by one', async () => {
    const initialLength = (await User.find({})).length

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)

    const newLength = (await User.find({})).length
    expect(newLength).toBe(initialLength+1)
  })

  test('username is correct', async () => {
    let username = newUser.username
    let usernameExists = await User.findOne({ username: username })
    expect(usernameExists).toBeFalsy()

    await api.post('/api/users').send(newUser).expect(201)
    usernameExists = await User.findOne({ username: username })
    expect(usernameExists).toBeTruthy()
  })

  test('user is not created with duplicate username', async () => {
    await api.post('/api/users').send(newUser).expect(201)
    await api.post('/api/users').send(newUser).expect(400)
  })

  test('error if username is under 3 characters long', async () => {
    const invalidUser = {
      username: 'te',
      name: 'test',
      password: 'Password',
    }
    const response = await api
      .post('/api/users')
      .send(invalidUser)
      .expect(400)
    expect(response.body.error).toBe('username must be longer than 2 characters')
  })

  test('error if password is under 3 characters long', async () => {
    const invalidUser = {
      username: 'testusername',
      name: 'test',
      password: 'Pa',
    }
    const response = await api
      .post('/api/users')
      .send(invalidUser)
      .expect(400)
    expect(response.body.error).toBe('password must be longer than 2 characters')
  })
})

afterAll(async () => {
  await User.deleteMany({})
  mongoose.connection.close()
  server.close()
})