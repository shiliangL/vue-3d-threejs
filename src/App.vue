<!--
 * @Author: shiliangL
 * @Date: 2021-07-16 13:48:55
 * @LastEditTime: 2021-07-18 16:21:08
 * @LastEditors: Do not edit
 * @Description:
-->
<template>
  <div id="app">
    <div class="navigation" v-if="1">
      <router-link
        class="link"
        v-for="(item,index) in navigation"
        :key="index"
        :to="item.path"
      >
        <span v-text="item.title"></span>
      </router-link>
    </div>
    <div class="router-main">
      <router-view />
    </div>
  </div>
</template>

<script>

export default {
  computed: {
    navigation () {
      return this.$router.pages || []
    }
  },
  mounted () {
    console.log(this)
  }
}
</script>

<style lang="scss" scoped>
</style>

<style lang="scss" scoped>
#app {
  display: flex;
  overflow: hidden;
  .navigation {
    width: 230px;
    background: #FFFFFF;
    .link {
      padding: 6px 6px;
      display: block;
    }
    border-right: 1px solid #E8E8E8;
  }
  .router-main {
    flex: 1;
  }
}
</style>
