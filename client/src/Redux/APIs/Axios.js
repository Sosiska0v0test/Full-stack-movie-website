import axios from 'axios';

const Axios = axios.create({
  baseURL: 'https://topolya-films-blsp.onrender.com/api/',
});

export default Axios;
