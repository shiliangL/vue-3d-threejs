<!--
 * @Author: shiliangL
 * @Date: 2021-07-25 17:50:01
 * @LastEditTime: 2021-07-25 21:05:10
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
    title: '你好 Threejs2',
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
      // 创建一个球体几何对象
      const geometry = new THREE.SphereGeometry(60, 40, 40)
      // 材质对象Material
      const material = new THREE.MeshLambertMaterial({
        color: 0xeeeeee
      })
      // 网格模型对象Mesh
      const mesh = new THREE.Mesh(geometry, material)
      scene.add(mesh) // 网格模型添加到场景中

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
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
