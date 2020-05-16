import React from 'react'

const LoginForm = ({
  username,
  password,
  handlePasswordChange,
  handleUsernameChange,
  handleLogin
}) => {
  return (
    <>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            id="username"
            name="Username"
            type="text"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          password
          <input
            id="password"
            name="Password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button id="login-submit" type="submit">Login</button>
      </form>
    </>
  )
}

export default LoginForm
