import axios from 'axios';

export default axios.create({
  // baseURL: `http://localhost:8000`,
  // baseURL: `http://157.230.49.128:8000`,
  baseURL: `http://${process.env.REACT_APP_API_URL}:8000`,
});
