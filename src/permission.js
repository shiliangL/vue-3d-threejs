/*
 * @Author: shiliangL
 * @Date: 2020-06-08 11:45:03
 * @LastEditTime: 2021-07-25 21:40:58
 * @LastEditors: Do not edit
 * @Description:
 * @FilePath: /baoan-wui/src/permission.js
 */
import router from './router'
// import store from './store'
import { getToken, setToken, setKeyValue } from '@/utils/auth' // get token from cookie

router.beforeEach(async(to, from, next) => {
  // console.log(window.location.href, 'window.location.href')
  // console.log(to)
  // set page title
  // determine whether the user has logged in
  const hasToken = getToken()
  if (hasToken) {
    next()
  } else {
    // 白名单无需授权页面
    if (!to.meta.wxAuth) {
      next()
    } else {
      // 没有登录 微信授权页面
      // other pages that do not have permission to access are redirected to the login page.
      if (!window.location.href.includes('code')) {
        auth(to.path)
      } else {
        const code = getCode('code')
        setKeyValue('wx_url_code', code)
        loginByCode(code).then((res) => {
          // 模拟登录成功
          console.log(code, '----code----')
          next()
          setToken('shiliang_dev_token')
          window.location.href = window.location.origin + `/#${to.path}`
        }).catch(e => {
          // 登录失败去注册
          next('/registe')
          // window.location.href = window.location.origin + `/#${to.path}`
        })
      }
    }
  }
})

// 微信网页授权
export function auth(path) {
  const appid = 'wx1f67f77de0c04cce'
  const origin = window.location.origin
  const redirecUrl = encodeURIComponent(origin + '/#' + path)
  const scope = 'snsapi_base'// 'snsapi_userinfo'
  const params = `?appid=${appid}&redirect_uri=${redirecUrl}&response_type=code&scope=${scope}&state=1#wechat_redirect`
  const wxurl = 'https://open.weixin.qq.com/connect/oauth2/authorize'
  window.location.href = `${wxurl}${params}`
}

// 获取授权后的code
export function getCode(name) {
  // eslint-disable-next-line no-sparse-arrays
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ''])[1].replace(/\+/g, '%20')) || null
}

export function loginByCode(code) {
  console.log('模拟登录')
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // resolve(1)
      reject(1)
    }, 500)
  })
}
