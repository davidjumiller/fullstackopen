const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../index')
const Blog = require('../models/blog')
const blogsExample = require('./blogs_example')

const api = supertest(app)

describe('GET /api/blogs', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    for (let blog of blogsExample) {
      blog = new Blog(blog)
      await blog.save()
    }
  }, 15000)

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  
  test('get example blogs count is 6', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(6)
  })
  
  test('blog contains an id property', async () => {
    const response = await api.get('/api/blogs')
    const blogs = response.body
    for (const blog of blogs) {
      expect(blog["id"]).toBeDefined()
    }
  })
})

describe('POST /api/blogs', () => {
  test('blogs length increases', async () => {
    let response = await api.get('/api/blogs')
    const initialBlogs = response.body

    const newBlog = {
      title: "New Blog",
      author: "New Author",
      url: "https://example.com/",
      likes: 15,
    }
    await api.post('/api/blogs').send(newBlog)

    response = await api.get('/api/blogs')
    const modifiedBlogs = response.body
    expect(modifiedBlogs.length).toBe(initialBlogs.length+1)
  })

  test('likes count defaults to 0 if missing', async () => {
    const newBlog = new Blog({
      title: "New Blog",
      author: "New Author",
      url: "https://example.com/"
    })
    expect(newBlog.likes).toBe(0)
  })

  test('returns 400 bad request when title and url are missing', async () => {
    const newBlog = {
      author: "New Author"
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })
})

afterAll(async () => {
  await Blog.deleteMany({})
  mongoose.connection.close()
})