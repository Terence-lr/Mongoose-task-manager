const mongoose = require('mongoose')
require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const taskRoutes = require('./routes/tasks')
const userRoutes = require('./routes/users')
const projectRoutes = require('./routes/projects')

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(methodOverride('_method'))

// Connect to MongoDB with Mongoose
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB with Mongoose'))
  .catch((err) => console.error('Database connection error:', err))

// Routes
app.use('/tasks', taskRoutes)
app.use('/users', userRoutes)
app.use('/projects', projectRoutes)

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).render('error', { message: 'Something went wrong!' })
})

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
