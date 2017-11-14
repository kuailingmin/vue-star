import axios from 'axios'
import router from '../router/index.js'

var axiosObejct = axios.create({
    timeout: 30000,
    responseType: 'json'
})
// http request 拦截器
axiosObejct.interceptors.request.use((config) => {
    let token = localStorage.getItem('token')
    config.headers = (
        Object.assign(
            (config.headers ? config.headers : {}), {
                'Authorization': 'Bearer ' + token
            })
    )
    // 打印请求路径
    return config;
}, (err) => {
  
})

// http response 拦截器
axiosObejct.interceptors.response.use(
    (resp) => {
        var headers = resp.headers
        switch (resp.status) {
            case 200:
                let code = resp.data.code
                let msg = resp.data.message
                if (code === 4001) {
                    //store.commit(LOGOUT)
                } else if (code === 10000) {
                    router.replace('/login')
                } else if (code !== 0) {}
                return resp.data
            case 400:
                return Promise.reject('error') // 返回接口返回的错误信息
            case 401:
                // 返回 401 清除token信息并跳转到登录页面
                window.location.href = '';
                break
            case 404:
                return Promise.reject('error') // 返回接口返回的错误信息
            default:
                return Promise.reject('error') // 返回接口返回的错误信息
        }
    },
    (error) => {
        switch (error.response.status) {
            case 401:
                 window.location.href = '';
                break;
            default:
                return Promise.reject('error')
        }
        return Promise.reject(error) // 返回接口返回的错误信息
    })


export default function api(_config) {
    return axiosObejct(_config)
}