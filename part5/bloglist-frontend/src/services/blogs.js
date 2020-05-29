import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async newObj => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, newObj, config)
  return response.data
}

const createComment = async (newObj, blogId) => {
  const config = {
    headers: { Authorization: token }
  }
  console.log('config', config)
  const url = `${baseUrl}/${blogId}/comments`
  console.log('url', url)
  const response = await axios.post(url, newObj, config)
  console.log('service response', response)
  return response.data
}

const update = async newObj => {
  const config = {
    headers: { Authorization: token }
  }
  const { id } = newObj
  const url = `${baseUrl}/${id}`
  const response = await axios.put(url, newObj, config)
  return response.data
}

const remove = async (newObj) => {
  const config = {
    headers: { Authorization: token }
  }
  const { id } = newObj
  const url = `${baseUrl}/${id}`
  const response = await axios.delete(url, config)
  return response.data
}

export default { getAll, create, update, remove, setToken, createComment }