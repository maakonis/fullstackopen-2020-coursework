import React, { useState } from 'react'

const BlogForm = ({ createBlog, putNotification }) => {
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: '',
  })

  const handleBlogChange = (event) => {
    const { target } = event
    const name = target.name
    const value = target.value
    setNewBlog({ ...newBlog, [name]: value })
  }

  const handleBlogSubmit = async (event) => {
    event.preventDefault()
    await createBlog(newBlog)
    await putNotification(
      false,
      `Blog ${newBlog.title} by ${newBlog.author} has been added.`
    )
    setNewBlog({ title: '', author: '', url: '' })
  }

  return (
    <form onSubmit={handleBlogSubmit}>
      <p>title:
        <input
          type="text"
          name="title"
          value={newBlog.title}
          onChange={handleBlogChange}
        />
      </p>
      <p>author:
        <input
          type="text"
          name="author"
          value={newBlog.author}
          onChange={handleBlogChange}
        />
      </p>
      <p>url:
        <input
          type="text"
          name="url"
          value={newBlog.url}
          onChange={handleBlogChange}
        />
        <button type="submit">Upload</button>
      </p>
    </form>
  )
}



export default BlogForm