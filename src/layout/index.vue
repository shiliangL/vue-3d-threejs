<!--
 * @Author: shiliangL
 * @Date: 2021-07-25 17:43:03
 * @LastEditTime: 2021-07-25 21:24:40
 * @LastEditors: Do not edit
 * @Description:
-->

<template>
  <div class="app-layout">
    <div
      class="menu"
      @click="showMenu =!showMenu"
    >
      <div></div>
      <div></div>
      <div></div>
    </div>
    <div class="layout-content">
      <keep-alive v-if="$route.meta.keepAlive">
        <router-view></router-view>
      </keep-alive>
      <router-view v-else></router-view>
    </div>

    <div class="layout-footer">
      <TabBar :data="tabbars" />
    </div>

    <van-popup
      v-model="showMenu"
      position="bottom"
      :style="{ height: '30%' }"
    >
      <van-cell
        is-link
        clickable
        @click="clickCell(item)"
        v-for="(item,index) in menuList"
        :key="index"
        :title="item.title"
      />
    </van-popup>
  </div>
</template>

<script>

import { Popup } from 'vant'
import TabBar from '@/components/TabBar'

export default {
  name: 'AppLayout',
  components: {
    TabBar,
    [Popup.name]: Popup
  },
  data() {
    return {
      showMenu: false,
      tabbars: [
        {
          title: '首页',
          to: {
            path: '/home/index'
          },
          icon: 'home-o'
        },
        {
          title: '关于我',
          to: {
            path: '/about/index'
          },
          icon: 'user-o'
        }
      ]
    }
  },
  computed: {
    menuList() {
      return this.$router.pages || []
    }
  },
  methods: {
    clickCell(item) {
      this.showMenu = false
      setTimeout(() => {
        this.$router.push(item.path)
      }, 300)
    }
  }
}
</script>

<style lang="scss" scoped>
.menu {
  top: 10px;
  left: 10px;
  position: fixed;
  width: 32px;
  height: 28px;
  z-index: 2000;
  background: #000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  > div {
    width: 80%;
    height: 2px;
    background: #fff;
  }
}

.app-layout {
  height: 100%;
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  .layout-content {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    scroll-behavior:smooth;
  }
  .layout-footer {
    height: 50px;
    overflow: hidden;
  }
}
</style>
