/*
 * @Author: shiliangL
 * @Date: 2021-07-17 13:14:25
 * @LastEditTime: 2021-07-19 08:33:53
 * @LastEditors: Do not edit
 * @Description:
 */

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

export function loadGLTFModel (url) {
  const loader = new GLTFLoader()
  return new Promise((resolve, reject) => {
    loader.load(url,
      (gltf) => {
        resolve(gltf)
      }, ({ loaded, total }) => {
        const load = Math.abs(loaded / total * 100)
        if (load >= 100) {
          // isLoading.value = false
        }
        console.log((loaded / total * 100) + '% loaded')
      },
      (err) => {
        reject(err)
      }
    )
  })
}
