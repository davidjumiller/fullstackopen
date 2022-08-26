const listHelper = require('../utils/list_helper')
const blogsExample = require('./data_examples/blogs_example')
const Blog = require('../models/blog')

test('of dummy stub', () => {
  const blogs = []
  expect(listHelper.dummy(blogs)).toBe(1)
})

describe('totalLikes', () => {
  const blog = new Blog({
    "title": "Title1",
    "author": "Author1",
    "url": "blogpostURLHERE",
    "likes": 3
  })
  const blogs = [ blog ]

  test('of one blog post', () => {
    expect(listHelper.totalLikes(blogs)).toBe(3)
  })
  test('of multiple blog posts', () => {
    expect(listHelper.totalLikes(blogsExample)).toBe(36)
  })
})

describe('favoriteBlog', () => {
  const blog = new Blog({
    "title": "Title1",
    "author": "Author1",
    "url": "blogpostURLHERE",
    "likes": 3
  })
  const blogs = [ blog ]

  test('of one blog post', () => {
    expect(listHelper.favoriteBlog(blogs)).toEqual(blog)
  })
  test('of multiple blog posts', () => {
    expect(listHelper.favoriteBlog(blogsExample)).toEqual(blogsExample[2])
  })
})

describe('mostBlogs', () => {
  const blog = new Blog({
    "title": "Title1",
    "author": "Author1",
    "url": "blogpostURLHERE",
    "likes": 3
  })
  const blogs = [ blog ]

  test('of one blog post', () => {
    expect(listHelper.mostBlogs(blogs)).toEqual({ author: "Author1", blogs: 1 })
  })
  test('of multiple blog posts', () => {
    expect(listHelper.mostBlogs(blogsExample)).toEqual({ author: "Robert C. Martin", blogs: 3})
  })
})

describe('mostLikes', () => {
  const blog = new Blog({
    "title": "Title1",
    "author": "Author1",
    "url": "blogpostURLHERE",
    "likes": 3
  })
  const blogs = [ blog ]

  test('of one blog post', () => {
    expect(listHelper.mostLikes(blogs)).toEqual({ author: "Author1", likes: 3 })
  })
  test('of multiple blog posts', () => {
    expect(listHelper.mostLikes(blogsExample)).toEqual({ author: "Edsger W. Dijkstra", likes: 17 })
  })
})