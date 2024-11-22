import axios from "axios";

const Api = axios.create({
    baseURL: 'http://localhost:8000/api/',
});

Api.interceptors.response.use(function (response) {
    return response.data;
}, function (error) {
    return Promise.reject(error);
});

export default Api;
