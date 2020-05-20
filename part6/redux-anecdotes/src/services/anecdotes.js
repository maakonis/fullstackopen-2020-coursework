import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const update = async (anecdote) => {
  console.log('anecdote', anecdote)
 const url = `${baseUrl}/${anecdote.id}`
 const response = await axios.put(url, anecdote)
 return response.data
}

const create = async (anecdote) => {
  const object = { content: anecdote, votes: 0, id: getId() }
  const response = await axios.post(baseUrl, object)
  return response.data
}

export default { getAll, update, create }