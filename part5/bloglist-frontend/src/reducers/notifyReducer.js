const showNotify = (message, error) => {
  return {
    type: 'SHOW_NOTIFY',
    data: { message, error }
  }
}

export const hideNotify = () => {
  return {
    type: 'HIDE_NOTIFY',
  }
}

let timeout
export const setNotify = (message, error) => {
  return dispatch => {
    dispatch(showNotify(message, error))
    clearTimeout(timeout)
    timeout = setTimeout(() => dispatch(hideNotify()), 5000)
  }
}

const reducer = (state = null, action) => {
  switch (action.type) {
  case 'SHOW_NOTIFY':
    return action.data
  case 'HIDE_NOTIFY':
    return null
  default:
    return state
  }
}

export default reducer