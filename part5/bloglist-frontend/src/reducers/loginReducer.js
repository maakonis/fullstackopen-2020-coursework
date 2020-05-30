import loginService from '../services/login'
import blogService from '../services/blogs'

export const login = (credentials) => async (dispatch) => {
  const user = await loginService.login(credentials)
  blogService.setToken(user.token)
  console.log('user.token', user.token)
  window.localStorage
    .setItem('loggedUser', JSON.stringify(user))
  dispatch({
    type: 'LOGIN',
    data: user,
  })
}

export const rememberUser = (user) => (dispatch) => {
  dispatch({
    type: 'REMEMBER',
    data: user,
  })
}

export const logout = () => (dispatch) => {
  dispatch({
    type: 'LOGOUT',
    data: null,
  })
}

const reducer = (state = null, action) => {
  switch (action.type) {
  case 'LOGIN':
    return action.data
  case 'REMEMBER':
    return action.data
  case 'LOGOUT':
    return action.data
  default:
    return state
  }
}

export default reducer
