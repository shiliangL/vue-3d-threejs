/*
 * @Author: shiliangL
 * @Date: 2020-12-24 09:24:21
 * @LastEditTime: 2021-07-26 20:44:41
 * @LastEditors: Do not edit
 * @Description:
 */
import Vue from 'vue'
import Router from 'vue-router'
import layoutViews from './layoutViews'
import otherViews from './otherViews'
import toggleMenuViews from './toggleMenuViews'

// hack router push callback
const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

const routes = [
  {
    path: '/',
    redirect: '/home/index',
    component: () => import('@/layout/index'),
    children: [
      ...layoutViews,
      ...toggleMenuViews
    ]
  },
  ...otherViews
]

const createRouter = () =>
  new Router({
    // mode: 'history', // 如果你是 history模式 需要配置vue.config.js publicPath
    // base: process.env.BASE_URL,
    scrollBehavior: () => ({ y: 0 }),
    routes: routes
  })

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}
console.log(layoutViews, 'layoutViews')
console.log(otherViews, 'otherViews')
console.log(toggleMenuViews, '-toggleMenuViews-')
router.toggleMenuViews = toggleMenuViews
export default router
