import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { upvoteBlog, deleteBlog, addComment } from '../reducers/blogReducer'
import { setNotify } from '../reducers/notifyReducer'
import { useField } from '../hooks/hooks'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { reset: commentReset, ...comment } = useField('comment')

  const handleSubmit = (event) => {
    event.preventDefault()
    const newComment = {
      content: comment.value,
    }
    console.log('handlesubmit newcomment', newComment)
    dispatch(addComment(newComment, blog))
    commentReset()
  }

  if (!blog) {
    return null
  }

  const handleVote = () => {
    dispatch(upvoteBlog(blog))
      .catch((error) => console.log('blog vote error:', error.response))
  }

  const handleDelete = async () => {
    try {
      await dispatch(deleteBlog(blog))
      dispatch(setNotify('blog deleted', false))
      return history.push('/')
    } catch (error) {
      if (error.response.status === 401) {
        return dispatch(setNotify('user not authorized to delete blog', true))
      }
      return console.log('login error', error.response)
    }
  }

  return (
    <div>
      <h1>
        {blog.title}
        {' '}
        {blog.author}
      </h1>
      <div className="blogExtraInfo">
        <div><a href={blog.url}>{blog.url}</a></div>
        <div>
          likes:
          {' '}
          <span className="blog-likes">{blog.likes}</span>
          <button onClick={handleVote} className="vote" type="submit">Vote</button>
        </div>
        <div>
          added by
          {blog.user.name}
        </div>
        <div><button onClick={handleDelete} type="submit">Delete</button></div>
      </div>
      <h3>Comments</h3>
      <form onSubmit={handleSubmit}>
        <input {...comment} />
        <button type="submit">Upload</button>
      </form>
      <ul>
        {blog.comments.map((obj) => <li key={obj.id}>{obj.content}</li>)}
      </ul>
    </div>
  )
}

export default Blog
