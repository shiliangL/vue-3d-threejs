<!--
 * @Author: shiliangL
 * @Date: 2021-07-16 13:48:55
 * @LastEditTime: 2021-07-19 21:46:21
 * @LastEditors: Do not edit
 * @Description:
-->
<template>
  <div class="Home">
    <canvas ref="3d"> 3d </canvas>
    <div class="fix-foot">
      <div class="fix-botton">
        <div
          class="color-item"
          @click="setCarColor(item)"
          v-for="(item,index) in colorAry"
          :style="{backgroundColor : item}"
          :key="index"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>

import { AppThree, THREE } from '@/utils/three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export default {
  titleName: 'AnimationSkinning',
  mounted () {
    this.$nextTick().then(() => {
      this.loadModels()
    })
  },
  data () {
    return {
      animationsName: [],
      colorAry: [
        'rgb(216, 27, 67)', 'rgb(142, 36, 170)', 'rgb(81, 45, 168)', 'rgb(48, 63, 159)', 'rgb(30, 136, 229)', 'rgb(0, 137, 123)',
        'rgb(67, 160, 71)', 'rgb(251, 192, 45)', 'rgb(245, 124, 0)', 'rgb(230, 74, 25)', 'rgb(233, 30, 78)', 'rgb(156, 39, 176)',
        'rgb(0, 0, 0)']
    }
  },
  methods: {
    loadModels () {
      const loader = new GLTFLoader()
      loader.load(
        '/models/bmw_m3/scene.gltf',
        (gltf) => {
          const model = gltf.scene
          console.log(model.position, 'xx')
          model.position.set(0, -40, 0)
          console.log(model.position, ' model.position')
          const animations = gltf.animations
          console.log(gltf, '模型信息')
          const canvas = this.$refs['3d']
          if (Array.isArray(gltf.animations) && gltf.animations.length) {
            this.animationsName = gltf.animations.map(item => item.name)
          }
          // 实例化对象
          this.app = new AppThree({ canvas, model, animations })
          const { camera, renderer, scene } = this.app
          // camera
          camera.position.set(100, 200, 500)
          camera.lookAt(new THREE.Vector3(0, 1, 0))

          scene.background = new THREE.Color(0xeeeeee)

          const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
          directionalLight.position.set(-4, 8, 4)
          const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.4)
          hemisphereLight.position.set(0, 8, 0)
          scene.add(directionalLight)
          scene.add(hemisphereLight)

          // 工具类
          const axes = new THREE.AxisHelper(1000)
          console.log(axes.position)
          scene.add(axes)

          //  控制器
          const controls = new OrbitControls(camera, renderer.domElement)
          controls.enablePan = true
          controls.enableZoom = true
          controls.target.set(1, 3, 3)
          controls.update()
        },
        (progress) => {
          console.log(progress, 'progress')
        },
        loadError => {
          console.log(loadError, 'loadError')
        }
      )
    },
    changeAnimation () {
      const { app } = this
      if (!app) return
      if (!this.animationsName) return
      const clips = this.animationsName || []
      let clipIndex = clips.indexOf(app.mixer.clip)
      clipIndex = (clipIndex + 1) % clips.length
      app.mixer.play(clips[clipIndex])
    },
    setCarColor (color) {
      const currentColor = new THREE.Color(color)
      const { scene } = this.app
      scene.traverse(child => {
        if (child.isMesh) {
          if (!child.name.includes('wheel')) {
            child.material.color.set(currentColor)
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.Home {
  position: relative;
  overflow: hidden;
  .fix-foot {
    position: absolute;
    width: 100%;
    bottom: 20px;
    left: 0;
    display: flex;
    justify-content: center;
    .fix-botton {
      display: flex;
      flex-wrap: wrap;
      padding: 20px;
      .color-item {
        width: 10px;
        height: 10px;
        margin: 5px;
        cursor: pointer;
      }
    }
  }
}
</style>
