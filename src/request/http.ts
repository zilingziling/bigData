import Vue from "vue"
import axios from "axios";
import qs from 'qs'
import notification from 'ant-design-vue/es/notification'
import user from "@/store/modules/user"
// 创建axios实例
let service: any = {};
if (process.env.NODE_ENV === "development") {
    service = axios.create({
        baseURL: "/bigdata", // api的base_url
        timeout: 50000 // 请求超时时间
    });
} else {
    // 生产环境下
    service = axios.create({
        baseURL: "/bigdata", // api的base_url
        timeout: 50000 // 请求超时时间
    });
}

// request拦截器 axios的一些配置

service.interceptors.request.use(
    (config: any) => {
        const token = user.state.token || Vue.ls.get('TOKEN');
        if (token) {
            if (!config.data) config.data = {};
            config.data["token"] = token;
        }
        config.data = qs.stringify(config.data, { arrayFormat: 'repeat' })
        return config;
    },
    (error: any) => {
        // Do something with request error
        // console.error("error:", error); // for debug
        Promise.reject(error);
    }
);

const err = (error: any) => {
    if (error.response) {
        const data = error.response.data
        if (error.response.status === 403) {
            notification.error({
                message: '禁止访问',
                key: 'notificationkey403',
                description: data.message
            })
        }
        if (error.response.status === 401) {
            notification.error({
                message: '未授权',
                key: 'notificationkey401',
                description: '访问未经授权，请联系管理员！'
            })
        }
        if (error.response.status === 404) {
            notification.error({
                message: '提示',
                key: 'notificationkey404',
                description: '页面为找到'
            })
        }
        if (error.response.status === 500) {
            notification.error({
                message: '错误',
                key: 'notificationkey500',
                description: '服务器错误，请联系管理员!'
            })
        }
    }
    return Promise.reject(error)
}
// respone拦截器 axios的一些配置
service.interceptors.response.use(
    (response: any) => {
        if (response.data.code != 0 && response.data.code != 2) {
            notification.info({
                message: '提示',
                key: 'notificationkey',
                description: response.data.msg
            })
        }
        if (response.data.code == 404) {

        }
        if (response.data.code == 2) {
            if (response.config.url && response.config.url.indexOf("checkLogin") === -1) {
                notification.info({
                    message: '提示',
                    description: response.data.msg
                })
            }
        }
        return response.data
    },
    err
);

export default service;
