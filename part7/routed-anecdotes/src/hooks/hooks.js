import { useState } from 'react'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const reset = () => {
    setValue('')
  }

  const onChange = (event) => {
    setValue(event.target.value)
  }

  console.log('value', type, value)
  return {
    reset,
    type,
    value,
    onChange,
  }
}