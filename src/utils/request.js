import axios from 'axios';

console.log('现在的环境是' + process.env.ENV);
let baseURL = process.env.VUE_APP_BASE_API;
console.log(baseURL);

// 创建axios实例
const service = axios.create({
    // axios中请求配置有baseURL选项，表示请求URL公共部分
    baseURL: baseURL,
    // 超时
    timeout: 30000,
    // // 禁用 Cookie 等信息
    // withCredentials: false,
});

// request拦截器
service.interceptors.request.use(config => {
    // 避免跨域
    // config.headers["Content-Type"] = "application/json";
    // config.headers['Access-Control-Allow-Origin'] = "*";
    // get请求映射params参数
    if (config.method === 'get' && config.params) {
        let url = config.url + '?';
        for (const propName of Object.keys(config.params)) {
            const value = config.params[propName];
            const part = encodeURIComponent(propName) + '='
            if (value !== null && typeof (value) !== "undefined") {
                if (typeof value === 'object') {
                    for (const key of Object.keys(value)) {
                        let params = propName + '[' + key + ']';
                        const subPart = encodeURIComponent(params) + '='
                        url += subPart + encodeURIComponent(value[key]) + "&";
                    }
                } else {
                    url += part + encodeURIComponent(value) + "&";
                }
            }
        }
        url = url.slice(0, -1);
        config.params = {};
        config.url = url;
    }
    return config
}, error => {
    console.log(error)
    Promise.reject(error)
})

export default service;
