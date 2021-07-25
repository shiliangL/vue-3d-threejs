/*
 * @Author: shiliangL
 * @Date: 2021-07-25 22:09:45
 * @LastEditTime: 2021-07-25 21:03:53
 * @LastEditors: Do not edit
 * @Description: 顶部下拉切换菜单
 */

const pages = {}
// 生成路由规则
const toggleMenuPage = []
const files = require.context('@/toggleMenuViews', true, /\index.vue$/)
files.keys().forEach(key => {
  pages[key.replace(/(\.\/|\.vue)/g, '')] = files(key).default
})

Object.keys(pages).forEach(item => {
  toggleMenuPage.push({
    name: item,
    meta: pages[item].meta,
    path: pages[item].name ? `/${pages[item].name.replace(/-/g, '/')}` : `/${item}`,
    title: pages[item].meta ? pages[item].meta.title : '页面TITLE',
    component: pages[item]
  })
})

export default toggleMenuPage
