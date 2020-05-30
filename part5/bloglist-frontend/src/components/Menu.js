import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Navbar, Nav, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import LoginForm from './LoginForm'
import { logout } from '../reducers/loginReducer'
import { resetBlog } from '../reducers/blogReducer'

const Menu = () => {
  const user = useSelector((store) => store.user)
  const dispatch = useDispatch()

  const padding = {
    paddingRight: 5,
  }

  const handleLogout = () => {
    dispatch(logout())
    dispatch(resetBlog())
    window.localStorage.clear()
  }

  if (user === null) {
    return <LoginForm />
  }

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#" as="span">
            <Link style={padding} to="/">blogs</Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <Link style={padding} to="/users">users</Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <em>
              {user.name}
              {' '}
              logged in
            </em>
            <Button onClick={handleLogout}>Logout</Button>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Menu
