<!--
 * @Author: shiliangL
 * @Date: 2021-07-16 13:48:55
 * @LastEditTime: 2021-07-19 21:09:02
 * @LastEditors: Do not edit
 * @Description:
-->
<template>
  <div id="app">
    <div class="navigation">
      <div
        class="nav-item"
        v-for="(item,index) in navigation"
        :key="index"
      >
        <router-link
          :to="item.path"
          exact
        >
          <span v-text="item.title"></span>
        </router-link>
      </div>
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
    background: #ffffff;
    .link {
      padding: 6px 6px;
      display: block;
    }
    border-right: 1px solid #e8e8e8;
    .nav-item {
      a {
        position: relative;
        padding-left: 20px;
        display: block;
        height: 40px;
        line-height: 40px;
        font-size: 16px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-weight: normal;
        &:hover {
          color: #409eff;
        }
        &.active {
          color: #409eff;
          &:after {
            transform: scaleY(1);
            opacity: 1;
          }
        }
        &:after {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          border-right: 3px solid #1890ff;
          transform: scaleY(0.0001);
          opacity: 0;
          transition: opacity 0.25s cubic-bezier(0.215, 0.61, 0.355, 1),
            -webkit-transform 0.25s cubic-bezier(0.215, 0.61, 0.355, 1);
          transition: transform 0.25s cubic-bezier(0.215, 0.61, 0.355, 1),
            opacity 0.25s cubic-bezier(0.215, 0.61, 0.355, 1);
          transition: transform 0.25s cubic-bezier(0.215, 0.61, 0.355, 1),
            opacity 0.25s cubic-bezier(0.215, 0.61, 0.355, 1),
            -webkit-transform 0.25s cubic-bezier(0.215, 0.61, 0.355, 1);
          content: "";
        }
      }
    }
    .router-link-active {
      color: #1890ff;
      &:after {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        border-right: 3px solid #1890ff;
        transform: scaleY(0.0001);
        // opacity: 0;
        transition: opacity 0.25s cubic-bezier(0.215, 0.61, 0.355, 1),
          -webkit-transform 0.25s cubic-bezier(0.215, 0.61, 0.355, 1);
        transition: transform 0.25s cubic-bezier(0.215, 0.61, 0.355, 1),
          opacity 0.25s cubic-bezier(0.215, 0.61, 0.355, 1);
        transition: transform 0.25s cubic-bezier(0.215, 0.61, 0.355, 1),
          opacity 0.25s cubic-bezier(0.215, 0.61, 0.355, 1),
          -webkit-transform 0.25s cubic-bezier(0.215, 0.61, 0.355, 1);
        content: "";
      }
    }
  }
  .router-main {
    flex: 1;
  }
}
</style>
