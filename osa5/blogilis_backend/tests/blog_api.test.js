/* eslint-disable no-undef */
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)
const Blog = require('../models/blog')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

describe('when there is initially some blogs saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  })
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })
  test('identifier is named id', async () => {
    const response = await api.get('/api/blogs')
    const id = response.body.map(blog => blog.id)
    expect(id).toBeDefined()
  })

})
describe('addition of a new blog', () => {

  let token = ''

  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
    await User.deleteMany({})
        
    const saltRounds = 10
    const passwordHash = await bcrypt.hash('test', saltRounds)
    const testuser = new User ({
      username: 'tester',
      password: passwordHash
    })
    await testuser.save()

    const loginUser = {
      username: 'tester',
      password: 'test',
      id: testuser._id,
    }
    token = jwt.sign(loginUser, process.env.SECRET)
  })

  test('a valid blog can be added', async () => {

    const newBlog = {
      title: 'Pelkkä Blogi',
      author: 'Eija',
      url: 'https://pelkkablogi.wordpress.com/',
      likes: 5,
    }
    await api
      .post('/api/blogs')
      .set({ Authorization: `bearer ${token}` })
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    
    const titles = blogsAtEnd.map(r => r.title)
        
    expect(titles).toContain('Pelkkä Blogi')
  })
  test('if no likes are given, put to 0', async () => {
    const newBlog = {
      title: 'New Blog',
      author: 'Writer',
      url: 'https://newBlog.wordpress.com/'
    }
    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(200)
        
    const blogsAtEnd = await helper.blogsInDb() 
    const addedBlog = blogsAtEnd.find(blog => blog.title === `${newBlog.title}`)
    expect(addedBlog.likes).toBe(0)
    
  })
  test('a blog without url is not added', async () => {
    const newBlog = {
      title: 'New Blog',
      author: 'Writer',
    }
    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(400)
  })
  test('a blog without title is not added and response is 400', async () => {
    const newBlog = {
      author: 'Writer',
      url: 'https://newblog.com'
    }
    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(400)
  })
  test('blog without a token is not added, returns status 401', async () => {
    const newBlog = {
      title: 'New Blog',
      author: 'Writer',
      url: 'https://newBlog.wordpress.com/'
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
  })
  test('blog with unvalid token is not added, returns status 401', async () => {
    const newBlog = {
      title: 'New Blog',
      author: 'Writer',
      url: 'https://newBlog.wordpress.com/'
    }
    await api
      .post('/api/blogs')
      .set('Authorization', 'bearer unvalidToken')
      .send(newBlog)
      .expect(401)
  })
})

describe('deletion of a blog', () => {
  let token = ''

  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
    await User.deleteMany({})
        
    const saltRounds = 10
    const passwordHash = await bcrypt.hash('test', saltRounds)
    const testuser = new User ({
      username: 'tester',
      password: passwordHash
    })
    await testuser.save()

    const loginUser = {
      username: 'tester',
      password: 'test',
      id: testuser._id,
    }
    token = jwt.sign(loginUser, process.env.SECRET)

    const blogToDelete  = new Blog ({
      title: 'Blog that will be deleted',
      author: 'Writer',
      url: 'https://newBlogtoDelete.wordpress.com/',
      user: testuser._id
    })
    await blogToDelete.save()

  })
    
  test('delete removes blog with valid id', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[6]
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `bearer ${token}`)
      .expect(204)
    
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(
      blogsAtStart.length -1)
    
    const blogs = blogsAtEnd.map(b => b.title)
    expect(blogs).not.toContain(blogToDelete.title)
  })
})

describe('updating a blog', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  })
  test('update to likes with valid id uppdates blog likes', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    
    const updatedBlog = {
      title: blogToUpdate.title,
      author: blogToUpdate.author,
      likes: blogToUpdate.likes + 5,
      url: blogToUpdate.url
    }
    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(200)
    
    const blogsAtEnd = await helper.blogsInDb()
    const blog = blogsAtEnd.find(b=> b.title === `${blogToUpdate.title}`)
            
    expect(blog.likes).toBe(blogToUpdate.likes + 5)
  })
})
describe('creating a user', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('secret', 10)
    const user = new User({username: 'root', passwordHash})
    await user.save()
  })
  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()
    const user = {
      username: 'Username',
      name: 'Viivi',
      password: 'secret',
    }
    await api
      .post('/api/users')
      .send(user)
      .expect(200)
      .expect('Content-Type', /application\/json/)
        
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(user.username)
  })  
  test('too short password is not allowed', async () => {
    const user = {
      username: 'Newuser',
      name: 'name',
      password: 'se',
    }
    await api
      .post('/api/users')
      .send(user)
      .expect(400)
  })  
  test('user with too short username is not created', async () => {
    const newUser = {
      username: 'aa',
      name: 'userWithTooShortUserName',
      password: 'veryStrong',
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
  })
  test('creation fails with proper statuscode and message if username is already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'AgainRoot',
      password: 'secret',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

    
afterAll(() => {
  mongoose.connection.close()
})