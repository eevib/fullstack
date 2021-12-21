import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Message from './components/Message'
import ErrorMessage from './components/ErrorMessage'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
      setUsername('')
      setPassword('')
    }
  }
  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }
  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    try {
      const newBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat({ ...newBlog, user: { username: user.username } }))
      setMessage(`a new blog ${newBlog.title} by ${newBlog.author} added`)
      setTimeout(() => {
        setMessage(null)
      }, 3000)

    } catch (error) {
      setErrorMessage(`${error}`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }

  }

  const addLike = async (blogObject) => {
    try {
      const updatedBlog = await blogService.update(blogObject, blogObject.id)
      blogService
        .getAll()
      setBlogs(
        blogs.map(b => (b.id !== updatedBlog.id ? b : updatedBlog))
      )
      setMessage(`Added like for blog ${blogObject.title} `)
      setTimeout(() => {
        setMessage(null)
      }, 3000)
      console.log()
    } catch (exception) {
      console.log('exception')
    }

  }
  const handleDelete = async (blog) => {
    if(window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        await blogService.deleteBlog(blog.id)
        blogService
          .getAll()
        setBlogs(
          blogs.filter(b => b.id !== blog.id ? b : null)
        )
        setMessage(`Deleted blog ${blog.title} `)
        setTimeout(() => {
          setMessage(null)
        }, 3000)
      } catch (exception) {
        setErrorMessage(`${exception.message}`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
      }
    }
  }
  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
          username
        <input
          id="username"
          type="text" value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
          password
        <input
          id="password"
          type="password" value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )
  const blogForm = () => (
    <Togglable buttonLabel = "create blog" ref={blogFormRef}>
      <BlogForm createBlog={addBlog} user={user}/>
    </Togglable>
  )

  const sortBlogsByLikes = () => {
    blogs.sort((a,b) => b.likes - a.likes)
  }


  if(user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <ErrorMessage errorMessage={errorMessage}/>
        { loginForm() }
      </div>
    )
  }
  return (
    <div>
      <h2>blogs</h2>
      <Message message={message}/>
      <p>{user.name} logged in</p>
      <button onClick={handleLogout}>logout</button>
      <div>
        { blogForm() }
        { sortBlogsByLikes() }
      </div>
      <div>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} addLike={addLike} user={user} handleDelete={handleDelete} />
        )}
      </div>
    </div>
  )
}

export default App