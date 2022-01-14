import blogService from '../services/blogs'

const blogReducer = (state=[], action) => {
  switch(action.type) {
  case 'INIT':
    return sort(action.data)
  case 'NEW_BLOG': {
    return sort([...state, action.data.blog ])
  }
  case 'LIKE':{
    const id = action.data.id
    const blog = state.find(b => b.id === id)
    return sort(state.map(b => b.id === id ?  { ...blog, likes: blog.likes + 1 } : b))
  }
  case 'REMOVE':
    return sort(state.filter(b => b.id !== action.data))
  default: return state
  }
}

export const initialBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT',
      data: blogs
    })
  }
}
export const createNew = (blog, user) => {
  return async dispatch => {
    const newBlog = await blogService.create(blog)
    const addedBlog = { ...newBlog, user: user }
    dispatch({
      type: 'NEW_BLOG',
      data: {
        blog: addedBlog
      }
    })
    return addedBlog
  }
}

export const like = (blog) => {
  return async dispatch => {
    const likedBlog = { ...blog, likes: blog.likes + 1, user: blog.user.id }
    await blogService.update(likedBlog)
    dispatch({
      type: 'LIKE',
      data: {
        id: blog.id
      }
    })
  }
}
export const remove = (id) => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch({
      type: 'REMOVE',
      data: id
    })
  }
}
const sort = (blogs) => {
  return blogs.sort((b1, b2) => b2.likes - b1.likes)
}


export default blogReducer