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
            name="Username"
            type="text"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          password
          <input
            name="Password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </>
  )
}

export default LoginForm
