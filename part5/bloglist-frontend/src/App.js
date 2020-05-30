// Import packages
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  Switch, Route,
  useRouteMatch,
} from 'react-router-dom'
// Import components
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import BlogList from './components/BlogList'
import UserSummary from './components/UserSummary'
import UserInfo from './components/UserInfo'
import Blog from './components/Blog'
import Menu from './components/Menu'

import { initializeBlogs } from './reducers/blogReducer'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((store) => store.user)

  const allUsers = useSelector((store) => store.blogs
    .reduce((result, blog) => {
      if (!result.find((obj) => obj.id === blog.user.id)) {
        result.push(blog.user)
      }
      return result
    }, []))

  const blogs = useSelector((store) => store.blogs)

  useEffect(() => {
    if (user !== null) {
      dispatch(initializeBlogs())
    }
  }, [user])

  const blogFormRef = React.createRef()

  const userMatch = useRouteMatch('/users/:id')

  const oneUser = userMatch
    ? allUsers
      .find((obj) => obj.id === userMatch.params.id)
    : null

  const blogMatch = useRouteMatch('/blogs/:id')

  const oneBlog = blogMatch
    ? blogs.find((blog) => blog.id === blogMatch.params.id)
    : null


  return (
    <div className="container">
      { user === null
        ? (
          <div>
            <h2>Log into application</h2>
            <Notification />
            <LoginForm />
          </div>
        )
        : (
          <div>
            <Menu />
            <Notification />
            <h2>Blogs App</h2>
            <Switch>
              <Route path="/users/:id">
                <UserInfo user={oneUser} />
              </Route>
              <Route path="/blogs/:id">
                <Blog blog={oneBlog} />
              </Route>
              <Route path="/users">
                <UserSummary />
              </Route>
              <Route path="/">
                <div>
                  <Togglable buttonLabel="Create Blog" ref={blogFormRef}>
                    <BlogForm />
                  </Togglable>
                  <BlogList />
                </div>
              </Route>
            </Switch>
          </div>
        )}
    </div>
  )
}

export default App
