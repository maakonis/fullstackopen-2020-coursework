import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const UserStats = () => {
  const userData = useSelector(store => {
    const users = store.blogs
      .reduce((result, blog) => {
        const { name, id } = blog.user
        result[name] = {
          count: result[name] ? result[name].count + 1 : 1,
          id,
          name,
        }
        return result
      }, {})
    return Object.entries(users).map((entry) => entry[1])
  }
  )

  console.log('userData', userData)

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <td></td>
            <td><strong>blogs created</strong></td>
          </tr>
        </thead>
        <tbody>
          {userData.map((user) => {
            return (
              <tr key={user.id}>
                <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
                <td>{user.count}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default UserStats
