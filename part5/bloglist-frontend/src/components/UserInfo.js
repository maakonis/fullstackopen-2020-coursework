import React from 'react'
import { useSelector } from 'react-redux'

const UserInfo = ({ user }) => {
  const blogList = useSelector(store => store.blogs
    .filter((blog) => blog.user.id === user.id)
  )
  console.log('blogList', blogList)
  if (!user) {
    return null
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <h3><strong>blogs added</strong></h3>
      <ul>
        {blogList.map((blog) => {
          return <li key={blog.id}>{blog.title}</li>
        })}
      </ul>
    </div>
  )
}

export default UserInfo