export default {
    production: process.env.NODE_ENV === 'production' && process.env.VUE_APP_PREVIEW !== 'true',
    // vue-ls options
    version: '1.5.0',
    storageOptions: {
        namespace: 'vuejs__', // key prefix
        name: 'ls', // name variable Vue.[ls] or this.[$ls],
        storage: 'session' // storage name session, local, memory
    },
    axiosConfig: {
        baseURL: '/bigdata', // /base base_url
        timeout: 30000, // 请求超时时间,
        header: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    }
}