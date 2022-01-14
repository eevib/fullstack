import React from 'react'
import { initialBlogs, like, remove } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { initialUsers } from '../reducers/usersReducer'



const Blog = ({ blog }) => {
  if(!blog) {
    return null
  }
  const dispatch = useDispatch()
  const history = useHistory()
  const user = useSelector(state => state.user)

  const handleLike = async () => {
    dispatch(like(blog))
    dispatch(setNotification(`Liked  ${blog.title}`))
  }
  const handleRemove = async (id) => {
    const ok = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    if (ok) {
      dispatch(remove(id))
      history.push('/')
      dispatch(setNotification(`blog ${blog.title} by ${blog.title} was removed`), 'error', 5)
      dispatch(initialBlogs)
      dispatch(initialUsers)
    }
  }

  const own= (user.username === blog.user.username )

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    marginBottom: 5
  }

  return (
    <div style={blogStyle} className='blog'>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <div>likes {blog.likes}
        <button onClick={() => handleLike(blog.id)}>like</button>
      </div>
      <div>added by {blog.user.name}</div>
      <div>{blog.user.name}</div>
      {own&&<button onClick={() => handleRemove(blog.id)}>remove</button>}
    </div>
  )
}

/* Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
}
*/

export default Blog