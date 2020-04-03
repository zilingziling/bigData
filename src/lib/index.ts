import { Vue } from "vue-property-decorator"
// import '@/mock/mock'
import VueStorage from 'vue-ls'
import Config from './../config/config'
import 'ant-design-vue/dist/antd.css'
import '@/assets/style/reset.css'
import '@/assets/style/global.scss';
import './ant'
import '@/utils/flashEvent'
import utils from './../utils/utils'
import echarts from "echarts";
import scroll from 'vue-seamless-scroll'
// import VueCircle from 'vue2-circle-progress'
Vue.use(scroll)
Vue.use(VueStorage, Config.storageOptions)
Vue.prototype.$echarts = echarts;
Vue.prototype.$utils = utils;
