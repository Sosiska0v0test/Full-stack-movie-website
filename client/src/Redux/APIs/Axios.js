import axios from 'axios'

const Axios = axios.create({
  baseURL: 'https://main--topolya.netlify.app//api',
})

export default Axios;
