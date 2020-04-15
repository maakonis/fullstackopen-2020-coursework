import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = (newObj) => {
    const request = axios.post(baseUrl, newObj)
    return request.then(response => response.data)
}

const remove = (objId) => axios.delete(`${baseUrl}/${objId}`)

const update = (objId, newObject) => {
    const request = axios.put(`${baseUrl}/${objId}`, newObject)
    return request.then(response => response.data)
}

export default { getAll, create, remove, update }