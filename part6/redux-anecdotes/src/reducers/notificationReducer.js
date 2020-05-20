const initialState = null;

export const showNotify = notification => {
  return {
    type: 'SHOW_NOTIFY',
    notification
  }
}

export const hideNotify = () => {
  return {
    type: 'HIDE_NOTIFY',
  }
}

let timeout
export const setNotification = (notification, time) => {
  return async dispatch => {
    dispatch(showNotify(notification))
    clearTimeout(timeout)
    timeout = setTimeout(() => dispatch(hideNotify()), time*1000)
  }
}

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SHOW_NOTIFY':
      return action.notification
    case 'HIDE_NOTIFY':
      return null
    default:
      return state
  }
}

export default notificationReducer