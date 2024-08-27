import axios from 'axios';

export default axios.create({
  // baseURL: `http://localhost:8000`,
  baseURL: `http://159.89.91.160:8000`,
  // baseURL: `http://${process.env.AXIOS_URL}:8000`,
});
