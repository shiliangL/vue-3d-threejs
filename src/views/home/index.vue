<!--
 * @Author: shiliangL
 * @Date: 2020-12-24 09:24:21
 * @LastEditTime: 2021-07-25 19:25:07
 * @LastEditors: Do not edit
 * @Description:
-->
<!-- home -->
<template>
  <div class="index-container">
    <div class="warpper">
      <h1 class="demo-home__title"> VUE H5开发模板 </h1>
    </div>
    <van-cell
      icon="success"
      v-for="item in list"
      :key="item"
      :title="item"
    />
  </div>
</template>

<script>
export default {
  meta: {
    title: '首页',
    wxAuth: false,
    keepAlive: true
  },
  data() {
    return {
      list: [
        '开发实践框架',
        'views页面自动注册',
        'VantUI 自定义主题配置',
        '可配置微信公众号授权',
        'Permission权限拦截',
        '配置多环境变量',
        'VantUI 组件按需加载',
        'Sass 全局样式',
        'Vuex 状态管理',
        'Axios 封装及接口管理',
        'Vue-router',
        'Webpack 4 vue.config.js 基础配置',
        '配置 proxy 跨域',
        '配置 alias 别名',
        '配置 打包分析',
        '配置 externals 引入 cdn 资源',
        '去掉 console.log',
        'splitChunks 单独打包第三方模块',
        'Eslint+Pettier 统一开发规范'
      ]
    }
  },

  computed: {},

  mounted() {
  },

  methods: {}
}
</script>
<style lang="scss" scoped>
.index-container {
  .warpper {
    padding: 12px;
    background: #fff;
    .demo-home__title {
      text-align: center;
      margin: 0 0 6px;
      font-size: 32px;
    }
  }
}
</style>
