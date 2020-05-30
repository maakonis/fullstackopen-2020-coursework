import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = React.forwardRef((props, ref) => {
  Togglable.displayName = 'Togglable'
  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }
  const hideWhenVisible = { display: visible ? 'none' : '' }

  Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => ({
    toggleVisibility,
  }))

  return (
    <>
      <div style={hideWhenVisible}>
        <button
          type="submit"
          onClick={toggleVisibility}
        >
          {props.buttonLabel}
        </button>
      </div>
      <div id="toggled-content" style={showWhenVisible}>
        {props.children}
        <button
          type="submit"
          onClick={toggleVisibility}
        >
          Cancel
        </button>
      </div>
    </>
  )
})

export default Togglable
