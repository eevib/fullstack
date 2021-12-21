import React, { useState } from 'react'
import propTypes from 'prop-types'

const BlogForm = ({ createBlog, user }) => {
  const [newUrl, setUrl] = useState('')
  const [newTitle, setTitle] = useState('')
  const [newAuthor, setAuthor] = useState('')

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }
  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }
  const addBlog = async (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      user: user._id
    })
    setAuthor('')
    setTitle('')
    setUrl('')
  }

  return (
    <div>
      <h2>add new</h2>
      <form onSubmit={addBlog}>
        <div>
            title
          <input
            id='title'
            value={newTitle} onChange={handleTitleChange}/>
        </div>
        <div>
            author
          <input
            id='author'
            value={newAuthor} onChange={handleAuthorChange}/>
        </div>
        <div>
            url
          <input
            id='url'
            value={newUrl} onChange={handleUrlChange}/>
        </div>
        <button id="createButton" type="submit">create</button>
      </form>
    </div>
  )
}
BlogForm.propTypes = {
  createBlog: propTypes.func.isRequired,
  user: propTypes.object.isRequired
}
export default BlogForm

