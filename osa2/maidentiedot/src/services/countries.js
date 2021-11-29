import axios from 'axios'
const baseUrl =  'https://restcountries.com/v2/all'

const getAll = () => {
  return axios.get(baseUrl)
}

const create = newObject => {
  return axios.post(baseUrl, newObject)
}

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
}
export default { 
    getAll, create, update
}