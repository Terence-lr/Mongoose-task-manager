const express = require('express')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

// Import routes
const taskRoutes = require('./routes/tasks')
const userRoutes = require('./routes/users')
const projectRoutes = require('./routes/projects')

const app = express()
const PORT = process.env.PORT || 3001 // Use port 3001 if no environment variable is set

// Middleware
app.use(bodyParser.json()) // Parse JSON request bodies
app.use(bodyParser.urlencoded({ extended: true })) // Parse form data
app.use(express.static('public')) // Serve static files (e.g., index.html, styles.css)
app.set('view engine', 'ejs') // Set EJS as the template engine

// Override methods for DELETE/PATCH in forms
app.use(methodOverride('_method'))

// Custom middleware to log requests
app.use((req, res, next) => {
  console.log(`${req.method} request to ${req.url}`)
  next()
})

// In-memory data for rendering the EJS views
let tasks = []
let users = []
let projects = []

// Home route to render EJS views
app.get('/', (req, res) => {
  res.render('index', { tasks, users, projects })
})

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
