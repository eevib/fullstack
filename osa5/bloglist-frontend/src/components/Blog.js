import { React, useState } from 'react'
import propTypes from 'prop-types'


const Blog = ({ blog, addLike, handleDelete, user }) => {

  const [view, setView] = useState(false)


  const handleView = () => {
    setView(!view)
  }
  const deleteBlog = async (event) => {
    event.preventDefault()
    handleDelete(blog, user)
  }

  const deleteBlogButton = () => {
    return user.username !== blog.user.username
      ? null
      : <div>
        <button id="deleteButton" onClick={deleteBlog}>delete</button>
      </div>
  }

  const handleLikes = async (event) => {
    event.preventDefault()
    const blogObject = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.auhtor,
      title: blog.title,
      url: blog.url,
      id: blog.id,
    }
    addLike(blogObject)
  }

  const blogStyle = {
    paddingTop: 1,
    paddingleft: 4,
    border: 'solid',
    marginBottom: 1
  }
  if(view) {
    return (
      <div id="blogView" style={blogStyle} className='allContent'>
        <p>{blog.title}<button onClick={handleView}>hide</button></p>
        <p>{blog.url}</p>
        <p>likes {blog.likes} <button id="likeButton" onClick={handleLikes}>like</button></p>
        <p>{blog.author}</p>
        <p>{blog.user.name}</p>
        { deleteBlogButton() }
      </div>
    )
  } else {
    return (
      <div style={blogStyle}>
        <p id="titleView">{blog.title} <button id="viewButton" onClick={handleView}>view</button></p>
      </div>
    )
  }

}
Blog.propTypes = {
  blog: propTypes.object.isRequired,
//  addLike: propTypes.func.isRequired,
  user: propTypes.object.isRequired,
//  handleDelete: propTypes.func.isRequired
}

export default Blog