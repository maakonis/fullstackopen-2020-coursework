import React from 'react'
import { useDispatch } from 'react-redux'
import { useField } from '../hooks/hooks'
import { addBlog } from '../reducers/blogReducer'
import { setNotify } from '../reducers/notifyReducer'

const BlogForm = () => {
  const dispatch = useDispatch()

  const { reset: clearTitle, ...title } = useField('title')
  const { reset: clearAuthor, ...author } = useField('author')
  const { reset: clearUrl, ...url } = useField('url')

  const handleBlogSubmit = (event) => {
    event.preventDefault()
    const newBlog = {
      title: title.value,
      author: author.value,
      url: url.value
    }
    dispatch(addBlog(newBlog))
      .catch(error => console.log('blog post error', error.message))
    dispatch(setNotify(`Blog ${newBlog.title} by ${newBlog.author} added!`))
    clearTitle()
    clearAuthor()
    clearUrl()
  }

  return (
    <form onSubmit={handleBlogSubmit} id="blog-form">
      <p>title:
        <input { ...title } name="title"/>
      </p>
      <p>author:
        <input { ...author } name="author"/>
      </p>
      <p>url:
        <input { ...url } type="source" name="url" />
        <button type="submit">Upload</button>
      </p>
    </form>
  )
}

export default BlogForm
