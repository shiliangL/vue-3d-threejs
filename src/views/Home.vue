<!--
 * @Author: shiliangL
 * @Date: 2021-07-16 13:48:55
 * @LastEditTime: 2021-07-16 14:34:58
 * @LastEditors: Do not edit
 * @Description:
-->
<template>
  <div class="home">
    3d
  </div>
</template>

<script>

import * as THREE from 'three'

export default {
  name: 'Home',
  data () {
    return {

    }
  },
  mounted () {
    this.$nextTick().then(() => {
      this.initThree()
    })
  },
  methods: {
    initThree () {
      // 创建一个场景
      this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10)
      this.camera.position.z = 1
      this.scene = new THREE.Scene()

      const geometry = new THREE.BoxGeometry(1, 1, 1)
      const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })

      this.cube = new THREE.Mesh(geometry, material)
      this.scene.add(this.cube)
      this.camera.position.z = 5
      this.renderer = new THREE.WebGLRenderer({ antialias: true })

      this.renderer.setSize(window.innerWidth, window.innerHeight)
      document.body.appendChild(this.renderer.domElement)

      const { cube, renderer, scene, camera } = this
      const animate = () => {
        requestAnimationFrame(animate)
        cube.rotation.x += 0.01
        cube.rotation.y += 0.01
        renderer.render(scene, camera)
      }

      animate()
    }
  }
}
</script>
