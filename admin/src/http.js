import axios from 'axios'
import router from './router.js'


const http = axios.create({
    baseURL: 'http://localhost:3000/'

})
//设置请求头
http.interceptors.request.use(function (config) {
    // Do something before request is sent
    if (sessionStorage.token) {
        config.headers.Authorization = 'Bearer ' + (sessionStorage.token || '')
    }

    return config;
}, (error) => {
    // Do something with request error
    return Promise.reject(error);
});

http.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    // Do something with response error
    // if (error.response.data.error) {
    //     // alert(error.response.data.error)
    // }
    if (error.response.status == 500) {
        router.push('/login')
    }
    return Promise.reject(error);
});

export default http