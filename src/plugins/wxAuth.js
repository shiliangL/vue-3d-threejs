/*
 * @Author: shiliangL
 * @Date: 2021-07-24 21:54:43
 * @LastEditTime: 2021-07-24 22:08:06
 * @LastEditors: Do not edit
 * @Description:
 */
/**
 * 微信授权
 * config:
 *  appId - 公众号appId
 *  REDIRECT_URI - 回调域名，授权后跳转的地址
 *  SCOPE - 授权类型，snsapi_userinfo／snsapi_base
 */
export function auth() {
  /* eslint-disable */
  let
    appid = 'wx1f67f77de0c04cce',
    oldURL = window.location.href,
    REDIRECT_URI = oldURL.split('#')[0],
    SCOPE = 'snsapi_userinfo',
    url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appid + '&redirect_uri=' + REDIRECT_URI + '&response_type=code&scope=' + SCOPE + '&state=1#wechat_redirect'
  window.location.href = url
}

// 获取授权后的code
export function getCode () {
  let url = window.location.search
  if (!url) return false
  return url.match(/^\?code=(.+)&/)[1]
}
