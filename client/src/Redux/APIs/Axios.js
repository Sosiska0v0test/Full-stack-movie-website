import axios from 'axios'

const Axios = axios.create({
  baseURL: '/api',
})

export default Axios;
