/*
 * @Author: shiliangL
 * @Date: 2020-12-24 09:24:21
 * @LastEditTime: 2021-07-28 10:29:49
 * @LastEditors: Do not edit
 * @Description:
 */

import 'normalize.css/normalize.css'
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

// eslint-disable-next-line no-unused-vars
function loadJScript() {
  const script = document.createElement('script')
  script.type = 'text/javascript'
  script.src = '//api.map.baidu.com/api?type=webgl&v=1.0&ak=FaK2CGZxsxgQOuOXmfQlKTyuT6CPnAX5&callback=init'
  document.body.appendChild(script)
}
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

window.onload = loadJScript // 异步加载地图
