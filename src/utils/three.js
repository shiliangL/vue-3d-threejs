import * as THREE from 'three'

class AppThree {
  constructor (canvas, model, animations) {
    this.scene = AppThree.createScene()
      .add(model)
      .add(AppThree.createAmbientLight())
      .add(AppThree.createDirectionalLight())
    this.camera = AppThree.createCamera()
    this.renderer = AppThree.createRenderer(canvas)
    this.mixer = new AnimationMixer(model, animations)
    this.update()
  }

  // 场景
  static createScene () {
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x000)
    return scene
  }

  // 相机
  static createCamera () {
    const fov = 60 // Field of view
    const aspect = window.clientWidth / window.clientHeight
    const near = 0.1 // the near clipping plane
    const far = 30 // the far clipping plane
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
    camera.position.set(0, 2, 10)
    return camera
  }

  // 渲染器
  static createRenderer (canvas) {
    const renderer = new THREE.WebGLRenderer({ canvas })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.toneMapping = THREE.ReinhardToneMapping
    renderer.toneMappingExposure = 2.0
    return renderer
  }

  // 均匀灯光
  static createAmbientLight () {
    return new THREE.AmbientLight(0xffffff, 1)
  }

  // 方向灯光
  static createDirectionalLight () {
    const light = new THREE.DirectionalLight(0xffffff, 2)
    light.position.set(0, 400, 350)
    return light
  }

  resize () {
    const canvasSize = this.renderer.getSize(new THREE.Vector2())
    const windowSize = new THREE.Vector2(window.innerWidth, window.innerHeight)
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
