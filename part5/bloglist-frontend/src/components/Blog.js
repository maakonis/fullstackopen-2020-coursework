import React from 'react'
const Blog = ({ blog, updateBlog, deleteBlog }) => {
  const [visible, setVisible] = React.useState(false)
  const display = { display: visible ? '' : 'none' }
  const blogStyle = {
    paddingTop: 10, paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleVote = async () => {
    await updateBlog(blog, blog.likes + 1 )
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={() => setVisible(!visible)}>{visible ? 'hide' : 'show'}</button>
      <div style={display}>
        <div>url: {blog.url}</div>
        <div>likes: {blog.likes} <button onClick={handleVote}>Vote</button></div>
        <div>user: {blog.user.name}</div>
        <div><button onClick={async () => deleteBlog(blog)}>Delete</button></div>
      </div>
    </div>
  )

}

export default Blog
