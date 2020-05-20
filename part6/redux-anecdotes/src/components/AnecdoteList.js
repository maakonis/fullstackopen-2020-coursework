import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Anecdote from './Anecdote'
import { initializeAnecdotes } from '../reducers/anecdoteReducer';

const Anecdotes = (props) => {
  const { initializeAnecdotes } = props
  
  useEffect(() => {
    initializeAnecdotes()
  }, [ initializeAnecdotes ] )

  return (
    <>
    <h2>AnecdoteList</h2>
    {props.anecdotes.map(anecdote =>
        <Anecdote 
          key={anecdote.id}
          anecdote={anecdote} 
        />
    )}
    </>
  )
}

const mapDispatchToProps = {
  initializeAnecdotes,
}

const mapStateToProps = (state) => {
  const anecdotes = state.anecdotes
    .filter((anecdote) => anecdote.content.includes(state.filter))
    .sort((a,b) => b.votes - a.votes)
  return { anecdotes }
}

const AnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Anecdotes)

export default AnecdoteList