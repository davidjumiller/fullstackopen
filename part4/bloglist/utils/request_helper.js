const jwt = require('jsonwebtoken')

const validBlog = (blog) => {
  return !blog.title || !blog.url ? false : true
}

const userExtractor = (request, response, next) => {
  let authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    authorization = authorization.substring(7)
    request.token = authorization
  }

  let decodedToken = null
  try {
    decodedToken = jwt.verify(request.token, process.env.SECRET)
  } catch {
    // Invalid token, handled in next block
  }
  if (decodedToken === null || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  request.user = decodedToken.id
  next()
}

module.exports = {
  validBlog,
  userExtractor
}