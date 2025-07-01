import axios from 'axios';

const axiosInstance = axios.create({
<<<<<<< HEAD:src/Api/axios.js
  baseURL: 'http://localhost:8000'
=======
  // baseURL: 'http://localhost:8000'
  baseURL: 'https://amazon-clone-backend-8pmh.onrender.com/',
>>>>>>> 7feb7ccc9a1f9003d8f26f08d9f2e4058e9aabf3:client/src/Api/axios.js
});

export { axiosInstance };