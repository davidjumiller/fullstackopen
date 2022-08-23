const validBlog = (blog) => {
  console.log(blog)
  if ((!blog.title) || (!blog.url)) {
    console.log('validBlog: false')
    return false
  } else {
    console.log('validBlog: true')
    return true
  }
}

module.exports = {
  validBlog
}