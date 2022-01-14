import React from 'react'

const User = ({ blogUser }) => {
  if(!blogUser) {
    return null
  }

  return (
    <div>
      <h2>{blogUser.name}</h2>
      <h3>added blogs</h3>
      {blogUser.blogs.map(b => <li key={b.id}>{b.title}</li>)}
    </div>
  )
}
export default User
