/*
 * @Author: shiliangL
 * @Date: 2021-07-25 22:09:45
 * @LastEditTime: 2021-07-25 22:11:25
 * @LastEditors: Do not edit
 * @Description:
 */

const pages = {}
// 生成路由规则
const layoutRoutes = []
const files = require.context('@/views', true, /\.vue$/)
files.keys().forEach(key => {
  pages[key.replace(/(\.\/|\.vue)/g, '')] = files(key).default
})

Object.keys(pages).forEach(item => {
  layoutRoutes.push({
    name: item,
    meta: pages[item].meta,
    path: pages[item].name ? `/${pages[item].name.replace(/-/g, '/')}` : `/${item}`,
    title: pages[item].meta ? pages[item].meta.title : '页面TITLE',
    component: pages[item]
  })
})

export default layoutRoutes
