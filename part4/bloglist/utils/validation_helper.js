const validBlog = (blog) => {
  return !blog.title || !blog.url ? false : true
}

module.exports = {
  validBlog
}