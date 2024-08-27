import axios from 'axios';

export default axios.create({
  // baseURL: `http://localhost:8000`,
  baseURL: `http://157.230.49.128:8000`,
  // baseURL: `http://${process.env.AXIOS_URL}:8000`,
});
