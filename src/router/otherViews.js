/*
 * @Author: shiliangL
 * @Date: 2021-07-25 22:09:45
 * @LastEditTime: 2021-07-25 21:02:37
 * @LastEditors: Do not edit
 * @Description: 其他路由页面 即不包含底部切换的页面
 */

const pages = {}
// 生成路由规则
const otherRoutes = []
const files = require.context('@/otherViews', true, /\index.vue$/)
files.keys().forEach(key => {
  pages[key.replace(/(\.\/|\.vue)/g, '')] = files(key).default
})

Object.keys(pages).forEach(item => {
  otherRoutes.push({
    name: item,
    meta: pages[item].meta,
    path: pages[item].name ? `/${pages[item].name.replace(/-/g, '/')}` : `/${item}`,
    title: pages[item].meta ? pages[item].meta.title : '页面TITLE',
    component: pages[item]
  })
})

export default otherRoutes
