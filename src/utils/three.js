import * as THREE from 'three'

class AppThree {
  constructor ({ canvas, model, animations }) {
    this.innerWidth = canvas.offsetWidth || window.innerWidth
    this.innerHeight = canvas.offsetHeight || window.innerHeight
    this.scene = AppThree.createScene().add(model)
    this.camera = AppThree.createCamera(this)
    this.renderer = AppThree.createRenderer(canvas)
    this.mixer = new AnimationMixer(model, animations)
    this.update()
  }

  // 场景
  static createScene () {
    return new THREE.Scene()
  }

  // 相机
  static createCamera () {
    return new THREE.PerspectiveCamera(45, this.innerWidth / this.innerHeight, 0.25, 100)
  }

  // 渲染器
  static createRenderer (canvas) {
    const renderer = new THREE.WebGLRenderer({ canvas })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(this.innerWidth, this.innerHeight)
    renderer.outputEncoding = THREE.sRGBEncoding
    renderer.shadowMap.enabled = true
    return renderer
  }

  // 均匀灯光
  static createAmbientLight () {
    return new THREE.AmbientLight(0xffffff, 1)
  }

  // 方向灯光
  static createDirectionalLight () {
    return THREE.DirectionalLight(0xffffff, 2)
  }

  // todo
  resize () {
    const canvasSize = this.renderer.getSize(new THREE.Vector2())
    const windowSize = new THREE.Vector2(this.innerWidth, this.innerHeight)
    if (!canvasSize.equals(windowSize)) {
      this.renderer.setSize(windowSize.x, windowSize.y, false)
      this.camera.aspect = windowSize.x / windowSize.y
      this.camera.updateProjectionMatrix()
    }
  }

  update () {
    this.resize()
    this.mixer.update()
    this.renderer.render(this.scene, this.camera)
    window.requestAnimationFrame(() => { this.update() })
  }
}

class AnimationMixer {
  constructor (model, animations) {
    this.clock = new THREE.Clock()
    this.mixer = new THREE.AnimationMixer(model)
    this.animations = animations
  }

  play (clip) {
    const animation = this.animations.find(a => a.name === clip)
    if (animation) {
      this.mixer.stopAllAction()
      this.mixer.clipAction(animation).play()
      this.clip = clip
    }
  }

  update () {
    const delta = this.clock.getDelta()
    this.mixer.update(delta)
  }
}

export { AppThree, AnimationMixer, THREE }
