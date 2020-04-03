import Vue from 'vue'
import Vuex from 'vuex'
import globalStore from './modules/global'
import user from './modules/user'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    globalStore,
    user
  },
  getters: {
    BrowserUpdate: (state: any) => state.globalStore.browser,
  }
})
