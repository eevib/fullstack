import React, { useState, useEffect, useRef } from 'react'
import { Switch, Route, Link, useRouteMatch } from 'react-router-dom'

import { setNotification } from './reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import { getUser, login, logout } from './reducers/userReducer'
import { initialBlogs, createNew } from './reducers/blogReducer'
import { initialUsers } from './reducers/usersReducer'

import Notification from './components/Notification'
import Users from './components/Users'
import Blogs from './components/Blogs'
import Blog from './components/Blog'
import User from './components/User'


const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const user = useSelector(state => state.user)
  const users = useSelector(state => state.users)
  const blogs = useSelector(state => state.blogs)

  const blogFormRef = useRef()

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initialBlogs())
  }, [])

  useEffect(() => {
    dispatch(getUser())
  }, [dispatch])

  useEffect(() => {
    dispatch(() => {
      dispatch(initialUsers())
    })
  }, [dispatch])

  const notifyWith = (message, style='success', time=5) => {
    dispatch(setNotification(message, style, time))
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const loggedInUser = await dispatch(login(username, password))
      setUsername('')
      setPassword('')
      notifyWith(`${loggedInUser.name} welcome back!`)
    } catch(exception) {
      notifyWith('wrong username/password', 'error')
    }
  }

  const createBlog = async (blog) => {
    try {
      const newBlog = await dispatch(createNew(blog, user))
      blogFormRef.current.toggleVisibility()
      notifyWith(`a new blog '${newBlog.title}' by ${newBlog.author} added!`)
    } catch(exception) {
      console.log(exception)
      notifyWith(`could not add ${blog.title} because ${exception}`, 'error')

    }
  }
  const handleLogout = () => {
    dispatch(logout())
  }
  const matchUser = useRouteMatch('/users/:id')
  const blogUser = matchUser
    ? users.find(u => u.id === matchUser.params.id)
    : null

  const matchBlog = useRouteMatch('/blogs/:id')
  const matchedBlog = matchBlog
    ? blogs.find(b => b.id === matchBlog.params.id)
    : null

  const Menu = () => {
    const padding = {
      padding: 5
    }
    return(
      <div>
        <Link style={padding} to='/'>Blogs</Link>
        <Link style={padding} to='/users'>Users</Link>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </div>
    )
  }
  if ( !user || user.username === '') {
    return (
      <div>
        <h2>login to application</h2>

        <Notification />

        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              id='username'
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              id='password'
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id='login'>login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <Menu/>
      <div>
        <h2>blogs</h2>
        <Notification />
        <Switch>
          <Route path='/users/:id'>
            <User blogUser={blogUser}/>
          </Route>
          <Route path='/users'>
            <Users />
          </Route>
          <Route path='/blogs/:id'>
            <Blog blog={matchedBlog} />
          </Route>
          <Route path='/'>
            <Blogs createBlog={createBlog} blogFormRef={blogFormRef}/>
          </Route>
        </Switch>
      </div>
    </div>
  )

}
export default App
