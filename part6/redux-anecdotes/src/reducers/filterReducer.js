// import { getState } from 'redux'

export const filter = (filter) => {
  return {
    type: 'FILTER_BY_TERM',
    filter,
  }
}

const filterReducer = (state = '', action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'FILTER_BY_TERM':
      return action.filter
    default: 
      return state
  }
}

export default filterReducer