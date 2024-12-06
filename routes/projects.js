const express = require('express')
const { v4: uuidv4 } = require('uuid')
const router = express.Router()

let projects = []

// GET /projects - Fetch all projects
router.get('/', (req, res) => {
  res.json(projects)
})

// POST /projects - Add a new project
router.post('/', (req, res) => {
  const newProject = {
    id: uuidv4(),
    name: req.body.name,
    description: req.body.description,
  }
  projects.push(newProject)
  res.status(201).json(newProject)
})

// PATCH /projects/:id - Update a project
router.patch('/:id', (req, res) => {
  const project = projects.find((project) => project.id === req.params.id)
  if (!project) return res.status(404).json({ message: 'Project not found' })

  if (req.body.name) project.name = req.body.name
  if (req.body.description) project.description = req.body.description

  res.json(project)
})

// DELETE /projects/:id - Delete a project
router.delete('/:id', (req, res) => {
  const index = projects.findIndex((project) => project.id === req.params.id)
  if (index === -1)
    return res.status(404).json({ message: 'Project not found' })

  const deletedProject = projects.splice(index, 1)
  res.json(deletedProject[0])
})

module.exports = router
