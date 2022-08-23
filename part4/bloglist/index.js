const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

const { MONGODB_URI, PORT } = require('./utils/config')
const blogsRouter = require('./controllers/blogs')
const { builtinModules } = require('module')

mongoose.connect(MONGODB_URI)

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogsRouter)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

module.exports = app