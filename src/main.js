/*
 * @Author: shiliangL
 * @Date: 2020-12-24 09:24:21
 * @LastEditTime: 2021-07-25 17:12:07
 * @LastEditors: Do not edit
 * @Description:
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 设置 js中可以访问 $cdn
import { $cdn } from '@/config'
Vue.prototype.$cdn = $cdn

// 全局引入按需引入UI库 vant
import '@/plugins/vant'
// 引入全局样式
import '@/assets/css/index.scss'
// 移动端适配
import 'lib-flexible/flexible.js'

// filters
import './filters'
Vue.config.productionTip = false

// 权限
import './permission'

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
