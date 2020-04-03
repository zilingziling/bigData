import { Vue } from 'vue-property-decorator'
import Main from './layout/main.vue'
import router from '@/router'
import store from '@/store'
import '@/lib'
import '@/request/http'
import '@/router/permission'
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(Main)
}).$mount('#app')
