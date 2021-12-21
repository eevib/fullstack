const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  const body = request.body
  if(body.password.length < 3) {
    //    logger.error()
    response.status(400).json({ error: 'Password needs to be at least 3 characters long'}).end()
  } 
  if(body.username.length < 3) {
    //    logger.error('Username needs to be at least 3 characters long')
    response.status(400).json({ error: 'Username needs to be at least 3 characters long'}).end()
  }
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash
  })

  const savedUser = await user.save()
  response.json(savedUser)
})
usersRouter.get('/', async (requet, response) => {
  const users = await User
    .find({}).populate('blogs', { url: 1, title: 1, author: 1, id: 1 })
  response.json(users.map(user => user.toJSON()))
})

module.exports = usersRouter