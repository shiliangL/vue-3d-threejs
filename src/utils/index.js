/*
 * @Author: shiliangL
 * @Date: 2021-07-17 13:14:25
 * @LastEditTime: 2021-07-19 08:43:19
 * @LastEditors: Do not edit
 * @Description:
 */

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

export function loadGLTFModel (url, progressFn) {
  const loader = new GLTFLoader()
  return new Promise((resolve, reject) => {
    loader.load(url,
      (gltf) => {
        resolve(gltf)
      },
      ({ loaded, total }) => {
        const progress = (loaded / total * 100).toFixed(0)
        progressFn(progress)
      },
      (err) => {
        reject(err)
      }
    )
  })
}
