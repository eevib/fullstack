import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Togglable from './Togglable'
import NewBlog from './NewBlog'
import { Link } from 'react-router-dom'
import { initialBlogs } from '../reducers/blogReducer'

const Blogs = ({ createBlog, blogFormRef }) => {
  const dispatch = useDispatch()
  dispatch(initialBlogs)
  const blogs = useSelector(state => state.blogs)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    marginBottom: 5,
    border: 'ridge',
  }
  return(
    <div>
      <Togglable buttonLabel='create new blog'  ref={blogFormRef}>
        <NewBlog createBlog={createBlog} />
      </Togglable>
      {blogs.map(blog =>
        <p style={blogStyle} className='blogs' key={blog.id}>
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </p>
      )}
    </div>
  )
}
export default Blogs
