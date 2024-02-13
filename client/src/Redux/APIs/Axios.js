import axios from 'axios'

const Axios = axios.create({
  baseURL: 'https://main--topolya.netlify.app',
})

export default Axios;
