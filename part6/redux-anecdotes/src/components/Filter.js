import React from 'react'
import { filter } from '../reducers/filterReducer'
import { connect } from 'react-redux'

const Filter = (props) => {
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter 
      <input 
      onChange={(e) => props.filter(e.target.value)} 
      />
    </div>
  )
}

export default connect(
  null,
  { filter }
)(Filter)