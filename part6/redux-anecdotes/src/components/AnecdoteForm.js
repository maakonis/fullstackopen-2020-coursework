import React from 'react'
import { connect } from 'react-redux'
import { add } from '../reducers/anecdoteReducer'

const AnecdoteForm = (props) => {

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.add(content)
  }
  
  return (
    <>
    <h3>Create New:</h3>
    <form onSubmit={addAnecdote}>
      <div><input name="anecdote" /></div>
      <button type="submit">create</button>
    </form>
    </>
  )
}

export default connect(
  null,
  { add }
)(AnecdoteForm)