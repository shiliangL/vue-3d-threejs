/*
 * @Author: shiliangL
 * @Date: 2020-06-08 11:45:08
 * @LastEditTime: 2021-07-24 23:29:20
 * @LastEditors: Do not edit
 * @Description:
 * @FilePath: /baoan-wui/src/utils/auth.js
 */
import Cookies from 'js-cookie'

const TokenKey = 'shiliang_dev_token' // || 'Ty-Admin-Token'

export function getToken() {
  return TokenKey ? Cookies.get(TokenKey) : null
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function setKeyValue(k, v) {
  return Cookies.set(k, v)
}
export function getKeyValue(k) {
  return Cookies.set(k)
}
