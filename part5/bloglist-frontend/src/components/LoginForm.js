import React, { useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { login, rememberUser } from '../reducers/loginReducer'
import { useField } from '../hooks/hooks'
import { setNotify, hideNotify } from '../reducers/notifyReducer'
import blogService from '../services/blogs'

const LoginForm = () => {
  const dispatch = useDispatch()
  const { reset: usernameReset, ...username } = useField('username')
  const { reset: passwordReset, ...password } = useField('password')

  useEffect(() => {
    console.log('LoginForm useEffect')
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      dispatch(rememberUser(loggedUser))
      blogService.setToken(loggedUser.token)
    }
  }, [dispatch])

  const handleLogin = (event) => {
    event.preventDefault()
    const credentials = {
      username: username.value,
      password: password.value,
    }
    dispatch(login(credentials)).catch((error) => {
      if (error.response.status === 401) {
        console.log('401 error', error.response)
        return dispatch(setNotify('wrong username or password', true))
      }
      return console.log('login error', error.response)
    })
    usernameReset()
    passwordReset()
    return dispatch(hideNotify())
  }

  return (
    <>
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>username</Form.Label>
          <Form.Control id="username" {...username} />
          <Form.Label>password</Form.Label>
          <Form.Control id="password" {...password} />
          <Button variant="primary" id="login-submit" type="submit">Login</Button>
        </Form.Group>
      </Form>
    </>
  )
}

export default LoginForm
