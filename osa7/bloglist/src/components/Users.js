import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Users = () => {
  const users = useSelector(state => state.users)
  console.log('in users ' +  users.length)

  if(users === null) {
    return null
  }
  return (
    <div>
      <h2>Users</h2>
      <table>
        <tbody>
          <tr>
            <th> </th>
            <th><b>blogs created</b></th>
          </tr>
          {users.map(user =>
            <tr key={user.username}>
              <td><Link to={`/users/${user.id}`}> {user.username}</Link></td>
              <td>{user.blogs.length}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
export default Users
