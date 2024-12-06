const express = require('express')
const { v4: uuidv4 } = require('uuid')
const router = express.Router()

let users = []

// GET /users - Fetch all users
router.get('/', (req, res) => {
  res.json(users)
})

// POST /users - Add a new user
router.post('/', (req, res) => {
  const newUser = {
    id: uuidv4(),
    name: req.body.name,
    email: req.body.email,
  }
  users.push(newUser)
  res.status(201).json(newUser)
})

// PATCH /users/:id - Update a user
router.patch('/:id', (req, res) => {
  const user = users.find((user) => user.id === req.params.id)
  if (!user) return res.status(404).json({ message: 'User not found' })

  if (req.body.name) user.name = req.body.name
  if (req.body.email) user.email = req.body.email

  res.json(user)
})

// DELETE /users/:id - Delete a user
router.delete('/:id', (req, res) => {
  const index = users.findIndex((user) => user.id === req.params.id)
  if (index === -1) return res.status(404).json({ message: 'User not found' })

  const deletedUser = users.splice(index, 1)
  res.json(deletedUser[0])
})

module.exports = router
