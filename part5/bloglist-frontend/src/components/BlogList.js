import React from 'react'
import Table from 'react-bootstrap/Table'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const BlogList = () => {
  const blogs = useSelector(state => state.blogs
    .sort((a,b) => b.likes - a.likes))

  const blogStyle = {
    paddingTop: 10, paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (

    <Table striped>
      <tbody>
        {blogs.map(blog => {
          return (
            <tr key={blog.id}>
              <td>
                <Link
                  to={`/blogs/${blog.id}`}>
                  {blog.title} by {blog.author}
                </Link>
              </td>
            </tr>
          )
        })}

      </tbody>

    </Table>

  )
}

export default BlogList