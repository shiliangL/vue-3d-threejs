<!--
 * @Author: shiliangL
 * @Date: 2021-07-25 17:50:01
 * @LastEditTime: 2021-07-27 09:30:07
 * @LastEditors: Do not edit
 * @Description:
-->
<template>
  <div class="wx100">
    <!-- 你好 Threejs -->
    <canvas ref="3d"> 3d </canvas>
  </div>
</template>

<script>

import { ThreeApp, THREE } from '@/utils/threeApp'

export default {
  meta: {
    title: 'TheEarth',
    wxAuth: false,
    keepAlive: true
  },
  mounted() {
    this.$nextTick().then(() => {
      this.initThree()
    })
  },
  methods: {
    initThree() {
      const canvas = this.$refs['3d']
      // 实例化对象
      this.app = new ThreeApp({ canvas })
      const { scene, camera, controls } = this.app

      scene.background = new THREE.Color(0x020924)
      scene.fog = new THREE.Fog(0x020924, 200, 1000)

      // 初始化背景
      this.initStarrySky(scene)
      // 创建一个球体几何对象
      const geometry = new THREE.SphereGeometry(60, 40, 40)
      // 材质对象Material
      const material = new THREE.MeshLambertMaterial({
        color: 0x092071
      })
      // 网格模型对象Mesh
      const mesh = new THREE.Mesh(geometry, material)
      scene.add(mesh) // 网格模型添加到场景中

      // 创建纹理贴图
      const textureLoader = new THREE.TextureLoader()
      textureLoader.load(require('@/assets/textures/map.png'), texture => {
        const material = new THREE.MeshLambertMaterial({ map: texture, transparent: true })
        const mesh = new THREE.Mesh(geometry, material)
        scene.add(mesh)
      })

      // 点光源
      const point = new THREE.PointLight(0xffffff)
      point.position.set(400, 200, 300) // 点光源位置
      scene.add(point) // 点光源添加到场景中
      // 环境光
      const ambient = new THREE.AmbientLight(0x444444)
      scene.add(ambient)

      camera.position.set(200, 300, 200) // 设置相机位置
      camera.lookAt(scene.position) // 设置相机方向(指向的场景对象)

      //  控制器
      controls.enablePan = true
      controls.enableZoom = false
      controls.target.set(1, 3, 3)
      controls.update()
    },
    initStarrySky(scene) {
      const positions = []
      const colors = []
      const geometry = new THREE.BufferGeometry()
      for (let i = 0; i < 10000; i++) {
        const vertex = new THREE.Vector3()
        vertex.x = Math.random() * 2 - 1
        vertex.y = Math.random() * 2 - 1
        vertex.z = Math.random() * 2 - 1
        positions.push(vertex.x, vertex.y, vertex.z)
        const color = new THREE.Color()
        color.setHSL(Math.random() * 0.2 + 0.5, 0.55, Math.random() * 0.25 + 0.55)
        colors.push(color.r, color.g, color.b)
      }
      geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
      geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))

      const textureLoader = new THREE.TextureLoader()
      textureLoader.load('/textures/map.png', (texture) => {
        const starsMaterial = new THREE.ParticleBasicMaterial({
          map: texture,
          size: 1,
          transparent: true,
          opacity: 1,
          vertexColors: true, // true：且该几何体的colors属性有值，则该粒子会舍弃第一个属性--color，而应用该几何体的colors属性的颜色
          blending: THREE.AdditiveBlending,
          sizeAttenuation: true
        })

        const stars = new THREE.ParticleSystem(geometry, starsMaterial)
        stars.scale.set(300, 300, 300)
        scene.add(stars)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
