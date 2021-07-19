<!--
 * @Author: shiliangL
 * @Date: 2021-07-16 13:48:55
 * @LastEditTime: 2021-07-18 16:50:27
 * @LastEditors: Do not edit
 * @Description:
-->
<template>
  <div class="Home">
    <canvas ref="3d"> 3d </canvas>
    <div class="fix-foot">
      <div class="fix-botton">
        <el-button
          plain
          v-for="(item,index) in animationsName"
          type="primary"
          :key="index"
          @click="changeAnimation(item)"
        >{{ item }}</el-button>
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
      animationsName: []
    }
  },
  methods: {
    loadModels () {
      const loader = new GLTFLoader()
      loader.load(
        '/models/gltf/Soldier.glb',
        (gltf) => {
          const model = gltf.scene
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
          camera.position.set(-5, 3, 10)
          camera.lookAt(new THREE.Vector3(0, 2, 0))

          // scene
          scene.background = new THREE.Color(0xfffff)
          scene.fog = new THREE.Fog(0xfffff, 20, 100)
          // scene - lights
          const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444)
          hemiLight.position.set(0, 20, 0)
          scene.add(hemiLight)
          const dirLight = new THREE.DirectionalLight(0xffffff)
          dirLight.position.set(0, 20, 10)
          scene.add(dirLight)
          // scene - ground
          const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2000, 2000), new THREE.MeshPhongMaterial({ color: 0x999999, depthWrite: false }))
          mesh.rotation.x = -Math.PI / 2
          scene.add(mesh)
          // scene - grid
          const grid = new THREE.GridHelper(200, 40, 0x000000, 0x000000)
          grid.material.opacity = 0.2
          grid.material.transparent = true
          scene.add(grid)

          //  控制器
          const controls = new OrbitControls(camera, renderer.domElement)
          controls.enablePan = true
          controls.enableZoom = true
          controls.target.set(1, 2, 2)
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
  }
}
</style>
