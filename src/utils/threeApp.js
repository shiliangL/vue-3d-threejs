/*
 * @Author: shiliangL
 * @Date: 2021-07-25 19:27:30
 * @LastEditTime: 2021-07-25 20:47:31
 * @LastEditors: Do not edit
 * @Description:
 */
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

class ThreeApp {
  constructor({ canvas, model, animations }) {
    this.innerWidth = canvas.offsetWidth || window.innerWidth
    this.innerHeight = canvas.offsetHeight || window.innerHeight

    this.scene = ThreeApp.createScene()
    this.camera = ThreeApp.createCamera(this.innerWidth, this.innerHeight)
    this.renderer = ThreeApp.createRenderer(canvas, this.innerWidth, this.innerHeight)

    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    if (model) this.scene.add(model)
    if (model && animations) this.mixer = new AnimationMixer(model, animations)
    this.update()
  }

  // 场景
  static createScene() {
    return new THREE.Scene()
  }

  // 相机
  static createCamera(innerWidth, innerHeight) {
    return new THREE.PerspectiveCamera(45, innerWidth / innerHeight, 0.25, 1000)
  }

  // 渲染器
  static createRenderer(canvas, innerWidth, innerHeight) {
    const renderer = new THREE.WebGLRenderer({ canvas })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(innerWidth, innerHeight)
    renderer.outputEncoding = THREE.sRGBEncoding
    renderer.shadowMap.enabled = true
    return renderer
  }

  // 均匀灯光
  static createAmbientLight() {
    return new THREE.AmbientLight(0xffffff, 1)
  }

  // 方向灯光
  static createDirectionalLight() {
    return THREE.DirectionalLight(0xffffff, 2)
  }

  // todo
  resize() {
    const canvasSize = this.renderer.getSize(new THREE.Vector2())
    const windowSize = new THREE.Vector2(this.innerWidth, this.innerHeight)
    if (!canvasSize.equals(windowSize)) {
      this.renderer.setSize(windowSize.x, windowSize.y, false)
      this.camera.aspect = windowSize.x / windowSize.y
      this.camera.updateProjectionMatrix()
    }
  }

  update() {
    this.resize()
    this.mixer && this.mixer.update()
    this.renderer.render(this.scene, this.camera)
    window.requestAnimationFrame(() => { this.update() })
  }
}

class AnimationMixer {
  constructor(model, animations) {
    this.clock = new THREE.Clock()
    this.mixer = new THREE.AnimationMixer(model)
    this.animations = animations
  }

  play(clip) {
    const animation = this.animations.find(a => a.name === clip)
    if (animation) {
      this.mixer.stopAllAction()
      this.mixer.clipAction(animation).play()
      this.clip = clip
    }
  }

  update() {
    const delta = this.clock.getDelta()
    this.mixer.update(delta)
  }
}

export { ThreeApp, AnimationMixer, THREE }
