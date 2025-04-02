import axios from "axios";
import VueRouter from "vue-router";
import { VueAxios } from "./axios";
import { getStore, clearAll } from "./storage";
import { Message,MessageBox } from "element-ui";
// 创建 axios 实例
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API, // api base_url
    timeout: 100000, // 请求超时时间
});
const err = (error) => {
    if (error.response) {
        switch (error.response.status) {
            case 403:
                break;
            case 500:
                Message.error(`${error.response.status}错误，请检查后端服务!`)
                break;
            case 404:
                Message.error(`${error.response.status}错误，接口无效!`)
                break;
            case 504:
                break;
            case 401:
                break;
            default:
                break;
        }
    }
    return Promise.reject(error);
};
// 请求拦截器
service.interceptors.request.use(
    (config) => {
        let token = getStore("token");
        if (token) {
            config.headers["Authorization"] = token;
        }
        if (config.method == "get") {
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
// 响应拦截器
service.interceptors.response.use((response) => {
    let { code,msg } = response.data;
    switch (code) {
        case 401:
            MessageBox.confirm('登陆状态失效，即将返回登录页，是否继续?','提示',{
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                clearAll();
                window.location.replace('/login');
              })
            break;
        case 500:
            Message.error(msg)
            break;
        default:
            break;
    }
    return response.data;
}, err);

const installer = {
    vm: {},
    install(Vue, router = {}) {
        Vue.use(VueAxios, router, service);
    },
};
export { installer as VueAxios, service as axios };
