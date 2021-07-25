<!--
 * @Author: shiliangL
 * @Date: 2020-12-24 09:24:21
 * @LastEditTime: 2021-07-25 21:17:09
 * @LastEditors: Do not edit
 * @Description:
-->
<template>
  <div>
    <van-tabbar route v-model="active" @change="handleChange" safe-area-inset-bottom>
      <van-tabbar-item v-for="(item, index) in data" :to="item.to" :icon="item.icon" :key="index">
        {{ item.title }}
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
export default {
  name: 'TabBar',
  props: {
    defaultActive: {
      type: Number,
      default: 0
    },
    data: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      active: this.defaultActive
    }
  },
  methods: {
    handleChange(value) {
      this.$emit('change', value)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
