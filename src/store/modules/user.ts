import Vue from 'vue'
import { Login } from '@/request/user'
import router from "@/router"

const user = {
    state: {
        token: '',
        name: '',
        welcome: '',
        avatar: '',
        roles: [],
        info: {},
    },

    mutations: {
        SET_INFO: (state: any, info: any) => {
            state.info = info
        },
        SET_TOKEN: (state: any, info: any) => {
            state.token = info
        },
    },

    actions: {
        // 登录
        Login({ commit }: any, userInfo: any) {
            return new Promise((resolve, reject) => {
                Login(userInfo).then(response => {
                    Vue.ls.set('USER_INFO', response.data);
                    Vue.ls.set('TOKEN', response.data.token);
                    commit('SET_INFO', response.data);
                    commit('SET_TOKEN', response.data.token || response);
                    resolve(response || response)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        // 登出
        Logout({ commit, ssoUser }: any) {
            return new Promise((resolve, reject) => {
                if (user) {
                    Vue.ls.set('USER_INFO', '');
                    Vue.ls.set('TOKEN', '');
                    commit('SET_INFO', {});
                    commit('SET_TOKEN', '');
                    router.replace({ name: "login" })
                } else {
                    resolve({ code: 0 })
                }
            })
        },

    }
}

export default user
