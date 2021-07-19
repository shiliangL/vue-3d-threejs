/*
 * @Author: shiliangL
 * @Date: 2021-07-17 21:11:58
 * @LastEditTime: 2021-07-18 12:54:34
 * @LastEditors: Do not edit
 * @Description:
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
const files = require.context('@/views', true, /\.vue$/)

const pages = {}
files.keys().forEach(key => {
  pages[key.replace(/(\.\/|\.vue)/g, '')] = files(key).default
})

// 生成路由规则
const generator = []

Object.keys(pages).forEach(item => {
  generator.push({
    path: pages[item].name ? `/${pages[item].name.replace(/-/g, '/')}` : `/${item}`,
    name: item,
    title: pages[item].titleName,
    component: pages[item]
  })
})

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: generator.length ? generator[0].path : null
  },
  ...generator
]

const router = new VueRouter({
  routes
})
router.pages = generator
export default router
