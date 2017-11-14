import axios from 'axios'
import log from '../utils/log.js'
import router from '../router/index.js'
import Toast from '../utils/Toast.js'

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
    log.log('请求地址:' + config.url)

    // 打印请求查询参数
    if (config.params) {
        log.log('查询参数:' + this.$qs.stringify(config.params))
    }

    // 打印post请求体
    if (config.method === 'post') {
        if (config.data) {
            log.log(config.data)
            log.log('请求体body:' + config.data)
        }
    }
    //config.withCredentials = true
    return config;
}, (err) => {
    log.log('请求出错:\n')
    log.log(err)
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
                    Toast.error(msg)
                } else if (code === 10000) {
                    router.replace('/login')
                    Toast.error(msg)
                } else if (code !== 0) {
                    Toast.error(msg)
                }
                return resp.data
            case 400:
                log.log('无效请求：\n')
                log.log('开发者提醒：出现400错误一般是因为缺少参数、参数错误、或者参数类型错误等。\n解决方案：\n1、对照参数列表保证参数的一致性；\n2、检查参数类型是否正确；\n3、请求前使用qs的stringfy方法将对象转化为字符串；\n4、确认是否存在跨域请求，如果是跨域请求请求服务端配合解决；5、需要在header里面传的参数放在body里面')
                return Promise.reject('error') // 返回接口返回的错误信息
            case 401:
                // 返回 401 清除token信息并跳转到登录页面
                window.location.href = '';
                break
            case 404:
                log.log('404访问的地址不存在')
                return Promise.reject('error') // 返回接口返回的错误信息
            default:
                log.log('出错了：\n')
                log.log(resp)
                return Promise.reject('error') // 返回接口返回的错误信息
        }
    },
    (error) => {
        switch (error.response.status) {
            case 401:
                 window.location.href = '';
                break;
            default:
                log.log('出错了：\n')
                log.log(error)
                return Promise.reject('error')
        }
        return Promise.reject(error) // 返回接口返回的错误信息
    })


export default function api(_config) {
    return axiosObejct(_config)
}