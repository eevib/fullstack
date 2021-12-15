/* eslint-disable no-undef */
const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const userExtractor = require('../utils/middleware').userExtractor


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 2, id: 3 })
  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', userExtractor, async (request, response) => {
  const body = request.body
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if(!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  } 
  const user = request.user
 
  if(!body.title || !body.url) {
    response.status(400).end
  }

  const blog = new Blog({
    title: body.title,
    url: body.url,
    author: body.author,
    likes: body.likes,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.json(savedBlog)
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const token = request.token
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if(!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  } 
  const blog = await Blog.findById(request.params.id)
  const user = request.user
  if(blog.user._id.toString() === user.id.toString()) {
    await Blog.findByIdAndRemove(blog._id)
    response.status(204).end()
  } else {
    response.status(401).json({ error: 'only creator of blog can delete it'})
  }
})

blogsRouter.put('/:id', async(request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    url: body.url,
    author: body.author,
    likes: body.likes
  }
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
  response.json(updatedBlog.toJSON())
})

module.exports = blogsRouter