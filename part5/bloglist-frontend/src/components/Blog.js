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
    <div id={blog.id} style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={() => setVisible(!visible)}>{visible ? 'hide' : 'show'}</button>
      <div style={display} className="blogExtraInfo">
        <div>url: {blog.url}</div>
        <div>likes: <span className="blog-likes">{blog.likes}</span> <button onClick={handleVote} className="vote">Vote</button></div>
        <div>user: {blog.user.name}</div>
        <div><button onClick={async () => deleteBlog(blog)}>Delete</button></div>
      </div>
    </div>
  )

}

export default Blog
