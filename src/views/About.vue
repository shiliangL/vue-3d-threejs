<!--
 * @Author: shiliangL
 * @Date: 2021-07-16 13:48:55
 * @LastEditTime: 2021-07-19 08:43:58
 * @LastEditors: Do not edit
 * @Description:
-->
<template>
  <div class="Home">
    <canvas ref="3d"> 3d </canvas>
    <div class="fix-botton">
      <el-button
        plain
        type="primary"
        @click="changeAnimation"
      >切换动画</el-button>
    </div>
  </div>
</template>

<script>

import { AppThree } from '@/utils/three'
import { loadGLTFModel } from '@/utils'

export default {
  mounted() {
    this.$nextTick().then(() => {
      this.loadModels()
    })
  },
  methods: {
    loadModels() {

      loadGLTFModel('', (progress) => {
        console.log(progress, 'progress');
      }).then((gltf) => {
        const model = gltf.scene
        model.scale.set(1.6, 1.6, 1.6)
        model.position.y = -2.2
        const canvas = this.$refs['3d']
        if (Array.isArray(gltf.animations) && gltf.animations.length) {
          this.animationsName = gltf.animations.map(item => item.name)
        }
        this.app = new AppThree(canvas, model, gltf.animations)
        // console.log(gltf, 'gltf模型信息')
        // console.log(this.app, ' this.app')
      }).catch(() => {

      })
    },
    changeAnimation() {
      const { app } = this
      if (!app) return
      if (!this.animationsName) return
      const clips = this.animationsName || []
      let clipIndex = clips.indexOf(app.mixer.clip)
      clipIndex = (clipIndex + 1) % clips.length
      app.mixer.play(clips[clipIndex])
    }
  }
}
</script>

<style lang="scss" scoped>
.fix-botton {
  left: 50%;
  bottom: 20px;
  position: fixed;
  transform: translate(-50%, 0%);
}
</style>
