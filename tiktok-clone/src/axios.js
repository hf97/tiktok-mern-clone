import axios from 'axios';

const instance = axios.create({
    baseURL: "https://tiktok-clone-backend-1.herokuapp.com/",
    // baseURL: "http://localhost:9000",
});

export default instance;
