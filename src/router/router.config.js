/*
 * @Author: shiliangL
 * @Date: 2020-12-24 09:24:21
 * @LastEditTime: 2021-07-24 23:42:25
 * @LastEditors: Do not edit
 * @Description:
 */
/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/',
    component: () => import('@/views/layouts/index'),
    redirect: '/home',
    meta: {
      title: '首页',
      keepAlive: false
    },
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/home/index'),
        meta: { title: '首页', keepAlive: false }
      },
      {
        path: '/about',
        name: 'About',
        component: () => import('@/views/home/about'),
        meta: { title: '关于我', keepAlive: false, wxAuth: true }
      }
    ]
  },
  {
    path: '/registe',
    component: () => import('@/views/registe/index'),
    meta: {
      title: '用户注册',
      keepAlive: false
    }
  }
]
