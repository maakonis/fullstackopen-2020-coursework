import anecdoteService from '../services/anecdotes'

export const vote = (anecdote) => {
  return async dispatch => {
    const newObj = await anecdoteService
      .update({ ...anecdote, votes: anecdote.votes + 1})
    dispatch({
      type: 'VOTE',
      data: { ...newObj }
    })
  }
}
 
export const add = (content) => {
  return async dispatch => {
    const newObj = await anecdoteService.create(content)
    dispatch({
      type: 'ADD',
      data: { ...newObj}
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'VOTE':
      const id = action.data.id
      const anecdote = state
        .find((obj) => obj.id === id)
      anecdote.votes += 1
      return state
        .map((obj) => obj.id !== id ? obj : anecdote)
    case 'ADD':
      return state.concat(action.data)
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
  }
}

export default reducer