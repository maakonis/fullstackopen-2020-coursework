import React from 'react'
import { useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote }) => {
  const dispatch = useDispatch()

  const makeVote = (anecdote) => {
    dispatch(vote(anecdote));
    const notification = `you have voted for ${anecdote.content}`
    dispatch(setNotification(notification, 3))
  }

  return (
    <div id={anecdote.id}>
    <div>
      {anecdote.content}
    </div>
    <div>
      has {anecdote.votes}
      <button onClick={() => makeVote(anecdote)}>Vote</button>
    </div>
  </div>
  )
}

export default Anecdote