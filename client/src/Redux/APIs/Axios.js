import axios from 'axios';

const Axios = axios.create({
  baseURL: 'https://catalog-furniture.onrender.com/api/',
});

export default Axios;
