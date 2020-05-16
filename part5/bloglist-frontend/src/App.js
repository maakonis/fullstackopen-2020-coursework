// Import packages
import React, { useState, useEffect } from 'react'
import _ from 'lodash'
// Import components
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
// Import services
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const [isError, setIsError] = useState(false)

  const blogFormRef = React.createRef()

  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await blogService.getAll()
      setBlogs(_.reverse(_.sortBy(response, ['likes'])))
    }
    fetchBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const putNotification = async (error, message) => {
    setIsError(error)
    setNotification(message)
    await setTimeout(() => setNotification(null), 3000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const newUser = await loginService.login({ username, password })
      setUser(newUser)
      window.localStorage
        .setItem('loggedUser', JSON.stringify(newUser))
      setPassword('')
      setUsername('')
    } catch (error) {
      console.log('login error', error)
      await putNotification(true, 'wrong username or password')
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.clear()
  }

  const addBlog = async (blogObj) => {
    blogFormRef.current.toggleVisibility()
    let blog = null
    try {
      blogService.setToken(user.token)
      blog = await blogService.create(blogObj)
    } catch (error) {
      await putNotification(true, 'could not add the blog...')
      return console.log('error', error)
    }
    setBlogs(blogs.concat(blog))
    return blog
  }

  const updateBlog = async (blogObj, likes) => {
    const newBlog = {
      ...blogObj,
      user: blogObj.user.id,
      likes,
    }

    let blog = null
    try {
      blogService.setToken(user.token)
      blog = await blogService.update(newBlog)
    } catch (error) {
      await putNotification(true, 'could update the blog...')
      return console.log('error', error)
    }
    const oldBlogIndex = blogs.findIndex((blog) => blog.id === newBlog.id)
    const updatedBlogList = [...blogs]
    updatedBlogList[oldBlogIndex] = blog
    setBlogs(_.reverse(_.sortBy(updatedBlogList, ['likes'])))
    return blog
  }

  const deleteBlog = async (blogObj) => {
    try {
      blogService.setToken(user.token)
      await blogService.remove(blogObj)
    } catch (error) {
      await putNotification(true, 'could not remove the blog')
      return console.log('error', error)
    }
    const updatedBlogs = _.remove(blogs, (blog) => {
      return blog.id !== blogObj.id
    })
    setBlogs(updatedBlogs)
  }

  if (user === null) {
    return (
      <div>
        <h2>Log into application</h2>
        <Notification message={notification} isError={isError} />
        <LoginForm
          username={username}
          password={password}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handleLogin={handleLogin}
        />
      </div>
    )
  }
  return (
    <div>
      <h2>Blogs</h2>
      <Notification message={notification} isError={isError} />
      <p>
        {user.name} logged in
        <button onClick={handleLogout}>Logout</button>
      </p>
      <Togglable buttonLabel="Create Blog" ref={blogFormRef}>
        <BlogForm
          createBlog={addBlog}
          putNotification={putNotification}
        />
      </Togglable>
      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          updateBlog={updateBlog}
          deleteBlog={deleteBlog}
        />
      )}
    </div>
  )
}

export default App